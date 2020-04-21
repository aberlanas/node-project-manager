use pm_projects;

-- admin -> admin
-- jagaroc -> ancla

TRUNCATE TABLE Proyectos;
INSERT INTO Proyectos VALUES (NULL,"Run to Win","Red Social de Running.");
INSERT INTO Proyectos VALUES (NULL,"El Baron de la Birra","Red Social de Cervezas Artesanas");
INSERT INTO Proyectos VALUES (NULL,"Pintorrea","DiccioPinta online");
INSERT INTO Proyectos VALUES (NULL,"Chess Tournament Generator","Gestor de Emparejamientos Suizos para Ajedrez");
INSERT INTO Proyectos VALUES (NULL,"EuroStudents ","Gestor Becas Erasmus y Viajes");
INSERT INTO Proyectos VALUES (NULL,"SportStore","Tienda de deportes");
INSERT INTO Proyectos VALUES (NULL,"Ambient Music Generator","Creación de Música de Mobiliario");
INSERT INTO Proyectos VALUES (NULL,"Paiporta Universalis 4","Juego de Gran Estrategia");

TRUNCATE TABLE PerfilesProyecto;
--  ID PERFIL, ID USARIO , ID PROYECTO

-- Jagaroc Run to win
INSERT INTO PerfilesProyecto VALUES (3,9,1);
INSERT INTO PerfilesProyecto VALUES (4,2,1);

-- Carlos Baron de la birra
INSERT INTO PerfilesProyecto VALUES (3,5,2);
INSERT INTO PerfilesProyecto VALUES (4,2,2);

-- Ruben Pintorrea
INSERT INTO PerfilesProyecto VALUES (3,16,3);
INSERT INTO PerfilesProyecto VALUES (4,2,3);

-- Raul - Chess
INSERT INTO PerfilesProyecto VALUES (3,12,4); 
INSERT INTO PerfilesProyecto VALUES (4,2,4);

-- Brian - EuroStudents
INSERT INTO PerfilesProyecto VALUES (3,10,5);
INSERT INTO PerfilesProyecto VALUES (4,2,5);

-- SportStore
INSERT INTO PerfilesProyecto VALUES (3,15,6);
INSERT INTO PerfilesProyecto VALUES (4,3,6);

-- Ambien music generator
INSERT INTO PerfilesProyecto VALUES (3,4,7);
INSERT INTO PerfilesProyecto VALUES (4,2,7);

-- Paiporta Universalis
INSERT INTO PerfilesProyecto VALUES (3,14,8);
INSERT INTO PerfilesProyecto VALUES (4,2,8);

TRUNCATE TABLE TecnologiasProyecto;

INSERT INTO TecnologiasProyecto  VALUES (1,5);
INSERT INTO TecnologiasProyecto  VALUES (1,6);
INSERT INTO TecnologiasProyecto  VALUES (1,1);
INSERT INTO TecnologiasProyecto  VALUES (1,13);

INSERT INTO TecnologiasProyecto  VALUES (2,5);
INSERT INTO TecnologiasProyecto  VALUES (2,7);
INSERT INTO TecnologiasProyecto  VALUES (2,1);
INSERT INTO TecnologiasProyecto  VALUES (2,13);

INSERT INTO TecnologiasProyecto  VALUES (3,3);
INSERT INTO TecnologiasProyecto  VALUES (3,8);
INSERT INTO TecnologiasProyecto  VALUES (3,10);
INSERT INTO TecnologiasProyecto  VALUES (3,13);

INSERT INTO TecnologiasProyecto  VALUES (4,13);
INSERT INTO TecnologiasProyecto  VALUES (5,13);
INSERT INTO TecnologiasProyecto  VALUES (6,13);
INSERT INTO TecnologiasProyecto  VALUES (7,13);

