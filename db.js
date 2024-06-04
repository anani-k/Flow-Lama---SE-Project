// db.js

const DATABASE = "database.db";
const db = require("better-sqlite3")(DATABASE);
/*const initialization = fs.readFileSync('DB_init.sql', 'utf8');
const testData = fs.readFileSync('testData.sql', 'utf8');
db.exec(initialization);
db.exec(testData);*/

module.exports = db;
