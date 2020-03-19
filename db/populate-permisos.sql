use pm_projects;

TRUNCATE TABLE Perfiles;
INSERT INTO Perfiles VALUES (NULL,"Solo Lectura",1,0,0,0,0);
INSERT INTO Perfiles VALUES (NULL,"Lectura y Comentarios",1,0,0,1,0);
INSERT INTO Perfiles VALUES (NULL,"Estudiante",1,1,1,1,0);
INSERT INTO Perfiles VALUES (NULL,"Profesor",1,0,1,1,1);
INSERT INTO Perfiles VALUES (NULL,"Jesucristo",1,1,1,1,1);



