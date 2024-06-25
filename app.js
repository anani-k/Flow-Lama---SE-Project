// app.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bcrypt = require("bcrypt");
const myEmitter = require("./myEmitter");
const db = require("./db");
//const { globalTasks, taskProxy} = require("./JavaScript/array");

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

/*globalTasks.push({
    progress: "todo",
    category: "Technical Tasssssssssssk",
    title: "Button Design",
    description: "Design all Buttons in green",
    date: "11.06.2024",
    openSubtasks: ["testa", "testb"],
    closedSubtasks: ["test3", "test4aaa"],
    priority: "low",
    assigedToId: ["1", "2", "4"],
});*/




//globalTasks.pop();


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
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = { app, myEmitter };
