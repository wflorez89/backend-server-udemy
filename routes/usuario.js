var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var miiddlewareautenticacion = require('../middlewares/autenticacion');

var app = express();

var Usuario = require('../models/usuario');


//Obtener todod los usuarios
app.get('/', (req, res, netx) => {

    Usuario.find({}, 'nombre email img role').exec((err, usuarios) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error cargando usuarios',
                erros: err
            });
        }
        res.status(200).json({
            ok: true,
            mensaje: 'Usuarios',
            usuarios: usuarios
        });
    });


});


//Crear un nuevo usuario
app.post('/', miiddlewareautenticacion.verificaToken, (req, res, next) => {

    var body = req.body;
    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    });

    usuario.save((err, usuarioguardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'error crear usuario',
                erros: err
            });
        }
        res.status(201).json({
            ok: true,
            usuario: usuarioguardado,
            usuariotoken: req.usuario

        });

    });
});

//actualizar un nuevo usuario
app.put('/:id', miiddlewareautenticacion.verificaToken, (req, res, next) => {

    var id = req.params.id;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error al buscar usuario',
                erros: err
            });
        }

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'el usuario con el id ' + id + 'no existe',
                erros: { message: 'no exitse un usuario' }
            });

        }

        var body = req.body;
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioguardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'error actualizar usuario',
                    erros: err
                });
            }

            usuarioguardado.password = ':)';

            res.status(201).json({
                ok: true,
                usuario: usuarioguardado
            });

        });


    });
});

//Elminar usuario
app.delete('/:id', miiddlewareautenticacion.verificaToken, (req, res, next) => {
    var id = req.params.id;
    Usuario.findByIdAndRemove(id, (err, usuarioborrado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error eliminar usuario',
                erros: err
            });
        }

        if (!usuarioborrado) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error eliminar usuario',
                erros: { message: 'no existe el usuario con el id' }
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioborrado
        });
    });
});




module.exports = app;