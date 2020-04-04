const model = require("../model/pm_manager.model");

exports.findByNickname = async nickname => {
  const connection = await model.getConnection();
  const [
    rows
  ] = await connection.execute(
    "SELECT * FROM `Usuarios` WHERE `nickname` = ?",
    [nickname]
  );
  connection.end();
  if (rows.length) {
    const user = parseUser(rows[0]);
    return user;
  }
  return false;
};

exports.findById = async id => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute("SELECT * FROM `Usuarios` WHERE `id` = ?", [id]);
  connection.end();
  if (rows.length) {
    const user = parseUser(rows[0]);
    //console.log(user);
    return user;
  }
  return false;
};

exports.createUser = async (req, res) => {
  const connection = await model.getConnection();
  const user = parseUser(req.body.user);
  console.log(user)
  const [rows] = await connection.execute("INSERT INTO `Usuarios` VALUES (NULL,?,?,?,?,?,?,?)",[user.nickname,user.password,user.email,user.nombre,user.apellidos,user.admin,"default.png"]);
  console.log(rows);
  connection.end();
  user.id = rows.insertId;
  delete user.password;
  res.status(200).send(user);
};

exports.deleteUser = async (req, res) => {
  const connection = await model.getConnection();

  const { id } = req.params;
  let rows = [];
  if (id != "1") {
    console.log(id);
      rows = await connection.execute("DELETE FROM `Usuarios` WHERE `id` =  ?", [
      id
    ]);

    connection.end();
  } else {
    res.status(200).send({ msg: "No tienes poder aqui" });
  }
  user = rows;
  res.status(200).send(user);
};

exports.getUserById = async (req,res) => {
  console.log("Aqui");
  const user = await this.findById(req.params.id);
  delete user.password;
  console.log(user,"Devuelvo");
  res.status(200).send(user);

}

exports.updateUser = async (req, res) => {
  const connection = await model.getConnection();

  let { id } = req.params;
  console.log(id);
  let rows = [];
  const user = req.body.user;
  if (id != "1") {
    rows = await connection.execute("UPDATE `Usuarios` set nickname =  ?, email = ?, nombre = ?, apellidos = ?, admin = ? WHERE `id` = ?",
                                    [user.nickname,user.email,user.nombre,user.apellidos,user.admin,id]);
    connection.end();
  } else {
    res.status(200).send({ msg: "No tienes poder aqui" });
  }
  res.status(200).send({affectedRows:rows[0].affectedRows});
};

exports.findAllUsers = async (req, res) => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM `Usuarios` ORDER BY id DESC"
  );
  connection.end();
  const users = rows.map(row => ({
    id: row.id,
    nombre: row.nombre,
    apellidos: row.apellidos,
    nickname: row.nickname,
    email: row.email,
    avatar: row.avatar,
    admin: Boolean(row.admin)
  }));
  res.send(users);
};

exports.isValidToken = (req, res) => {
  const data = model.verifyToken(req.body.token);

  res.send({
    auth: data !== undefined,
    data
  });
};

const parseUser = results => {
  results.admin = results.admin ? true : false;
  return {
    id: results.id,
    nombre: results.nombre,
    apellidos: results.apellidos,
    nickname: results.nickname,
    password: results.password,
    avatar: results.avatar,
    email: results.email,
    admin: Boolean(results.admin)
  };
};

exports.parseUserExported = parseUser;