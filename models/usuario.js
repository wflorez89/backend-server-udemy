var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var rolesvalidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: {
        type: "String",
        required: [true, "El nombre es necesario"]
    },

    email: {
        type: "String",
        unique: true,
        required: [true, "El email es necesario"]
    },

    password: {
        type: "String",
        required: [true, "la ontraseña es necesaria"]
    },

    img: {
        type: "String",
        required: false
    },


    role: {
        type: "String",
        required: false,
        default: 'USER_ROLE',
        enum: rolesvalidos
    }
});

usuarioSchema.plugin(uniqueValidator, { message: "El {PATH} debe de ser unico" });

module.exports = mongoose.model('Usuario', usuarioSchema);