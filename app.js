//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


//inicializar variables

var app = express();


//body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Importar rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');


//conexion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDb', (error, res) => {
    if (error) throw error;
    console.log('base de datos : \x1b[32m%s\x1b[0m', 'online');

});


//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/', appRoutes);

//escuchar peticiones
app.listen(3000, () => {
    console.log('express server puerto 3000 : \x1b[32m%s\x1b[0m', 'online');
});