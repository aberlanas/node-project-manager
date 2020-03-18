const mysql = require('mysql');
const express = require('express');
const path = require('path');

const app = express();

// Paginas publicas (estaticas)
app.use(express.static(path.join(__dirname, 'public')));

// Preparando la API
app.use("/api",require('./app/routes/users.routes.js'));

// Escuchemos en un puerto
app.listen(3000,() => {
    console.log(" * Node Project Manger -> Up and Running en http://localhost:3000");
});