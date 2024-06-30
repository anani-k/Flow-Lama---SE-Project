// routes.js
const DatabaseEmitter = require("./myEmitter");
const bodyParser = require("body-parser");
const db = require('./db');
const myEmitter = require("./myEmitter");
const {fetchAndTransformContacts} = require("./db");


module.exports = (app) => {
    const myEmitter = require('./myEmitter');
    app.use(bodyParser.json()); // Parse JSON data

function checkPassword(req) {
    const userPassword = req.body["password"];
    const confirmPassword = req.body["confirmPassword"];
    return userPassword === confirmPassword; //gerne noch Passwordbedingungen implementierten
}


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
        if (req.session.sessionValue!==undefined){
            myEmitter.emit('board', res);
        } else{
            myEmitter.emit('redirect', res);

        }

    });

    // Summary
    app.get("/summary", (req, res) => {
        if (req.session.sessionValue!==undefined){
            myEmitter.emit('summary', req, res);
        } else{
            myEmitter.emit('redirect', res);

        }

    });

    // Contacts
    app.get("/contacts", (req, res) => {
        if (req.session.sessionValue!==undefined){
            myEmitter.emit('contacts', res);
        } else{
            myEmitter.emit('redirect', res);

        }
    });

    // logintry
    app.post("/logintry", (req, res) => {
        myEmitter.emit('userLogin', req, res); // Benutzeranmeldung auslösen
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

    app.post("/newDataFromClient", (req, res) => {
        if (req.session.sessionValue!==undefined){
            myEmitter.emit('newData', req, res);
        } else{
            myEmitter.emit('redirect', res);
        }
    });

    // Logout
    app.get("/logout", (req, res) => {
        myEmitter.emit('userLogout', req, res); // Benutzerabmeldung auslösen
    });

/*
    app.get('/events', (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();
        console.log(`Established Connection`);

        function arrayToString(data) {
            // Initialize an empty array to hold key-value strings
            let resultArray = [];

            // Loop through each object in the array
            data.forEach(obj => {
                // Loop through each key-value pair in the object
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        // Concatenate key and value with a colon and push to the array
                        resultArray.push(`${key}:${obj[key]}`);
                    }
                }
            });

            // Join all elements in the array with an '&' symbol
            return resultArray.join('&');
        }

        const sendUpdate = (update) => {
            const contactArray = fetchAndTransformContacts();
            const contactString = arrayToString(contactArray);
            console.log(11111222333,contactString);


            //@LION    Der Value muss durch die daten der Datenbank ersetzt werden. Hier muss also erst die Datenbank ausgelesen und die Daten in einer Vaiablen
            //gespeichert werden, die du dann dem stringify übergibst (anstatt dem jetztigen String "Test"
            res.write(`data: ${JSON.stringify(contactString)}\n\n`);


        };

        db.DatabaseEmitter.on('dbChange', () => {
            console.log(`DatabaseDatabaseCHANGE`);
            sendUpdate();

        });

        req.on('close', () => {
            console.log(`Closed Connection`);
            db.DatabaseEmitter.removeListener('dbChange', sendUpdate);
        });
    });
*/
};
