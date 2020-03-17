

-- Utilities
-- select user from mysql.user;

-- Creamos la BBDD
drop database if exists pm_projects;
create database pm_projects;


-- Creamos usuario
drop user if exists pm_manager;
flush privileges;

CREATE USER 'pm_manager'@'%' IDENTIFIED WITH mysql_native_password BY 'Covid-19';
GRANT ALL PRIVILEGES ON pm_projects.* TO 'pm_manager'@'%' WITH GRANT OPTION;

ALTER USER 'pm_manager'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Covid-19';

FLUSH PRIVILEGES;

-- Usar la BBDD 

USER pm_projects;

Create table Alumnos ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	apellidos VARCHAR(255)
);


Create table Profesores ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	apellidos VARCHAR(255)
);

Create table Cursos ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255)
);


Create table Proyecto ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	id_profesor INT NOT NULL,
	id_alumno INT NOT NULL,
	id_curso INT NOT NULL
);

Create table Tecnologia ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	version VARCHAR(255)
);


Create table TecnologiasProyecto ( 
	id_proyecto INT NOT NULL ,
	id_tecnologia INT NOT NULL,
	PRIMARY KEY (id_proyecto , id_tecnologia)
);

