//Requires
var express = require('express');
var mongoose = require('mongoose');

//inicializar variables

var app = express();


//conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', (error, res) => {
    if (error) throw error;
    console.log('base de datos : \x1b[32m%s\x1b[0m', 'online');

});


//Rutas
app.get('/', (req, res, netx) => {
    res.status(200).json({
        ok: true,
        mensaje: 'petiion realizada correctamente'
    });
});

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server puerto 3000 : \x1b[32m%s\x1b[0m', 'online');
});