const connection = require("../model/pm_manager.model").getConnection();

// Obtener todos los puntuaciones
exports.isValidUser = (req,res) => {
    connection.connect((err) => {
        if(!err){
            let sql = `SELECT * FROM Alumnos`;
            connection.query(sql, (error, results, fields) => {
              if (error) {
                return console.error(error.message);
              }
              res.send(results);
            });
            
            connection.end(); 
           
        }
        else
            console.log('Database connectie niet gelukt!  : '+ JSON.stringify(err, undefined,2));
    });
};
