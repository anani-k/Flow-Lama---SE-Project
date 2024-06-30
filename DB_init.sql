-- Lösche vorhandene Tabellen in der richtigen Reihenfolge
DROP TABLE IF EXISTS Contacts;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Users;
DROP TABLE IF EXISTS GlobalContacts;


-- Erstelle die Benutzer-Tabelle
CREATE TABLE Users (
   user_id INTEGER PRIMARY KEY AUTOINCREMENT,
   username TEXT NOT NULL,
   email TEXT NOT NULL,
   password TEXT NOT NULL,
   UNIQUE(username)

);

-- Erstelle die Projekte-Tabelle
CREATE TABLE Projects (
  project_id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_name TEXT NOT NULL,
  description TEXT,
  board_name TEXT NOT NULL
);

-- Erstelle die Aufgaben-Tabelle
CREATE TABLE Tasks
(
    id             INTEGER PRIMARY KEY ,
    progress       TEXT,
    category       TEXT,
    title          TEXT,
    description    TEXT,
    date           TEXT,
    openSubtasks   TEXT,
    closedSubtasks TEXT,
    priority       TEXT,
    assigedToId    TEXT
);

CREATE TABLE GlobalContacts (
    id INTEGER PRIMARY KEY ,
    firstname TEXT NOT NULL ,
    lastname TEXT NOT NULL ,
    initials TEXT NOT NULL ,
    color TEXT,
    email TEXT,
    phone TEXT
);

