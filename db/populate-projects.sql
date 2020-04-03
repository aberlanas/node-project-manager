use pm_projects;

-- admin -> admin
-- jagaroc -> ancla

TRUNCATE TABLE Cursos;
INSERT INTO Cursos VALUES (NULL,"2 DAW - 2020 - COVID 19 Experience");


TRUNCATE TABLE Proyectos;
INSERT INTO Proyectos VALUES (NULL,"Node Project Manager","Gestion de Proyectos de FCTs MyMyselfandI");
INSERT INTO Proyectos VALUES (NULL,"Node Project Manager v2","Gestion de Proyectos de FCTs Again");
INSERT INTO Proyectos VALUES (NULL,"Node Project Manager Reloaded","Gestion de Proyectos de FCTs Experienced Improvement");


TRUNCATE TABLE PerfilesProyecto;

INSERT INTO PerfilesProyecto VALUES (3,5,1);
INSERT INTO PerfilesProyecto VALUES (4,7,1);

INSERT INTO PerfilesProyecto VALUES (3,3,2);
INSERT INTO PerfilesProyecto VALUES (4,7,2);

INSERT INTO PerfilesProyecto VALUES (3,6,3);
INSERT INTO PerfilesProyecto VALUES (4,7,3);


TRUNCATE TABLE TecnologiasProyecto;

INSERT INTO TecnologiasProyecto  VALUES (1,5);
INSERT INTO TecnologiasProyecto  VALUES (1,6);
INSERT INTO TecnologiasProyecto  VALUES (1,1);

INSERT INTO TecnologiasProyecto  VALUES (2,5);
INSERT INTO TecnologiasProyecto  VALUES (2,7);
INSERT INTO TecnologiasProyecto  VALUES (2,1);

INSERT INTO TecnologiasProyecto  VALUES (3,3);
INSERT INTO TecnologiasProyecto  VALUES (3,8);
INSERT INTO TecnologiasProyecto  VALUES (3,10);
