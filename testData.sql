-- Füge Testdaten in die Projekte-Tabelle ein
INSERT INTO Projects (project_name, description, board_name) VALUES
                                                                 ('Project Alpha', 'Description for Project Alpha', 'Board Alpha'),
                                                                 ('Project Beta', 'Description for Project Beta', 'Board Beta');

-- Füge Testdaten in die Benutzer-Tabelle ein
INSERT INTO Users (username, email, password) VALUES
                                                  ('user1', 'user1@example.com', 'password1'),
                                                  ('user2', 'user2@example.com', 'password2'),
                                                  ('user3', 'user3@example.com', 'password3');

-- Füge Testdaten in die Aufgaben-Tabelle ein
INSERT INTO Tasks (task_title, description, due_date, status, assignee_id, project_id) VALUES
                                                                                           ('Task 1', 'Description for Task 1', '2024-06-01', 'todo', 1, 1),
                                                                                           ('Task 2', 'Description for Task 2', '2024-06-05', 'in-progress', 2, 1),
                                                                                           ('Task 3', 'Description for Task 3', '2024-06-10', 'done', 3, 2);

-- Füge Testdaten in die Kontakte-Tabelle ein
INSERT INTO Contacts (user_id, contact_user_id) VALUES
                                                    (1, 2),
                                                    (1, 3),
                                                    (2, 3),
                                                    (3, 1);