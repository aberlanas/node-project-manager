const model = require("../model/pm_manager.model");
const moment = require('moment');
const pdf = require('html-pdf');
const handlebars = require('handlebars');
const fs = require("fs");

exports.reportAllProjectsHTML = async (req,res) =>{

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
      connection.end();
      console.log(resp);

      var source = fs.readFileSync('./app/templates/reportAllProjects.html', 'utf-8');
      var template = handlebars.compile(source);
      var outhtml = template({resp:resp});
  
      return outhtml;
    });
  
    return techProjects;

  
}


exports.reportAllProjects = async (req, res) => {




  let reportName = "FCT_Proyectos_ListadoTodos_"+"hoy"+".pdf"
  var options = { 
    format: 'A4',
    base: "file:///home/aberlanas/GitHub/node-project-manager/"
  };
  let salida = await this.reportAllProjectsHTML();

  console.log("salida",salida);

  pdf.create(salida, options).toFile("/tmp/"+reportName, function(err, resp) {

    if (err) return console.log(err);

    console.log(resp); 
    res.download("/tmp/"+reportName, function (err) {
      if (err) {
          console.log("Error");
          console.log(err);
      } else {
          console.log("Success");
      }
    });
    // { filename: '/app/businesscard.pdf' }
  });

  /*

  // Create a document
  const doc = new PDFDocument();

  // Pipe its output somewhere, like to a file or HTTP response
  // See below for browser usage
  let today = moment().format('YYYYMMDD');

  doc.pipe(fichero);

  // Embed a font, set the font size, and render some text
  doc.fontSize(25).text("FCT Proyect Manager", 100, 100);

  // Add an image, constrain it to a given size, and center it vertically and horizontally

  doc.image('src/img/dr-node.jpg', {
    fit: [250, 300],
    align: 'center',
    valign: 'center'
  });
  // Finalize PDF file





  doc.end();

  */
  /*
      // DESDE AQUI
  
  console.log(data);
  res.writeHead(200, {
    "Content-Type": "application/pdf",
    "Content-Disposition": "attachment; filename=output.pdf",
    "Content-Length": data.length
  });
  */
 /*
 fs.readFile("/tmp/output2.pdf",function (err,data) {
  res.contentType("application/pdf");
  console.log(data);
  res.send(data);
 });
*/


};
