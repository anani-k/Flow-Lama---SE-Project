

//*****INITIALISIERUNGEN*****

//Initialisierung Express.js
const express = require('express');
const app = express();

//Init. EJS - müssen im Ordner views sein
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//init sessions
const session = require('express-session');
app.use(session({
    secret: 'example',
    resave: false,
    saveUninitialized: true
}));

//init datenbank
const DATABASE = "math.db";
const db = require("better-sqlite3")(DATABASE);


/*
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave: false
}));*/

//init cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

//Public Zugriff
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));


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
    const username = req.body["userName"];
    const userpassword=req.body["userPassword"];
    const rows = db.prepare('SELECT userpassword FROM users WHERE username = ?').all(username);
    const sessionName = req.body["userName"]

    if (rows.length === 0) {
        res.render("loginFail")
    }
    else {
        const hash = rows[0].userpassword;
        const check = bcrypt.compareSync(userpassword,hash)
        if(check==true){
            req.session.sessionValue = sessionName;

            //session lesen
            if (!req.session.sessionValue){
                //session nicht gesetzt
                res.render("sessionFail")
            }
            else{
                //sesion gesetzt
                console.log(req.session)
                res.render("userHome")
            }

        }
        if(check==false){

            res.render("loginFail")
        }
    }
});



app.get("/summary", function (req, res) {
    res.sendFile(__dirname + "/views/summary.html");
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

app.get("/signUp", function (req, res) {
    res.sendFile(__dirname + "/views/signUp.html");
});


