// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const myEmitter = require("./myEmitter");
const db = require("./db");

// Initialisiere die Datenbank
db.initializeDatabase();
// Initialisierungen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "example",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(bodyParser.json()); // Add this middleware to parse JSON data

app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static("views"));
app.use(express.static(__dirname + "/javascript"));

//Test-User anlegen
bcrypt.hash("Test", (saltRounds = 10), (err, hash) => {
  db.createUser("Test", "Test@TestMail.com", hash);
});
// Routen
require("./routes")(app);

// Server starten
const PORT = 3000;
// Store connected clients
const clients = []
const server = app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
// Handle new client connections
app.get('/stream', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    // Add the client to the list of connected clients
    clients.push(res);

    // Handle client disconnections
    req.on('close', () => {
        const index = clients.indexOf(res);
        if (index!== -1) {
            clients.splice(index, 1);
        }
    });
changesDb.on('change', (changes) => {
    console.log('Database changed:', changes);

    // Send a notification to the client to refresh its data
    clients.forEach((client) => {
        client.res.write('Event: update\n');
        client.res.write('Data: update\n\n');
    });
});
module.exports = { app, myEmitter };
