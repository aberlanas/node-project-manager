const mysql = require('mysql');

let config = {
    host     : 'localhost',
    user     : 'pm_manager',
    password : 'Covid-19',
    database : 'pm_projects',
    insecureAuth : true
};

let connection = mysql.createConnection(config);

module.exports = connection;

