module.exports.getConnection=function(){

    const mysql = require('mysql');

    let config = {
        host     : 'localhost',
        user     : 'pm_manager',
        password : 'Covid-19',
        database : 'pm_projects',
        insecureAuth : true
    };

    return mysql.createConnection(config);
}