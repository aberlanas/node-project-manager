const model = require("../model/pm_manager.model");
const pdfkit = require("pdfkit");
const moment = require('moment');
const pdf = require('html-pdf');

exports.reportAllProjectsHTML = async (req,res) =>{

  console.log("Me han llamado");
  res.send("<html><body><h1>ESTO ES EL TITULO</h1></body></html>");

}


exports.reportAllProjects = async (req, res) => {

  const connection = await model.getConnection();
  const [rows] = await connection.execute("SELECT * FROM `Usuarios`", []);
  connection.end();


  const fs = require("fs");

  var html = fs.readFileSync('./test/businesscard.html', 'utf8');


  
  let reportName = "FCT_Proyectos_ListadoTodos_"+today+".pdf"

  let fichero = fs.createWriteStream("/tmp/"+reportName);

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
  fichero.on('finish', function () {
    res.download("/tmp/"+reportName, function (err) {
      if (err) {
          console.log("Error");
          console.log(err);
      } else {
          console.log("Success");
      }
    });
  });

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
