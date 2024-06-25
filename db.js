// db.js

const DATABASE = "database.db";
const db = require("better-sqlite3")(DATABASE);
const fs = require('fs');
const path = require('path');

// Funktion zum Initialisieren der Datenbank
const initializeDatabase = () => {
    const dbPath = path.join(__dirname, 'DB_init.sql');
    const db_init = fs.readFileSync(dbPath, 'utf8');

    // Führt alle SQL-Befehle aus der Datei aus
    db.exec(db_init);

    console.log("Database initialized from DB_init.sql");
};

// Funktionen für Benutzer
const getUserByUsername = (username) => {
    const stmt = db.prepare('SELECT * FROM Users WHERE username = ?');
    return stmt.get(username);
};

const createUser = (username, email, passwordHash) => {
    const stmt = db.prepare('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)');
    stmt.run(username, email, passwordHash);
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
};

// Funktionen für Aufgaben
const createTask = (taskTitle, description, dueDate, status, assigneeId, projectId) => {
    const stmt = db.prepare('INSERT INTO Tasks (task_title, description, date, progress) VALUES ( ?, ?, ?, ?)');
    stmt.run(taskTitle, description, dueDate, status);
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
    const stmt = db.prepare('UPDATE Tasks SET status = ? WHERE task_id = ?');
    stmt.run(status, taskId);
};

const deleteTask = (taskId) => {
    const stmt = db.prepare('DELETE FROM Tasks WHERE task_id = ?');
    stmt.run(taskId);
};

// Funktionen für Kontakte
const addContact = (userId, contactUserId) => {
    const stmt = db.prepare('INSERT INTO Contacts (user_id, contact_user_id) VALUES (?, ?)');
    stmt.run(userId, contactUserId);
};

const getAllContactsByUserId = (userId) => {
    const stmt = db.prepare('SELECT * FROM Contacts WHERE user_id = ?');
    return stmt.all(userId);
};

const deleteContact = (userId, contactUserId) => {
    const stmt = db.prepare('DELETE FROM Contacts WHERE user_id = ? AND contact_user_id = ?');
    stmt.run(userId, contactUserId);
};


//

// Update GlobalContacts
function updateDatabase(contacts) {
    db.exec('DELETE FROM GlobalContacts');
    const insert = db.prepare(`
        INSERT INTO GlobalContacts (global_contact_id, first_name, last_name, initials, color, email, phone)
        VALUES (@id, @firstName, @lastName, @initials, @color, @email, @phone)
    `);
    for (const contact of contacts) {
        insert.run(contact);
    }
    console.log('Database updated successfully!');
}

// Update Tasks
function updateTasksDatabase(tasks) {
   console.log(Array.isArray(tasks))
    console.log(tasks)
   for (const task in tasks){
       //console.log(task);
       //const stmt = db.prepare('INSERT INTO Tasks (task_title, description,date,progress) VALUES (?,?,?,?)');
       //stmt.run(task.title, task.description,task.date,task.progress);
   }
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
    updateDatabase,
    updateTasksDatabase,

};
