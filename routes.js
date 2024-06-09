// routes.js

const myEmitter = require("./myEmitter");
const bcrypt = require("bcrypt");

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
    app.get("/", (req, res) => {
        myEmitter.emit('index', res, req);

    });
    app.get("/index", (req, res) => {
        myEmitter.emit('index', res, req);

    });

    // Sign Up
    app.get("/signUp", (req, res) => {
        myEmitter.emit('signUp', res);

    });

    // Board
    app.get("/board", (req, res) => {
        if (req.session.sessionValue!=undefined){
            myEmitter.emit('board', res);
        } else{
            myEmitter.emit('redirect', res);

        }

    });

    // Summary
    app.get("/summary", (req, res) => {
        if (req.session.sessionValue!=undefined){
            myEmitter.emit('summary', req, res);
        } else{
            myEmitter.emit('redirect', res);

        }

    });

    // Contacts
    app.get("/contacts", (req, res) => {
        if (req.session.sessionValue!=undefined){
            myEmitter.emit('contacts', res);
        } else{
            myEmitter.emit('redirect', res);

        }
    });

    // logintry
    app.post("/logintry", (req, res) => {
        const username = req.body["username"];
        const userpassword = req.body["password"];
        const rows = db.prepare('SELECT password FROM Users WHERE username = ?').all(username);
        const hash = rows[0].password;
        if (rows.length > 0 && bcrypt.compareSync(userpassword, hash)) {
            req.session.sessionValue = username;
            myEmitter.emit('userLogin', username, res); // Benutzeranmeldung auslösen
        } else {
            myEmitter.emit('failedLogin', username, res); // fehlerhafte Benutzeranmeldung auslösen
        }
    });

    // Register
    app.post("/newUser", (req, res) => {
        const userName = req.body["username"];

        if (checkPassword(req)) {
            myEmitter.emit('userSignUp', req,res); // Benutzerregistrierung auslösen
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
