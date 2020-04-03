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
    creador: row.creador,
    version: row.version
  }));
  console.log(techs);
  res.send(techs);
};

exports.createTech = async (req, res) => {
  const connection = await model.getConnection();
  const tech = parseTech(req.body.tech);
  tech.creador = req.user.id ? req.user.id : 1;

  let logoName = "default.png";
  if (req.body.tech.logo) {
    var base64Data = req.body.tech.logo.replace(
      /^data:image\/jpeg;base64,/,
      ""
    );

    logoName =
      req.body.tech.nombre + "_" + Date.now() + "_" + tech.creador + ".jpeg";
    require("fs").writeFile(
      `./src/img/techs/${logoName}`,
      base64Data,
      "base64",
      function(err) {
        console.log(err);
      }
    );
  }
  const [
    rows
  ] = await connection.execute(
    "INSERT INTO `Tecnologias` VALUES (NULL,?,?,?,?,?)",
    [tech.nombre, tech.descripcion, logoName, tech.creador, tech.version]
  );
  connection.end();
  tech.id = rows.insertId;
  res.status(200).send(tech);
};

const parseTech = results => {
  return {
    id: results.id,
    nombre: results.nombre,
    descripcion: results.descripcion,
    version: results.version,
    logo: results.logo,
    creador: results.creador
  };
};
