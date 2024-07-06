// app.js
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const myEmitter = require("./myEmitter");
const db = require("./db");
const routes = require("./routes"); // Update this line

// Initialisiere die Datenbank
db.initializeDatabase();
// Initialisierungen

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json()); // Add this middleware to parse JSON data
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static("views"));
app.use(express.static(__dirname + "/javascript"));
app.use(
    session({
        secret: "example",
        resave: false,
        saveUninitialized: true,
    })
);

app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//Test-User anlegen
bcrypt.hash("Test", (saltRounds = 10), (err, hash) => {
    db.createUser("Test", "Test@TestMail.com", hash);
});

// Call the routes function and pass the app instance as an argument
routes(app); // Update this line

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = { app, myEmitter };