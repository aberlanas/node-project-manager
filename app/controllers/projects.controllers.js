const model = require("../model/pm_manager.model");
const {findById, parseUserExported:parseUser} = require("./users.controllers");

exports.findAllProjects = async (req, res) => {
  console.log(req);
  const connection = await model.getConnection();
  let consulta;
  if(req.user.admin==true){
    consulta = "SELECT * FROM `Proyectos`";
  }else{
    // "select * from Proyectos inner join PerfilesProyecto where PerfilesProyecto.id = req.user.id"
    consulta = "SELECT * FROM `Proyectos` INNER JOIN `PerfilesProyecto` perfProj ON perfProj.id_proyecto = `Proyectos`.id WHERE perfProj.id_usuario = ? AND perfProj.id_perfil = 3";
  }
  const [rows] = await connection.execute(
    consulta
  ,[req.user.id]);

  console.log(rows);
  connection.end();
  res.send(rows);
};
