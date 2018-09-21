var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var app = express();
var Usuario = require('../models/usuario');
var SEED = require('../config/config').SEED;

app.post('/', (req, res, next) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuariobd) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuario',
                erros: err
            });
        }

        if (!usuariobd) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - email',
                erros: err
            });
        }

        if (!bcrypt.compareSync(body.password, usuariobd.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password',
                erros: { message: 'password' }
            });
        }

        //token
        usuariobd.password = ':)';
        var token = jwt.sign({ usuario: usuariobd }, SEED, { expiresIn: 14400 }); //4 horas


        res.status(200).json({
            ok: true,
            usuario: usuariobd,
            id: usuariobd.id,
            token: token
        });
    });


});



module.exports = app;