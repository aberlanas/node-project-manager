const model = require('../model/pm_manager.model');

// Obtener todos los puntuaciones
exports.isValidUser = async (req, res) => {
	const connection = await model.getConnection();
    connection.connect(async err => {
        if (!err) {
            let sql = `SELECT * FROM Alumnos`;
            connection.query(sql, (error, results, fields) => {
                if (error) {
                    return console.error(error.message);
                }
                res.send(results);
            });
        } else {
            console.log(
                "Database connectie niet gelukt!  : " +
                    JSON.stringify(err, undefined, 2)
            );
        }
    });
};
