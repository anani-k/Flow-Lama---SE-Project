// db.js

const DATABASE = "database.db";
const db = require("better-sqlite3")(DATABASE);
const fs = require('fs');
const path = require('path');
const EventEmitter = require('events');

// Funktion zum Initialisieren der Datenbank
const initializeDatabase = () => {
    const dbPath = path.join(__dirname, 'DB_init.sql');
    const db_init = fs.readFileSync(dbPath, 'utf8');

    // Führt alle SQL-Befehle aus der Datei aus
    db.exec(db_init);
    console.log("Database initialized from DB_init.sql");
};

class MyEmitter extends EventEmitter {}
const DatabaseEmitter = new MyEmitter();


// Funktionen für Benutzer
const getUserByUsername = (username) => {
    const stmt = db.prepare('SELECT * FROM Users WHERE username = ?');
    return stmt.get(username);
};

const createUser = (username, email, passwordHash) => {
    const stmt = db.prepare('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)');
    stmt.run(username, email, passwordHash);
    //DatabaseEmitter.emit('dbChange', { type: 'userCreated'});
    console.log(`New user signed up: ${username}`);

};

const userExists = (username) => {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM Users WHERE username = ?');
    const row = stmt.get(username);
    return row.count > 0;
};

// Funktionen für Projekte
const createProject = (projectName, description, boardName) => {
    const stmt = db.prepare('INSERT INTO Projects (project_name, description, board_name) VALUES (?, ?, ?)');
    stmt.run(projectName, description, boardName);
    //DatabaseEmitter.emit('dbChange', { type: 'projectCreated'});

};

const getAllProjects = () => {
    const stmt = db.prepare('SELECT * FROM Projects');
    return stmt.all();
};

const getProjectById = (projectId) => {
    const stmt = db.prepare('SELECT * FROM Projects WHERE project_id = ?');
    return stmt.get(projectId);
};

const getProjectByName = (projectName) => {
    const stmt = db.prepare('SELECT * FROM Projects WHERE project_name = ?');
    return stmt.get(projectName);
};

const deleteProject = (projectId) => {
    const stmt = db.prepare('DELETE FROM Projects WHERE project_id = ?');
    stmt.run(projectId);
    //DatabaseEmitter.emit('dbChange', { type: 'projectDeleted'});
};

// Funktionen für Aufgaben
const createTask = (progress, category, title, description, date, openSubtasks, closedSubtasks, priority, assigedToId) => {
    const stmt = db.prepare('INSERT INTO tasks (progress, category, title, description, date, openSubtasks, closedSubtasks, priority, assigedToId)\n' +
        '            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
    stmt.run(progress, category, title, description, date, openSubtasks, closedSubtasks, priority, assigedToId);
    //DatabaseEmitter.emit('dbChange', { type: 'taskCreated'});
};

const getAllTasksByProjectId = (projectId) => {
    const stmt = db.prepare('SELECT * FROM Tasks WHERE project_id = ?');
    return stmt.all(projectId);
};

const getTaskById = (taskId) => {
    const stmt = db.prepare('SELECT * FROM Tasks WHERE task_id = ?');
    return stmt.get(taskId);
};

const updateTaskStatus = (taskId, status) => {
    const stmt = db.prepare('UPDATE Tasks SET progress = ? WHERE task_id = ?');
    stmt.run(status, taskId);
    //DatabaseEmitter.emit('dbChange', { type: 'taskUpdated'});
};

const deleteTask = (taskId) => {
    const stmt = db.prepare('DELETE FROM Tasks WHERE task_id = ?');
    stmt.run(taskId);
    //DatabaseEmitter.emit('dbChange', { type: 'taskDeleted'});
};
const updateTasks=(tasks)=>{
    db.exec('DELETE FROM TASKS')
    console.log("Tasks hat länge",tasks.length);
    if(tasks.length>0) {
        for (eintrag in tasks) {
            createTask(tasks[eintrag].progress, tasks[eintrag].category, tasks[eintrag].title, tasks[eintrag].description, tasks[eintrag].date, JSON.stringify(tasks[eintrag].openSubtasks), JSON.stringify(tasks[eintrag].closedSubtasks), tasks[eintrag].priority, JSON.stringify(tasks[eintrag].assigedToId));
        }
    }


}
function fetchAndTransformTasks() {
    try {
        const rows = db.prepare('SELECT * FROM Tasks').all();

        // Transform each row into a single object with all key:value pairs
        const transformedTasks = rows.map(row => ({
            progress: row.progress,
            category: row.category,
            title: row.title,
            description: row.description,
            date: row.date,
            openSubtasks: JSON.parse(row.openSubtasks),
            closedSubtasks: JSON.parse(row.closedSubtasks),
            priority: row.priority,
            assigedToId: JSON.parse(row.assigedToId)
        }));
        return transformedTasks;
    } catch (err) {
        console.error('Error fetching data', err);
    }
}

// Funktionen für Kontakte
const addContact = (userId, contactUserId) => {
    const stmt = db.prepare('INSERT INTO GlobalContacts (user_id, contact_user_id) VALUES (?, ?)');
    stmt.run(userId, contactUserId);
    //DatabaseEmitter.emit('dbChange', { type: 'addedContact'});
};

const getAllContactsByUserId = (userId) => {
    const stmt = db.prepare('SELECT * FROM GlobalContacts WHERE user_id = ?');
    return stmt.all(userId);
};

const deleteContact = (userId, contactUserId) => {
    const stmt = db.prepare('DELETE FROM GlobalContacts WHERE user_id = ? AND contact_user_id = ?');
    stmt.run(userId, contactUserId);
    //DatabaseEmitter.emit('dbChange', { type: 'deletedContact'});
};

function fetchAndTransformContacts() {
    try {
        const rows = db.prepare('SELECT * FROM GlobalContacts').all();

        // Transform each row into a single object with all key:value pairs
        const transformedContacts = rows.map(row => ({
            id: row.id.toString(), // Konvertiere ID in String, falls sie nicht schon String ist
            firstName: row.firstname,
            lastName: row.lastname,
            initials: row.initials,
            color: row.color,
            email: row.email,
            phone: row.phone
        }));
        return transformedContacts;
    } catch (err) {
        console.error('Error fetching data', err);
    }
}

function updateGlobalContacts(contacts) {
    db.exec('DELETE FROM GlobalContacts');
    if(contacts.length>0) {
        for (eintrag in contacts) {
            const stmt = db.prepare('INSERT INTO GlobalContacts(id,firstname, lastname, initials, color, email, phone) VALUES (?,?,?,?,?,?,?)');
            stmt.run(contacts[eintrag].id, contacts[eintrag].firstName, contacts[eintrag].lastName, contacts[eintrag].initials, contacts[eintrag].color, contacts[eintrag].email, contacts[eintrag].phone);
        }
    }
    //DatabaseEmitter.emit('dbChange', { type: 'updatedContact'});

    console.log('Database updated successfully!');

}

function getLastContactID(){
    let lastId;
    const rows = db.prepare('SELECT id FROM GlobalContacts ORDER BY id DESC').all();
    if (rows.length === 0) {
        lastId = 0; // Wenn keine Ergebnisse gefunden wurden, setze lastId auf 0 oder einen anderen Standardwert
    } else {
        // rows[0] ist das erste Objekt im Array (also die erste Zeile der Abfrage)
        lastId = rows[0].id; // Zugriff auf die Eigenschaft id des ersten Objekts im Array
    }
    return lastId;
}

module.exports = {
    initializeDatabase,
    getUserByUsername,
    createUser,
    userExists,
    createProject,
    getAllProjects,
    getProjectById,
    getProjectByName,
    deleteProject,
    createTask,
    getAllTasksByProjectId,
    getTaskById,
    updateTaskStatus,
    deleteTask,
    addContact,
    getAllContactsByUserId,
    deleteContact,
    db,
    DatabaseEmitter,
    updateGlobalContacts,
    updateTasks,
    fetchAndTransformContacts,
    fetchAndTransformTasks,
    getLastContactID

};
