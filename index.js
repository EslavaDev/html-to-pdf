'use strict'

let mongoose = require('mongoose');
let port = process.env.PORT || 3700;
let app = require('./app');

//mongoose.connect('mongodb://localhost:27017/Files_Sql', (err, res) =>{
	//if(err){
	//	throw err;
//	}else{
		console.log("Base de datos Conectada Correctamente");

		app.listen(port, () =>{
			console.log("Api Rest-Full de albums Funcionando y escuchando");
		})
//	}
//});
