-- Beispieldatensätze für die Benutzer-Tabelle

INSERT INTO Users(username, email, password) VALUES ('Alex','test@gmail.com','admin1234!'); --Password is 'admin1234!'
INSERT INTO Users(username, email, password) VALUES ('John','john@gmail.com','ICHBINJOHN'); --Password is 'ICHBINJOHN'
INSERT INTO Users(username, email, password) VALUES ('Claire','claire@fromthewoods.com','IlikeTrees'); --Password is 'IlikeTrees'

-- Beispieldatensätze für die Projekte-Tabelle

INSERT INTO Projects(project_name, description, board_name) VALUES ('TestProjekt','Projekt zum Testen','Das erste Board');
INSERT INTO Projects(project_name, description, board_name) VALUES ('bestprojectever','ich bin so cool','cooles Board');
INSERT INTO Projects(project_name, description, board_name) VALUES ('Projekt3','','Board ohne Beschreibung');

-- Beispieldatensätze für die Aufgaben-Tabelle

INSERT INTO Tasks (task_title, description, due_date, status, assignee_id, project_id) VALUES ('Aufgabe 1', 'Beschreibung für Aufgabe 1', '2024-05-01 12:00:00', 'ToDo', 1, 1);
INSERT INTO Tasks (task_title, description, due_date, status, assignee_id, project_id) VALUES ('Aufgabe 2', 'Beschreibung für Aufgabe 2', '2024-05-02 12:00:00', 'In Progress', 2, 1);
INSERT INTO Tasks (task_title, description, due_date, status, assignee_id, project_id) VALUES ('Aufgabe 3', 'Beschreibung für Aufgabe 3', '2024-05-03 12:00:00', 'Done', 3, 2);

-- Aktualisiere die Tasks-Tabelle mit Fremdschlüsseln

UPDATE Tasks SET assignee_id = 1 WHERE task_id = 1; -- Bezieht sich auf Alex
UPDATE Tasks SET assignee_id = 2 WHERE task_id = 2; -- Bezieht sich auf John
UPDATE Tasks SET assignee_id = 3 WHERE task_id = 3; -- Bezieht sich auf Claire
