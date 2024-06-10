// myEmitter.js

const EventEmitter = require('events');
const bcrypt = require("bcrypt");
const db = require("./db");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('index',  (res, req) => {
    req.session.destroy();
    let counter = parseInt(req.cookies['counter']) || 0;
    const maxAge = 3600 * 1000; // one hour
    res.cookie('counter', counter + 1, { 'maxAge': maxAge });
    res.render(__dirname + "/views/index.ejs");
});

myEmitter.on('redirect', (res) => {
   res.redirect('index');
});

myEmitter.on('signUp',  (res) => {
    res.render(__dirname + "/views/signUp.ejs");
});

myEmitter.on('userLogin', (req, res) => {
    const username = req.body["username"];
    const userpassword = req.body["password"];
    const user = db.getUserByUsername(username);
    //console.log(user,user!==undefined,user.length,bcrypt.compareSync(userpassword, user.password));
    if (user!==undefined&&bcrypt.compareSync(userpassword, user.password)) {
        req.session.sessionValue = username;
        console.log(`User logged in: ${username}`);
        res.redirect("summary");
    } else {
        console.log(`User failed to log in: ${username}`);
        res.render("index");
    }

});

myEmitter.on('userLogout', (req, res) => {
    const username = req.session.sessionValue;
    console.log(`User logged out: ${username}`);
    req.session.destroy();
    res.redirect("/index");
});

myEmitter.on('userSignUp', (req, res) => {
    const username= req.body["username"];
    if(db.getUserByUsername(username)===undefined){
        const saltRounds = 10;
        bcrypt.hash(req.body["password"], saltRounds, (err, hash) => {
            db.createUser(username, req.body["email"], hash)
        });
        res.render(__dirname + "/views/index.ejs");
    } else {
        console.log(`User ${username} already exists`)
        res.redirect("/signUp");
    }

});


myEmitter.on('failedSignUp', (username, res) => {
    console.log(`User failed to sign up: ${username}`);
    res.render("passwordFail");
});

myEmitter.on('contacts', (res) => {
    console.log(`Opend Contacts`);
    res.render(__dirname + "/views/contacts.ejs");
});
myEmitter.on('summary', (req,res) => {
    console.log(`View Summary`);
    const username = req.session.sessionValue;
    res.render(__dirname + "/views/summary.ejs",{username});
});

myEmitter.on('board', (res) => {
    console.log(`View Board`);
    res.render(__dirname + "/views/board.ejs");
});


module.exports = myEmitter;
