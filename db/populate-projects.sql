use pm_projects;

-- admin -> admin
-- jagaroc -> ancla

TRUNCATE TABLE Cursos;
INSERT INTO Cursos VALUES (NULL,"2 DAW - 2020 - COVID 19 Experience");


TRUNCATE TABLE Proyectos;
INSERT INTO Proyectos VALUES (NULL,"Node Project Manager","Gestion de Proyectos de FCTs MyMyselfandI");
INSERT INTO Proyectos VALUES (NULL,"Node Project Manager v2","Gestion de Proyectos de FCTs Again");
INSERT INTO Proyectos VALUES (NULL,"Node Project Manager Reloaded","Gestion de Proyectos de FCTs Experienced Improvement");
INSERT INTO Proyectos VALUES (NULL,"MySQL improvement","Gestor de MySQL");
INSERT INTO Proyectos VALUES (NULL,"MySQL improvement 2","Gestor de MySQL 1");
INSERT INTO Proyectos VALUES (NULL,"MySQL improvement 3","Gestor de MySQL 2");
INSERT INTO Proyectos VALUES (NULL,"MySQL improvement 4","Gestor de MySQL 3");
INSERT INTO Proyectos VALUES (NULL,"MySQL improvement 5","Gestor de MySQL 4");

TRUNCATE TABLE PerfilesProyecto;
--  ID PERFIL, ID USARIO , ID PROYECTO


INSERT INTO PerfilesProyecto VALUES (3,2,4);
INSERT INTO PerfilesProyecto VALUES (4,7,4);

INSERT INTO PerfilesProyecto VALUES (3,3,2);
INSERT INTO PerfilesProyecto VALUES (4,7,2);

INSERT INTO PerfilesProyecto VALUES (3,4,1);
INSERT INTO PerfilesProyecto VALUES (4,7,1);

INSERT INTO PerfilesProyecto VALUES (3,6,3);
INSERT INTO PerfilesProyecto VALUES (4,7,3);

INSERT INTO PerfilesProyecto VALUES (3,5,5);
INSERT INTO PerfilesProyecto VALUES (4,7,5);

INSERT INTO PerfilesProyecto VALUES (3,6,6);
INSERT INTO PerfilesProyecto VALUES (4,7,6);

INSERT INTO PerfilesProyecto VALUES (3,1,7);
INSERT INTO PerfilesProyecto VALUES (4,7,7);

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

