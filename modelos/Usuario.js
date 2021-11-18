const mongoose = require('mongoose');

const Usuario = {
    nombre: String,
    contrasenia: String,
    correo: String,
    numeroDeContacto: String,
    direccion: String,
    boletos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'boleto' }]
};

module.exports = Usuario;
