var express = require('express');
var app = express();

app.get('/', (req, res, netx) => {
    res.status(200).json({
        ok: true,
        mensaje: 'petiion realizada correctamente'
    });
});


module.exports = app;