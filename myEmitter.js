// myEmitter.js

const EventEmitter = require('events');
const bcrypt = require("bcrypt");
const db = require("./db");
const {updateGlobalContacts, updateTasks, DatabaseEmitter, fetchAndTransformTasks, fetchAndTransformContacts,
    insertGlobalContacts, getLastContactID
} = require("./db");

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
    if (user!==undefined&&bcrypt.compareSync(userpassword, user.password)) {
        req.session.sessionValue = username;
        console.log(`User logged in: ${username}`);
        const loggingIn = true;
        res.redirect("/summary");
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
    let tasksArray = fetchAndTransformTasks();
    let contactsArray =fetchAndTransformContacts();
    let lastID = getLastContactID();
    console.log("Send data:",tasksArray,contactsArray,lastID);
    res.render(__dirname + "/views/contacts.ejs", { updatedtasks: JSON.stringify(tasksArray) ,updatedcontacts: JSON.stringify(contactsArray),lastID });
});
myEmitter.on('summary', (req,res) => {
    console.log(`View Summary`);
    const username = req.session.sessionValue;
    let tasksArray =fetchAndTransformTasks();
    let contactsArray = fetchAndTransformContacts();
    let lastID= getLastContactID();
    console.log("Send data:",tasksArray,contactsArray,lastID);

    res.render(__dirname + "/views/summary.ejs",{username,updatedtasks: JSON.stringify(tasksArray) ,updatedcontacts: JSON.stringify(contactsArray),lastID});
});

myEmitter.on('board', (res) => {
    console.log(`View Board`);
    let tasksArray = fetchAndTransformTasks();
    let contactsArray = fetchAndTransformContacts();
    let lastID= getLastContactID();
    console.log("Send data:",tasksArray,contactsArray,lastID);

    res.render(__dirname + "/views/board.ejs", { updatedtasks: JSON.stringify(tasksArray) ,updatedcontacts: JSON.stringify(contactsArray),lastID });
});

myEmitter.on('newData', (req, res) => {
    const data = req.body;
    const globalTasks = [];
    const globalContacts = [];
    let taskIndex = 0;
    let contactIndex = 0;
    let savedKey;
    for(let key in data){
        savedKey = key;
        break;
    }
    if(savedKey!==undefined&&savedKey.startsWith('FromPage')) {
        console.log("This ist the saved key", data[savedKey]);
        if (data[savedKey] === "Tasks") {
            updateTasks([]);
        } else if (data[savedKey] === "Contacts") {
            updateGlobalContacts([]);
        } else {
            console.log("Fehler beim Übertragen der Daten");
        }
    } else if (savedKey!==undefined&&savedKey.startsWith('task_')) {
        for (const task in data) {
            const property = task.replace(/task_\d+_/, '');
            if (!globalTasks[taskIndex]) {
                globalTasks[taskIndex] = {};
            }
            globalTasks[taskIndex][property] = data[task];
            if (property === "assigedToId") {
                taskIndex += 1;
            }
        }
        updateTasks(globalTasks);
    }else if (savedKey!==undefined&&savedKey.startsWith('contact_')) {
        for (const contact in data) {
            const property = contact.replace(/contact_\d+_/, '');
            if (!globalContacts[contactIndex]) {
                globalContacts[contactIndex] = {};
            }
            globalContacts[contactIndex][property] = data[contact];
            if (property === "phone") {
                contactIndex += 1;
            }
        }
        updateGlobalContacts(globalContacts);
    }

    res.send('Data received successfully!');
    console.log('Received data:', globalTasks, globalContacts);
});


module.exports = myEmitter;
