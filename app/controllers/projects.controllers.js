const model = require("../model/pm_manager.model");
const {findById, parseUserExported:parseUser} = require("./users.controllers");

exports.findAllProjects = async (req, res) => {
  //console.log(req);
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
  //console.log(rows);
  const techProjects = Promise.all(rows.map(async row =>{
    const [tecnologias] =await connection.execute("SELECT * FROM `Tecnologias` techs INNER JOIN `TecnologiasProyecto` tProj ON tProj.id_tecnologia = techs.id WHERE tProj.id_proyecto = ?",[row.id])
    const [usuarios] = await connection.execute("SELECT * FROM `PerfilesProyecto` pProj INNER JOIN `Usuarios` usr ON usr.id = pProj.id_usuario WHERE pProj.id_proyecto = ?",[row.id]);
    const techs = tecnologias.map(tech=>{
      return(
        {
          id: tech.id,
          nombre: tech.nombre,
          descripcion: tech.descripcion,
          logo: tech.logo,
          creador: tech.creador,
          version: tech.version
        }
      );
    });

    const users = usuarios.map(user=>{
      return(
        {
          id: user.id,
          nombre: user.nombre,
          apellidos: user.apellidos,
          nickname: user.nickname,
          email: user.email,
          avatar: user.avatar,
          admin: Boolean(user.admin)
        }
      );
    });

    return {
      ...row,
      tecnologias:techs,
      usuarios:users
    }; 
  })).then(resp=>{
    connection.end();
    res.send(resp);
  });

  
  
  
  
  
  
  
  
  
  //connection.end();
  //res.send(rows);
};
