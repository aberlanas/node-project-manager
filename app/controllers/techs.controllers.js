const model = require("../model/pm_manager.model");

exports.findAllTechs = async (req, res) => {
    const connection = await model.getConnection();
    const [rows] = await connection.execute(
      "SELECT * FROM `Tecnologias` ORDER BY id DESC"
    );
    connection.end();
    const techs = rows.map(row => ({
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      logo: row.logo,
      creador : row.creador,
      version: row.version
    }));
    console.log(techs);
    res.send(techs);
  };