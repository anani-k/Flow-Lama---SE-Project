

//*****INITIALISIERUNGEN*****

//Initialisierung Express.js
const express = require('express');
const app = express();

//Init. EJS - müssen im Ordner views sein
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//bcrypt nochmal online machen
const bcrypt = require('bcrypt');

//init body-parser
const bodyParser= require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//init cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//init datenbank
const DATABASE = "database.db";
const db = require("better-sqlite3")(DATABASE);



//init sessions
const session = require('express-session');
app.use(session({
    secret: 'example',
    resave: false,
    saveUninitialized: true
}));



/*
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave: false
}));*/


//Public Zugriff
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));
app.use(express.static('views'));

//*****SERVERSTART*****

//Server starten
app.listen(3000, function () {
    console.log("listening on port 3000");
});



//*****ROUTING*****

//Home/ index
app.get("/index", function (req, res) {

    //Lion
    let counter = parseInt(req.cookies['counter']) || 0;
    const maxAge = 3600*1000; // one hour
    res.cookie('counter' , counter + 1, {'maxAge': maxAge});
    res.sendFile(__dirname + "/views/index.html");


    //
   /* req.session.destroy();
    res.sendFile(__dirname + "/views/index.html");*/
});

//logintry
app.post("/logintry",function(req,res){
    const username = req.body["username"];
    const userpassword=req.body["password"];
    const rows = db.prepare('SELECT password FROM Users WHERE username = ?').all(username);
    const sessionName = req.body["username"];

    if (rows.length === 0) {
        res.render("loginFail");
        console.log("1");
    }
    else {
        const hash = rows[0].password;
        const check = bcrypt.compareSync(userpassword,hash)
        if(check===true){
            req.session.sessionValue = sessionName;

            //session lesen
            if (!req.session.sessionValue){
                //session nicht gesetzt
                res.render("sessionFail")
                console.log("2")
            }
            else{
                //sesion gesetzt
                console.log(req.session)
                res.render("summary")
                console.log("3")
            }

        }
        if(check===false){

            res.render("loginFail")
            console.log("4")
        }
    }
});

//Sign Up
app.get("/signUp", function (req, res) {
    res.sendFile(__dirname + "/views/signUp.html");
});

//add new user
app.post("/newUser", function(req, res) {
    const userName = req.body["name"];
    const userEmail =req.body["email"];
    const userPassword = req.body["password"];
    const confirmPassword = req.body["confirmPassword"];


    console.log(userName, userPassword, confirmPassword);

    // Überprüfung, ob der Benutzername bereits in der Datenbank existiert

    const params = [userName];

    const row = db.prepare('SELECT * FROM users WHERE username = ?').all(userName);
    console.log("ROW", row)

    if (row.length > 0) {
        res.render("userFail");
    } else {
        if (userPassword === confirmPassword) {
            const saltRounds = 10;
            bcrypt.hash(userPassword, saltRounds, function(err, hash) {
                const info = db.prepare(`INSERT INTO users(username,email, password)
              VALUES (?,?,?)`).run(userName,userEmail, hash);

                res.sendFile(__dirname + "/views/index.html");
            });
        } else {
            res.render("passwordFail");
        }
    }

});

//Logout
app.post("/logout",function(req,res){

    req.session.destroy();

    res.redirect("/index");
});



app.get("/summary", function (req, res) {
    res.sendFile(__dirname + "/views/summary.ejs");
});

app.get("/board", function (req, res) {
    res.sendFile(__dirname + "/views/board.html");
});
app.get("/contacts", function (req, res) {
    res.sendFile(__dirname + "/views/contacts.html");
});
app.get("/projectOverview", function (req, res) {
    res.sendFile(__dirname + "/views/projectOverview.html");
});
app.get("/navTest", function (req, res) {
    res.sendFile(__dirname + "/views/navTest.html");
});




