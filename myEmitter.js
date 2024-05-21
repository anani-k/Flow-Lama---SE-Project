// myEmitter.js

const EventEmitter = require('events');
const bcrypt = require("bcrypt");
const db = require("./db");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('userLogin', (username, res) => {
    console.log(`User logged in: ${username}`);
    res.render("summary");
});

myEmitter.on('userLogout', (username, res) => {
    console.log(`User logged out: ${username}`);
    res.redirect("/index");
});

myEmitter.on('userSignUp', (username, useremail, userpassword, res) => {
    const saltRounds = 10;
    console.log(`New user signed up: ${username}`);
    bcrypt.hash(userpassword, saltRounds, (err, hash) => {
        db.prepare('INSERT INTO users(username, email, password) VALUES (?, ?, ?)').run(username, useremail, hash);
    });
    res.render(__dirname + "/views/index.ejs");
});

myEmitter.on('failedLogin', (username, res) => {
    console.log(`User failed to log in: ${username}`);
    res.render("loginFail");
});

myEmitter.on('failedSignUp', (username, res) => {
    console.log(`User failed to sign up: ${username}`);
    res.render("passwordFail");
});

module.exports = myEmitter;
