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
  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT * FROM `Usuarios` WHERE `id` = ?',[id]);
  if (rows.length){ 
    const user = parseUser(rows);
    return(user);
  }
  return false;
};

exports.isValidToken = (req, res) => {
  const data = model.verifyToken(req.body.token);

  res.send({
    auth: data !== undefined,
    data
  });
};

const parseUser = results => {
  return {
    id: results[0].id,
    nombre: results[0].nombre,
    apellidos: results[0].apellidos,
    nickname: results[0].nickname,
    password: results[0].password,
    avatar: results[0].avatar,
    admin: results[0].admin
  };
};

