

-- Utilities
-- select user from mysql.user;

-- Creamos la BBDD
drop database if exists pm_projects;
create database pm_projects;


-- Creamos usuario
drop user if exists pm_manager;
FLUSH privileges;

CREATE USER 'pm_manager'@'%' IDENTIFIED WITH mysql_native_password BY 'Covid-19';
GRANT ALL PRIVILEGES ON pm_projects.* TO 'pm_manager'@'%' WITH GRANT OPTION;

ALTER USER 'pm_manager'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Covid-19';

FLUSH PRIVILEGES;

-- Usar la BBDD 
USE pm_projects;

Create table Usuarios ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nickname VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	nombre VARCHAR(255) NOT NULL,
	apellidos VARCHAR(255) NOT NULL,
	admin BOOLEAN NOT NULL DEFAULT 0,
	avatar VARCHAR(255) DEFAULT "default.png"
);


CREATE TABLE Perfiles (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	leer BOOLEAN NOT NULL DEFAULT 1,
	modificar BOOLEAN NOT NULL DEFAULT 0,
	borrar BOOLEAN NOT NULL DEFAULT 0,
	comentar BOOLEAN NOT NULL DEFAULT 0,
	evaluar BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE PerfilesProyecto(
	id_perfil INT NOT NULL,
	id_usuario INT NOT NULL,
	id_proyecto INT NOT NULL,
	
	PRIMARY KEY (id_perfil , id_usuario,id_proyecto)
);

CREATE TABLE  Cursos ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255)
);


CREATE TABLE  Proyecto ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	id_profesor INT NOT NULL,
	id_alumno INT NOT NULL,
	id_curso INT NOT NULL
);

CREATE TABLE  Tecnologia ( 
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(255),
	version VARCHAR(255)
);


CREATE TABLE TecnologiasProyecto ( 
	id_proyecto INT NOT NULL ,
	id_tecnologia INT NOT NULL,
	PRIMARY KEY (id_proyecto , id_tecnologia)
);

