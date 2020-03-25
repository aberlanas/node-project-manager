const model = require("../model/pm_manager.model");

exports.findByNickname = async nickname => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT * FROM `Usuarios` WHERE `nickname` = ?',[nickname]);
  if (rows.length){ 
    const user=parseUser(rows);
    return(user);
  }
  return false;
};

exports.findById = async id => {
  console.log("Consultando usuarios : ",id);
  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT * FROM `Usuarios` WHERE `id` = ?',[id]);
  console.log(rows);
  if (rows.length){ 
    const user=parseUser(rows);
    return(user);
  }
  return false;
};

exports.isValidUser = async (req, res) => {
  const connection = model.getConnection();

  connection.connect(async err => {
    if (err) {
      return console.error(
        "Database connectie niet gelukt!  : " +
          JSON.stringify(err, undefined, 2)
      );
    }

    const { nickname, password } = req.body;

    let sql = `SELECT * FROM Usuarios WHERE nickname ='${nickname}'`;
    connection.query(sql, (error, results) => {
      if (error) {
        return console.error(error.message);
      }

      if (!results.length) {
        return res.send({ msg: "Usuario no valido" });
      }

      let isCorrect = model.isCorrectPassword(password, results[0].password);

      if (isCorrect) {
        let webToken = model.createWebToken({
          id: results[0].id
        });

        // Creamos el objeto usuario
        // uno de los campos del usuario es el token
        const user = parseUser(results);
        user.token = webToken;

        // Creamos el objeto cookie httponly
        res.setHeader("x-auth-token", webToken);
        res.send(user);

        //return res.send(user);
      } else {
        console.log({ msg: "Usuario no valido" });
        return res.send({ msg: "Usuario no valido" });
      }
    });
  });
};

exports.isValidToken = (req, res) => {
  const data = model.verifyToken(req.body.token);

  res.send({
    auth: data !== undefined,
    data
  });
};

exports.whoAmI = async (req, res) => {

  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT id, nombre, apellidos, nickname, avatar, admin FROM `Usuarios` WHERE `id` = ?',[req.params.id]);
  if (rows.length){ 
    const user=parseUser(rows);
    res.send(user);
  }
};

const parseUser = results => {
  return {
    id: results[0].id,
    nombre: results[0].nombre,
    apellidos: results[0].apellidos,
    nickname: results[0].nickname,
    avatar: results[0].avatar,
    admin: results[0].admin
  };
};

