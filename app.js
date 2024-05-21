// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const myEmitter = require('./myEmitter');
const db = require('./db');

// Initialisierungen
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'example',
    resave: false,
    saveUninitialized: true
}));

app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static('views'));

// Routen
require('./routes')(app);

// Server starten
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = { app, myEmitter };
