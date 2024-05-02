//Initialisierung Express.js
const express = require('express');
const app = express();

//Server starten
app.listen(3000, function(){
    console.log("listening on port 3000");
});

//Init. EJS - müssen im Ordner views sein
app.engine(".ejs", require("ejs").__express);
app.set("view engine", "ejs");

//
const session = require('express-session');
app.use(session({
    secret: 'example',
    saveUninitialized: false,
    resave:false
}));

//Public Zugriff
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/css"));

//Get Request
app.get("/startseite", function(req, res){
    req.session.destroy();
    res.sendFile(__dirname + "/views/startseite.html");
});

app.get("/summary", function(req, res){
    res.sendFile(__dirname + "/views/summary.html");
});

app.get("/board", function(req, res){
    res.sendFile(__dirname + "/views/board.html");
});
app.get("/contacts", function(req, res){
    res.sendFile(__dirname + "/views/contacts.html");
});
app.get("/projectOverview", function(req, res){
    res.sendFile(__dirname + "/views/projectsOverview.html");
});
app.get("/navTest", function(req, res){
    res.sendFile(__dirname + "/views/navTest.html");
});



