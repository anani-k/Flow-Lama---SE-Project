// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const myEmitter = require("./myEmitter");
const db = require("./db");

// Initialisiere die Datenbank
db.initializeDatabase();
// Initialisierungen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "example",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json()); // Add this middleware to parse JSON data

app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static("views"));
app.use(express.static(__dirname + "/javascript"));

//Test-User anlegen
bcrypt.hash("Test", (saltRounds = 10), (err, hash) => {
  db.createUser("Test", "Test@TestMail.com", hash);
});
// Routen
require("./routes")(app);

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = { app, myEmitter };
