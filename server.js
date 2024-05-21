//*****INITIALISIERUNGEN*****

//Initialisierung Express.js
const express = require('express');
const app = express();

//Initialisierung. EJS - müssen im Ordner views sein
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//bcrypt nochmal online machen
const bcrypt = require('bcrypt');

//Initialisierung body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

//Initialisierung cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Initialisierung datenbank
const DATABASE = "database.db";
const db = require("better-sqlite3")(DATABASE);

//Initialisierung sessions
const session = require('express-session');
app.use(session({
    secret: 'example',
    resave: false,
    saveUninitialized: true
}));

//EventEmitter für Observer-Pattern
const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

//Public Zugriff
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static('views'));

//*****SERVERSTART*****

//Server starten
app.listen(3000, function () {
    console.log("listening on port 3000");
});

//*****Observer*****
//wird ein Event mit Namen X ausgelöst, so reagiert der dazugehörige Observer mit bestimmten befehlen, die in diesem Bereich definiert werdne

//Beobachter für Benutzeraktivitäten
myEmitter.on('userLogin', (username, res) => {
    console.log(`User logged in: ${username}`);
    res.render("summary");
});

myEmitter.on('userLogout', (username,res) => {
    console.log(`User logged out: ${username}`);
    res.redirect("/index");

});

myEmitter.on('userSignUp', (username,res) => {
    console.log(`New user signed up: ${username}`);
    res.render(__dirname + "/views/index.ejs");

});

myEmitter.on('failedLogin', (username,res) => {
    console.log(`User failed to log in: ${username}`);
    res.render("loginFail");
});

myEmitter.on('failedSignUp', (username,res) => {
    console.log(`User failed to sign up: ${username}`);
    res.render("passwordFail");

});


//*****ROUTING*****

//Home/ index
app.get("/index", function (req, res) {
    let counter = parseInt(req.cookies['counter']) || 0;
    const maxAge = 3600 * 1000; // one hour
    res.cookie('counter', counter + 1, { 'maxAge': maxAge });
    res.render(__dirname + "/views/index.ejs");
});

//Sign Up
app.get("/signUp", function (req, res) {
    res.render(__dirname + "/views/signUp.ejs");
});

//Board
app.get("/board", function (req, res) {
    res.render(__dirname + "/views/board.ejs");
});

//Summary
app.get("/summary", function (req, res) {
    res.render(__dirname + "/views/summary.ejs");
});

//Contacts
app.get("/contacts", function (req, res) {
    res.render(__dirname + "/views/contacts.ejs");
});

//logintry
app.post("/logintry", function (req, res) {
    const username = req.body["username"];
    const userpassword = req.body["password"];
    const rows = db.prepare('SELECT password FROM Users WHERE username = ?').all(username);
    const hash = rows[0].password;
    const check = bcrypt.compareSync(userpassword, hash);

    if (rows.length > 0 && check) {
        req.session.sessionValue = username;
        myEmitter.emit('userLogin', username,res); // Benutzeranmeldung auslösen
    } else {
        myEmitter.emit('failedLogin', username,res); // Benutzeranmeldung auslösen
    }
});



//Register
app.post("/newUser", function (req, res) {
    const userName = req.body["name"];
    const userEmail = req.body["email"];
    const userPassword = req.body["password"];
    const confirmPassword = req.body["confirmPassword"];

    if (userPassword===confirmPassword) {
        const row = db.prepare('SELECT * FROM users WHERE username = ?').all(userName);
        if (row.length > 0) {
            res.render("userFail");
        } else {
            const saltRounds = 10;
            bcrypt.hash(userPassword, saltRounds,  (err, hash) => {
                db.prepare('INSERT INTO users(username, email, password) VALUES (?, ?, ?)').run(userName, userEmail, hash);
            });
            myEmitter.emit('userSignUp', userName,res); // Benutzerregistrierung auslösen
        }
    } else {
        myEmitter.emit('failedSignUp', userName,res); // Benutzerregistrierung auslösen
    }
    console.log(confirmPassword,userPassword);
});

//Logout
app.post("/logout", function (req, res) {
    const username = req.session.sessionValue;
    req.session.destroy();
    myEmitter.emit('userLogout', username,res); // Benutzerabmeldung auslösen
});
