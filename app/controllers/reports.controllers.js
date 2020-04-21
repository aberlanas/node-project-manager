const model = require("../model/pm_manager.model");
const moment = require('moment');
const pdf = require('html-pdf');
const handlebars = require('handlebars');
const fs = require("fs");
const path = require('path');

exports.reportAllProjectsHTML = async (fecha,req,res) =>{

  const connection = await model.getConnection();
  const [rows] = await connection.execute("SELECT Proyectos.id, Proyectos.nombre FROM `Proyectos`", []);
  const techProjects = Promise.all(
    rows.map(async (row) => {
      const [
        students,
      ] = await connection.execute(
        "SELECT * FROM `PerfilesProyecto` pProj INNER JOIN `Usuarios` usr ON usr.id = pProj.id_usuario WHERE pProj.id_proyecto = ? AND pProj.id_perfil=3 AND usr.id IN (SELE),
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
      connection.end();

      let timeSignature = moment(fecha.date).locale('es').format('D [de] MMMM [de] YYYY');
      var source = fs.readFileSync('./app/templates/reportAllProjects.html', 'utf-8');
      var template = handlebars.compile(source);
      resp.timeSignature= timeSignature;
      var outhtml = template({
                            resp:resp,
                            timeSignature:timeSignature
                          });
  
      return outhtml;
    });
  
    return techProjects;

  
}


exports.reportAllProjects = async (req, res) => {

  // Some Options for this report
  
  
  let timeStamp  = moment().format("YYYYMMDD");
 
  let reportName = "FCT_Proyectos_ListadoTodos_"+timeStamp+".pdf";

  let optsbase = "file://"+path.join(__dirname,"../../");
  optsbase = "file:///home/aberlanas/GitHub/node-project-manager/";
  let options = {
    format:"A4",
    base:optsbase
  }
  
  // If not date selected, use today.
  let fecha = moment().format("YYYYMMDD");
  if (req.body.reportData)fecha = req.body.reportData;

  let htmlFromReport = await this.reportAllProjectsHTML(fecha);
  
  pdf.create(htmlFromReport, options).toFile("/tmp/"+reportName, function(err, resp) {

    if (err) return console.log(err);
    
    res.download("/tmp/"+reportName, function (err) {
      if (err) {
          console.log("Error");
          console.log(err);
      } else {
          console.log("Success");
      }
    });
  });




};
