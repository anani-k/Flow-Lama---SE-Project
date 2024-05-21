// routes.js

function checkPassword(req) {
    const userPassword = req.body["password"];
    const confirmPassword = req.body["confirmPassword"];
    return userPassword === confirmPassword; //gerne noch Passwordbedingungen implementierten
}

module.exports = (app) => {
    const db = require('./db');
    const bcrypt = require('bcrypt');
    const myEmitter = require('./myEmitter');

    // Home/ index
    app.get("/index", (req, res) => {
        let counter = parseInt(req.cookies['counter']) || 0;
        const maxAge = 3600 * 1000; // one hour
        res.cookie('counter', counter + 1, { 'maxAge': maxAge });
        res.render(__dirname + "/views/index.ejs");
    });

    // Sign Up
    app.get("/signUp", (req, res) => {
        res.render(__dirname + "/views/signUp.ejs");
    });

    // Board
    app.get("/board", (req, res) => {
        res.render(__dirname + "/views/board.ejs");
    });

    // Summary
    app.get("/summary", (req, res) => {
        res.render(__dirname + "/views/summary.ejs");
    });

    // Contacts
    app.get("/contacts", (req, res) => {
        res.render(__dirname + "/views/contacts.ejs");
    });

    // logintry
    app.post("/logintry", (req, res) => {
        const username = req.body["username"];
        const userpassword = req.body["password"];
        const rows = db.prepare('SELECT password FROM Users WHERE username = ?').all(username);
        const hash = rows[0].password;
        const check = bcrypt.compareSync(userpassword, hash);

        if (rows.length > 0 && check) {
            req.session.sessionValue = username;
            myEmitter.emit('userLogin', username, res); // Benutzeranmeldung auslösen
        } else {
            myEmitter.emit('failedLogin', username, res); // Benutzeranmeldung auslösen
        }
    });

    // Register
    app.post("/newUser", (req, res) => {
        const userName = req.body["name"];

        if (checkPassword(req)) {
            myEmitter.emit('userSignUp', req); // Benutzerregistrierung auslösen
        } else {
            myEmitter.emit('failedSignUp', userName, res); // Benutzerregistrierung auslösen
        }
    });

    // Logout
    app.post("/logout", (req, res) => {
        const username = req.session.sessionValue;
        req.session.destroy();
        myEmitter.emit('userLogout', username, res); // Benutzerabmeldung auslösen
    });
};
