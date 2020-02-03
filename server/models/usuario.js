const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
}

let usuairoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario.']
    },
    email: {
        type: String,
        required: [true, 'El correo es necesario.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La clave es necesaria.']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuairoSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;

    return userObject;
}

//Le decimos al esquema que use un plugin particular en este caso, uniqueValidator
usuairoSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

// Exportar modelo a mongodb
// Usuario: Nombre del modelo
// usuarioSchema: Esquema del modelo
module.exports = mongoose.model('Usuario', usuairoSchema);