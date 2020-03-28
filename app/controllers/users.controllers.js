const model = require("../model/pm_manager.model");

exports.findByNickname = async nickname => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT * FROM `Usuarios` WHERE `nickname` = ?',[nickname]);
  connection.end();
  if (rows.length){ 
    const user=parseUser(rows[0]);
    return(user);
  }
  return false;
};

exports.findById = async id => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT * FROM `Usuarios` WHERE `id` = ?',[id]);
  connection.end();
  if (rows.length){ 
    const user = parseUser(rows[0]);
    return(user);
  }
  return false;
};


exports.createUser = async (req,res) =>{
  
  const connection = await model.getConnection();
  const user = parseUser(req.body.user);
  const [rows] = await connection.execute('INSERT INTO `Usuarios` VALUES (NULL,?,?,?,?,?,?,?)',
                      [user.nickname,user.password,user.email,user.nombre,user.apellidos,user.admin,'default.png']);
  
  connection.end();
  user.id=rows.insertId;
  delete user.password;
  res.status(200).send(user);
}


exports.findAllUsers = async (req,res)  => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute('SELECT * FROM `Usuarios` ORDER BY id DESC');
  connection.end();
  const users = rows.map(row => ({id: row.id,
                                  nombre: row.nombre,
                                  apellidos: row.apellidos,
                                  nickname: row.nickname,
                                  email:row.email,
                                  avatar: row.avatar,
                                  admin: row.admin}));
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
  results.admin = (results.admin) ? 1:0;
  return {
    id: results.id,
    nombre: results.nombre,
    apellidos: results.apellidos,
    nickname: results.nickname,
    password: results.password,
    avatar: results.avatar,
    email:results.email,
    admin: results.admin
  };
};

