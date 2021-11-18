const mongoose = require('mongoose');

const Pago = {
    usuario: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario'
    },
    estado: String,
    monto: Number,
    boleto: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Boleto'
    },
    sorteo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sorteo'
    }
};

module.exports = Pago;