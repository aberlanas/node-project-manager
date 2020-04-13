const model = require("../model/pm_manager.model");
const {
  findById,
  parseUserExported: parseUser,
} = require("./users.controllers");

exports.findAllTechs = async (req, res) => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute(
    "SELECT Tecnologias.*, Usuarios.id idUser, Usuarios.nombre nombreUser, Usuarios.nickname, Usuarios.email, Usuarios.apellidos, Usuarios.avatar, Usuarios.admin FROM `Tecnologias` INNER JOIN `Usuarios` ON Tecnologias.creador=Usuarios.id ORDER BY id DESC"
  );
  connection.end();
  const techs = rows.map((row) => {
    return {
      id: row.id,
      nombre: row.nombre,
      descripcion: row.descripcion,
      logo: row.logo,
      creador: row.creador,
      version: row.version,
      user: {
        id: row.idUser,
        nickname: row.nickname,
        email: row.email,
        nombre: row.nombreUser,
        apellidos: row.apellidos,
        admin: row.admin,
        avatar: row.avatar,
      },
    };
  });
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
      function (err) {
        console.log(err);
      }
    );
  }
  const [
    rows,
  ] = await connection.execute(
    "INSERT INTO `Tecnologias` VALUES (NULL,?,?,?,?,?)",
    [tech.nombre, tech.descripcion, logoName, tech.creador, tech.version]
  );
  connection.end();
  tech.id = rows.insertId;
  tech.user = req.user;
  res.status(200).send(tech);
};

const parseTech = (results) => {
  return {
    id: results.id,
    nombre: results.nombre,
    descripcion: results.descripcion,
    version: results.version,
    logo: results.logo,
    creador: results.creador,
  };
};

exports.getUsersTech = async (req, res) => {
  const connection = await model.getConnection();
  const [
    rows,
  ] = await connection.execute(
    "SELECT usuarios.* FROM `usuarios` INNER JOIN `perfilesproyecto` INNER JOIN `tecnologiasproyecto` INNER JOIN `tecnologias` " +
      "ON usuarios.id = perfilesproyecto.id_usuario AND perfilesproyecto.id_proyecto = tecnologiasproyecto.id_proyecto AND" +
      " tecnologiasproyecto.id_tecnologia = tecnologias.id WHERE tecnologias.id=? AND perfilesproyecto.id_perfil = 3",
    [req.params.idTech]
  );
  connection.end();
  res.send(rows);
};

exports.getTechById = async (req, res) => {
  const connection = await model.getConnection();
  const { id } = req.params.id;
  const [rows] = await connection.execute(
    "SELECT * FROM `Tecnologias` ORDER BY id DESC"
  );
  connection.end();
  const techs = rows.map((row) => ({
    id: row.id,
    nombre: row.nombre,
    descripcion: row.descripcion,
    logo: row.logo,
    creador: row.creador,
    version: row.version,
  }));
  res.send(techs[0]);
};

exports.getProjectsUsersTechs = async (req, res) => {
  const connection = await model.getConnection();
  const { id } = req.params;
  //Creemos que la línea de abajo devolverá los usuarios que usan una tecnología en concreto, tengan fe. Se ha decidido filtrar sólo por los usuarios que sean estudiantes en un proyecto.
  const [
    rows,
  ] = await connection.execute(
    "SELECT DISTINCT u.*  FROM `Usuarios` u INNER JOIN `PerfilesProyecto` profProj INNER JOIN `TecnologiasProyecto` techProj ON u.id = profProj.id_usuario AND techProj.id_proyecto = profProj.id_proyecto WHERE techProj.id_tecnologia = ? AND profProj.id_perfil = 3",
    [id]
  );
  connection.end();
  //console.log(parseUser(rows[0]));
  const users = rows.map((user) => parseUser(user));
  users.map((user) => {
    delete user.password;
  });
  res.send(users);
};
