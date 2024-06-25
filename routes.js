// routes.js
const myEmitter = require("./myEmitter");
const bodyParser = require("body-parser");

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

    //newData in DB
    app.get('/updates', (req, res) => {
        // Send the current data to the client
        db.all('SELECT * FROM users', (err, rows) => {
            if (err) {
                res.status(500).send({ error: 'Error fetching updates' });
            } else {
                res.send(rows);
            }
        });
    });
};
