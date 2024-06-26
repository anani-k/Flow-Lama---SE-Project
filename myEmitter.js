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
        const loggingIn = true;
        res.render(__dirname + "/views/summary.ejs",{username,loggingIn});
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
    db.createTask("Test","DB test", "26.06.2024","in progress","1","2");

    res.render(__dirname + "/views/contacts.ejs");
});
myEmitter.on('summary', (req,res) => {
    console.log(`View Summary`);
    const username = req.session.sessionValue;
    const loggingIn  = false
    res.render(__dirname + "/views/summary.ejs",{username,loggingIn});
});

myEmitter.on('board', (res) => {
    console.log(`View Board`);
    res.render(__dirname + "/views/board.ejs");
    db.createTask("Test","DB test", "26.06.2024","in progress","1","2");
});

myEmitter.on('newData', (req, res) => {
    const data = req.body;
    const globalTasks = [];
    const globalContacts = [];
    let taskIndex = 0;
    let contactIndex = 0;

    for (const key in data) {
        if (key.startsWith('task_')) {
            const property = key.replace(/task_\d+_/, '');
            if (!globalTasks[taskIndex]) {
                globalTasks[taskIndex] = {};
            }
            globalTasks[taskIndex][property] = data[key];
            if(property==="assigedToId"){
                taskIndex+=1;
            }
        } else if (key.startsWith('contact_')) {
            const property = key.replace(/contact_\d+_/, '');
            if (!globalContacts[taskIndex]) {
                globalContacts[taskIndex] = {};
            }
            globalContacts[taskIndex][property] = data[key];
            if(property==="phone"){
                taskIndex+=1;
            }
        } else if (key === 'GlobalLastId') {
            // handle GlobalLastId separately
        }
    }

    res.send('Data received successfully!');
    console.log('Received data:', globalTasks, globalContacts);

    //@LION Hier habe ich dir die daten vom Client wieder als zwei Arrays zusammengesetzt: globalTasks und globalContacts.
    //Bitte hier die Daten in die Datenbank einfügen lassen
    //Bitte nur die Datenbankfunktionen verwenden, keine Hardgecodeten SQL-Statements
    //Wenn du weitere Datenbank funktionen erstellst, die die Datenbank verändern, UNBEDINGT folgende Zeile am ende der neuen Funktion einfügen:
    //   DatabaseEmitter.emit('dbChange', { type: '** HIER Art der änderung Beschreiben**'});
    //Beispiele für diese zeile findest du in allen andern "schreibenden" DB-Funktionen
    //Datenbankaufbau bitte ändern, wenn nötig
});


module.exports = myEmitter;
