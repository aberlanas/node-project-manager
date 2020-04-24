const model = require("../model/pm_manager.model");
const moment = require('moment');
const pdf = require('html-pdf');
const handlebars = require('handlebars');
const fs = require("fs");
const path = require('path');

const fetch = require('node-fetch');


exports.reportProjectsDefense = async (params,req,res) =>{

  
console.log(this.domainAngel);
  const hola = fetch(this.domainAngel+"./api/projects/findAllProjects").then((res) => {
    return res.json()
  }).then( (resp) => {
    console.log(resp);
  });


      let timeSignature = moment(params.timeSignature).locale('es').format('D [de] MMMM [de] YYYY');
      var source = fs.readFileSync('./app/templates/reportProjectsDefense.html', 'utf-8');
      var template = handlebars.compile(source);
      params.timeSignature= timeSignature;
      var outhtml = template(params);
  
    return outhtml;

  
}

exports.reportProjectsFromStudent = async (req,res) =>{


  // Sanity Checks
  if (!req.body.reportData.users.length){
    return res.status(411).send({message:"No hay usuarios seleccionados",type:"error"})
  }


  // Some Options for this report
  
  let timeSignature = moment().format("YYYYMMDD");
 
  let reportName = "FCT_Proyectos_ListadoTodos_"+timeSignature+".pdf";

  let optsbase = "file://"+path.join(__dirname,"../../");

  let options = {
    format:"A4",
    base:optsbase
  }

  // If not date selected, use today.
  if (req.body.reportData.date) {
    timeSignature = req.body.reportData.date;
  }

  const connection = await model.getConnection();
  const [rows] = await connection.query("SELECT proj.id, proj.nombre FROM `Proyectos` proj INNER JOIN `PerfilesProyecto` pProj ON proj.id = pProj.id_proyecto WHERE pProj.id_usuario IN ("+req.body.reportData.users+")");

  const techProjects = Promise.all(
    rows.map(async (row) => {
      const [
        students,
      ] = await connection.query(

        "SELECT * FROM `PerfilesProyecto` pProj INNER JOIN `Usuarios` usr ON usr.id = pProj.id_usuario WHERE pProj.id_proyecto = "+row.id+" AND usr.id IN("+req.body.reportData.users+")");

      const alumnos = students.map((user) => {
        return {
          id: user.id,
          nombre: user.nombre,
          apellidos: user.apellidos
        };
      });
      return {
        ...row,
        alumnos : alumnos
      };
    })

    ).then((resp) => {
      connection.end();
      return resp;
    
    });

    const params = { projects:await techProjects,
      timeSignature : timeSignature
     }

    let htmlFromReport = await this.reportProjectsDefense(params);
    
    pdf.create(htmlFromReport, options).toFile("/tmp/"+reportName, function(err, resp) {

      if (err) return console.log(err);
      
      res.download("/tmp/"+reportName, function (err) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
      });
    });
}

exports.reportAllProjects = async (req, res) => {
  //let usrs = req.body.reportData.users;
  // Some Options for this report
  
  
  let timeSignature  = moment().format("YYYYMMDD");
 
  let reportName = "FCT_Proyectos_ListadoTodos_"+timeSignature+".pdf";

  let optsbase = "file://"+path.join(__dirname,"../../");

  let options = {
    format:"A4",
    base:optsbase
  }
  
  // If not date selected, use today.

  if (req.body.reportData){
    timeSignature = req.body.reportData.date;
  }


  const connection = await model.getConnection();
  const [rows] = await connection.execute("SELECT Proyectos.id, Proyectos.nombre FROM `Proyectos`", []);
  const techProjects = Promise.all(
    rows.map(async (row) => {
      const [
        students,
      ] = await connection.execute(
        "SELECT * FROM `PerfilesProyecto` pProj INNER JOIN `Usuarios` usr ON usr.id = pProj.id_usuario WHERE pProj.id_proyecto = ? AND pProj.id_perfil=3",
        [row.id]
      );

      const alumnos = students.map((user) => {
        return {
          id: user.id,
          nombre: user.nombre,
          apellidos: user.apellidos
        };
      });
      return {
        ...row,
        alumnos : alumnos
        //usuarios['profesores']= profesores}
      };
    })

    ).then((resp) => {
      // Adding Common  parameters and cleaning Stuffs
      connection.end();
      return resp;
    });

    const params = { projects:await techProjects,
      timeSignature : timeSignature
     }
    let htmlFromReport = await this.reportProjectsDefense(params);
    
    pdf.create(htmlFromReport, options).toFile("/tmp/"+reportName, function(err, resp) {

      if (err) return console.log(err);
      
      res.download("/tmp/"+reportName, function (err) {
        if (err) {
            console.log("Error");
            console.log(err);
        }
      });
    });

};
