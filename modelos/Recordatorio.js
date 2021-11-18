const mongoose = require('mongoose');

const Recordatorio = {
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    contenido: String,
    fechaDeInicio: Date,
    fechaDeFin: Date
};

module.exports = Recordatorio;