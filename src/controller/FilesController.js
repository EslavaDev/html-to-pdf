'use strict';

var fs = require('fs');
var conversion = require("phantom-html-to-pdf")();
const {
  promisify
} = require('util');
const readdir = promisify(fs.readFile);
const path = require('path');


class FileController {


  async uploadImagen(req, res) {
    let file = {}

    if (req.files) {
      let file_path = req.files.image.path;
      let file_split = file_path.split('/');
      let file_name = file_split[2];
      file.file_name = file_name;
    
      try {
            let html = await readdir(`./src/uploads/` + file_name)
            let html2 = "<h2>hola</h2>"
            let data = file_name.split('.');
            data = data[0];
            let options = {
              html:html2,
              numberOfWorkers: 2,
              paperSize: {
                format: 'A4',
                margin: {
                  top: "80px",
                  right: "25px",
                  bottom: "75px",
                  left: "25px"
                }
              },
              viewportSize: {
                width: 600,
                height: 375
              },
              format: {
                quality: 100
              }
            }
            
            await conversion(options, async (err, pdfs) => {
              if (err)
                return console.error(err, "entro aca");
  
              var output = fs.createWriteStream(`./src/uploads/${data}.pdf`);
  
              try {
                await pdfs.stream.pipe(output);
              } catch (error) {
                return console.error(error);
              }
            });
            
            res.status(200).send({
              url: `http://localhost:3700/get/${data}.pdf`,
              download: `http://localhost:3700/down/${data}.pdf`
            })
            return await setTimeout(async() => {
              await fs.unlink(`./src/uploads/${data}.html`);
            }, 1000)
      } catch (err) {
        return console.log(error);
      }
    } else {
      res.status(200).send({
        message: 'no has subido ningun File'
      });
    }
  }

  downloadImagenFile(req, res) {
    let imageFile = req.params.id;
    let pack = req.package
    let data = imageFile.split('.');
            data = data[0];
    let url = (pack) ? `./src/uploads/${pack}/` : `./src/uploads/`
    try {
      fs.exists(url + imageFile, async (exists) => {
        if (!exists) {
          res.status(200).send({
            message: 'no existe el Archivo a descargar'
          });
        } else {
          return await res.download(path.resolve(url + data + '.pdf'));
        }
      });
    } catch (err) {
      return console.log(error);
    }
  }

  getImagenFile(req,res){
    let imageFile = req.params.id;
    let pack = req.params.package
  
    let url =`./src/uploads/${imageFile}`
    fs.exists(url, (exists)=>{
      console.log(exists)
      if(!exists){
        res.status(200).send({message: 'no existe el Archivo a mostrar'});
      }else{
        res.sendFile(path.resolve(url));
      }
    });
  }
}


module.exports.FileController = FileController;