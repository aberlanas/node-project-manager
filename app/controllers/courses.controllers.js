const model = require("../model/pm_manager.model");
const moment = require('moment');


exports.getAllCourses = async (req, res) => {
    const connection = await model.getConnection();
    const [rows] = await connection.execute(
        "SELECT * FROM `Cursos` ORDER BY id DESC"
      );
      connection.end();
    const courses = rows.map((row) => ({
        id:row.id,
        nombre: row.nombre,
        periodo:row.periodo
    }));
    res.send(courses)
}
