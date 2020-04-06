const model = require("../model/pm_manager.model");
const {findById, parseUserExported:parseUser} = require("./users.controllers");

exports.findAllProjects = async (req, res) => {
  const connection = await model.getConnection();
  const [rows] = await connection.execute(
    "SELECT * FROM `Proyectos` "
  );
  connection.end();
  console.log(rows);
  res.send(rows);
};
