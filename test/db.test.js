const assert = require('assert');
const fs = require('fs');
const path = require('path');
const {
    initializeDatabase,
    getUserByUsername,
    createUser,
    userExists,
    createTask,
    getTaskById,
    updateTaskStatus,
    deleteTask,
    addContact,
    getAllContactsByUserId,
    deleteContact,
    updateGlobalContacts,
    updateTasks,
    fetchAndTransformContacts,
    fetchAndTransformTasks,
    getLastContactID,
    db
} = require('../db'); // Annahme: Datei als './db' gespeichert

describe('Database Operations', function() {
    before(function() {
        // Vor allen Tests: Initialisiere die Datenbank
        initializeDatabase();
    });

    describe('User Operations', function() {
        const testUser = {
            username: 'testuser',
            email: 'testuser@example.com',
            passwordHash: 'hashedpassword'
        };

        beforeEach(function() {
            // Vor jedem Test: Lösche alle Benutzerdaten
            db.exec('DELETE FROM Users');
        });

        it('should create a new user', function() {
            createUser(testUser.username, testUser.email, testUser.passwordHash);

            const user = getUserByUsername(testUser.username);
            assert.strictEqual(user.username, testUser.username);
            assert.strictEqual(user.email, testUser.email);
            assert.strictEqual(user.password, testUser.passwordHash);
        });

        it('should check if user exists', function() {
            createUser(testUser.username, testUser.email, testUser.passwordHash);

            const exists = userExists(testUser.username);
            assert.strictEqual(exists, true);
        });

        it('should return null for non-existent user', function() {
            const user = getUserByUsername('nonexistentuser');
            assert.strictEqual(user, undefined);
        });
    });

    describe('Task Operations', function() {
        const testTask = {
            progress: "inProgress",
            category: 'Test',
            title: 'Test Task',
            description: 'A test task',
            date: '23.01.2003',
            openSubtasks: [],
            closedSubtasks: [],
            priority: 1,
            assignedToId: null // Annahme: Keine spezifische Zuweisung
        };

        beforeEach(function() {
            // Vor jedem Test: Lösche alle Aufgabendaten
            db.exec('DELETE FROM Tasks');
        });

        it('should create a new task', function() {
            createTask(
                testTask.progress,
                testTask.category,
                testTask.title,
                testTask.description,
                testTask.date,
                JSON.stringify(testTask.openSubtasks),
                JSON.stringify(testTask.closedSubtasks),
                testTask.priority,
                JSON.stringify(testTask.assignedToId)
            );

            const tasks = fetchAndTransformTasks();
            assert.strictEqual(tasks.length, 1);
            assert.strictEqual(tasks[0].title, testTask.title);
        });

        it('should update task status', function() {
            createTask(
                testTask.progress,
                testTask.category,
                testTask.title,
                testTask.description,
                testTask.date,
                JSON.stringify(testTask.openSubtasks),
                JSON.stringify(testTask.closedSubtasks),
                testTask.priority,
                JSON.stringify(testTask.assignedToId)
            );

            const task = getTaskById(1); // Annahme: Aufgaben-ID 1
            assert.equal(task.progress, testTask.progress);

            updateTaskStatus(1, "inReview"); // Aktualisiere den Fortschritt auf 50%

            const updatedTask = getTaskById(1);
            assert.strictEqual(updatedTask.progress, "inReview");
        });

        it('should delete a task', function() {
            createTask(
                testTask.progress,
                testTask.category,
                testTask.title,
                testTask.description,
                testTask.date,
                JSON.stringify(testTask.openSubtasks),
                JSON.stringify(testTask.closedSubtasks),
                testTask.priority,
                JSON.stringify(testTask.assignedToId)
            );

            let tasks = fetchAndTransformTasks();
            assert.strictEqual(tasks.length, 1);

            deleteTask(1); // Annahme: Aufgaben-ID 1

            tasks = fetchAndTransformTasks();
            assert.strictEqual(tasks.length, 0);
        });
    });

    describe('Contact Operations', function() {
        const testContact = {
            userId: 1,
            firstName: 'Alex',
            lastName: 'Stark',
            initials: 'AS'
        };

        beforeEach(function() {
            // Vor jedem Test: Lösche alle Kontaktinformationen
            db.exec('DELETE FROM GlobalContacts');
        });

        it('should add a new contact', function() {
            addContact(testContact.userId,testContact.firstName,testContact.lastName,testContact.initials);

            const contacts = getAllContactsByUserId(testContact.userId);
            assert.strictEqual(contacts.length, 1);
        });

        it('should delete a contact', function() {
            addContact(testContact.userId,testContact.firstName,testContact.lastName,testContact.initials);
            let contacts = getAllContactsByUserId(testContact.userId);
            assert.strictEqual(contacts.length, 1);

            deleteContact(testContact.userId); // Annahme: Lösche alle Kontakte für userId

            contacts = getAllContactsByUserId(testContact.userId);
            assert.strictEqual(contacts.length, 0);
        });

        it('should return empty array for user with no contacts', function() {
            const contacts = getAllContactsByUserId(1); // Annahme: userId 1 hat keine Kontakte
            assert.strictEqual(contacts.length, 0);
        });
    });

    describe('Global Contacts Operations', function() {
        const testContacts = [
            {
                id: '1',
                firstName: 'John',
                lastName: 'Doe',
                initials: 'JD',
                color: '#ffffff',
                email: 'johndoe@example.com',
                phone: '1234567890'
            },
            {
                id: '2',
                firstName: 'Jane',
                lastName: 'Smith',
                initials: 'JS',
                color: '#000000',
                email: 'janesmith@example.com',
                phone: '0987654321'
            }
        ];

        beforeEach(function() {
            // Vor jedem Test: Lösche alle globalen Kontaktinformationen
            db.exec('DELETE FROM GlobalContacts');
        });

        it('should update global contacts', function() {
            updateGlobalContacts(testContacts);

            const contacts = fetchAndTransformContacts();
            assert.strictEqual(contacts.length, testContacts.length);
        });

        it('should fetch and transform contacts correctly', function() {
            updateGlobalContacts(testContacts);

            const contacts = fetchAndTransformContacts();
            assert.strictEqual(contacts.length, testContacts.length);

            const firstContact = contacts.find(contact => contact.id === testContacts[0].id);
            assert.strictEqual(firstContact.firstName, testContacts[0].firstName);
            assert.strictEqual(firstContact.email, testContacts[0].email);
        });

        it('should return last contact ID correctly', function() {
            updateGlobalContacts(testContacts);

            const lastId = getLastContactID();
            assert.strictEqual(lastId.toString(), (testContacts[testContacts.length - 1].id));
        });
    });

    after(function() {
    });
});
