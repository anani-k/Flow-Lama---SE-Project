-- Lösche vorhandene Tabellen in der richtigen Reihenfolge
DROP TABLE IF EXISTS Contacts;
DROP TABLE IF EXISTS Tasks;
DROP TABLE IF EXISTS Projects;
DROP TABLE IF EXISTS Users;

-- Erstelle die Benutzer-Tabelle
CREATE TABLE Users (
   user_id INTEGER PRIMARY KEY AUTOINCREMENT,
   username TEXT NOT NULL,
   email TEXT NOT NULL,
   password TEXT NOT NULL
);

-- Erstelle die Projekte-Tabelle
CREATE TABLE Projects (
  project_id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_name TEXT NOT NULL,
  description TEXT,
  board_name TEXT NOT NULL
);

-- Erstelle die Aufgaben-Tabelle
CREATE TABLE Tasks (
   task_id INTEGER PRIMARY KEY AUTOINCREMENT,
   task_title TEXT NOT NULL,
   description TEXT,
   due_date TEXT,
   status TEXT,
   assignee_id INTEGER,
   project_id INTEGER,
   FOREIGN KEY(assignee_id) REFERENCES Users(user_id),
   FOREIGN KEY(project_id) REFERENCES Projects(project_id)
);

-- Erstelle die Kontakte-Tabelle
CREATE TABLE Contacts (
  contact_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  contact_user_id INTEGER NOT NULL,
  FOREIGN KEY(user_id) REFERENCES Users(user_id),
  FOREIGN KEY(contact_user_id) REFERENCES Users(user_id),
  UNIQUE(user_id, contact_user_id)
);
