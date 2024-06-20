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
    const stmt = db.prepare('INSERT INTO Tasks (task_title, description, due_date, status, assignee_id, project_id) VALUES (?, ?, ?, ?, ?, ?)');
    stmt.run(taskTitle, description, dueDate, status, assigneeId, projectId);
};

const getAllTasksByProjectId = (projectId) => {
    const stmt = db.prepare('SELECT * FROM Tasks WHERE project_id = ?');
    return stmt.all(projectId);
};

const getTaskById = (taskId) => {
    const stmt = db.prepare('SELECT * FROM Tasks WHERE task_id = ?');
    return stmt.get(taskId);
};

const getTaskIdByTitle=(taskTitle) =>{
    const stmt = db.prepare('SELECT task_id FROM Tasks WHERE task_title = ?');
    const row = stmt.get(taskTitle);
    return row ? row.task_id : null;
}

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

//GlobalContacts
const addGlobalContact = (firstName,lastName,initials,color,email,phone)=>{
    const stmt =db.prepare('INSERT INTO GlobalContacts(first_name,last_name,initials,color,email,phone)VALUES (?,?,?,?,?,?)');
    stmt.run(firstName,lastName,initials,color,email,phone);
};

const deleteGlobalContactFromDbById=(globalContactId)=>{
    const stmt =db.prepare('DELETE  FROM GlobalContacts WHERE global_contact_id = ?');
    stmt.run(globalContactId);
};

const deleteGlobalContactFromDbByName=(firstName,lastName)=>{
    const stmt = db.prepare('DELETE * FROM GlobalContacts WHERE first_name = ? AND last_name = ?');
    stmt.run(firstName,lastName);
};

const getGlobalContactFromDbById=(globalContactId)=>{
  const stmt = db.prepare('SELECT * FROM GlobalContacts WHERE global_contact_id = ?');
  return stmt.get(globalContactId);
};

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
    getTaskIdByTitle,
    addGlobalContact,
    deleteGlobalContactFromDbById,
    getGlobalContactFromDbById

};
