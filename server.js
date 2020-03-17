
let mysql = require('mysql');
 
let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'pm_manager',
    password : 'Covid-19',
    database : 'pm_projects',
    insecureAuth : true
});

connection.connect((err) => {
      if(!err){
          console.log(' La Base de Datos esta conectada !');
          let sql = `SELECT * FROM Alumnos`;
          connection.query(sql, (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
            console.log(results);
          });
          connection.end(); 
      }
      else
          console.log('Database connectie niet gelukt!  : '+ JSON.stringify(err, undefined,2));
  });