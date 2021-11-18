const mongoose = require('mongoose');

const Reporte = {
    periodo: Map,
    sorteo: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Sorteo'
    },
    deudores: {
        boletosApartados: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Boleto'
        }],
        montoDeuda: Number
    },
    boletos: {
        boletosApartados: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Boleto'
        }],
        boletosVendidos: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Boleto'
        }],
        boletosLibres: [{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Boleto'
        }]
    },
    historico: {
        fechasDelSorteo: Map,
        nombre: String,
        montoRecaudado: Number,
        montoPendiente: Number,
        cantNumerosVendidos: Number,
        cantNumerosSinPagar: Number,
        cantNumerosLibres: Number
    }
};

module.exports = Reporte;