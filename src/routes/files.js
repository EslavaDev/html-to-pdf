'use strict'

let express = require('express');
const {FileController} = require('../controller/FilesController');
const archivoController = new FileController();
const archivo = express.Router();
let multipart = require('connect-multiparty');

let multipartMiddleware = multipart({uploadDir: './src/uploads'});



archivo.post('/upload/:id',multipartMiddleware, archivoController.uploadImagen);
archivo.get('/down/:id',multipartMiddleware, archivoController.downloadImagenFile);
archivo.get('/get/:id',multipartMiddleware, archivoController.getImagenFile);

module.exports = archivo;
