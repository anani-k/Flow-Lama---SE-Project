// db.js

const DATABASE = "database.db";
const db = require("better-sqlite3")(DATABASE);

module.exports = db;
