//Initialisierung Express.js
const express = require('express');
const app = express();

//Initialisierung der Datenbank
const DATABASE = "database.db";
let db = require("better-sqlite3")(DATABASE);

//Server starten
app.listen(3000, function () {
    console.log("listening on port 3000");
});

//Init. EJS - müssen im Ordner views sein
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave: false
}));

//Public Zugriff
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/javascript"));


//Get Request
app.get("/index", function (req, res) {
    req.session.destroy();
    res.sendFile(__dirname + "/views/index.html");
});

app.get("/summary", function (req, res) {
    res.sendFile(__dirname + "/views/summary.html");
});

app.get("/board", function (req, res) {
    res.sendFile(__dirname + "/views/board.html");
});
app.get("/contacts", function (req, res) {
    res.sendFile(__dirname + "/views/contacts.html");
});
app.get("/projectOverview", function (req, res) {
    res.sendFile(__dirname + "/views/projectOverview.html");
});
app.get("/navTest", function (req, res) {
    res.sendFile(__dirname + "/views/navTest.html");
});

app.get("/signUp", function (req, res) {
    res.sendFile(__dirname + "/views/signUp.html");
});


