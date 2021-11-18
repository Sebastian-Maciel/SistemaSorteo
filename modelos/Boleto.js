const mongoose = require('mongoose');

const boletoSchema = new mongoose.Schema(
    {
        numero: { type: Number, required: true },
        comprobantePago: { type: String },
        tipoPago: { type: String },
        estadoBoleto: { type: String, required: true },
        movimientoBoleto: {
                fecha: { type: Date, required: false },
                descripcion: { type: String, required: false },
        },
        persona: {
            nombre: { type: String, required: false },
            correo: { type: String, required: false },
            direccion: { type: String, required: false },
            numTelefono: { type: String, required: false },
            ciudad: { type: String, required: false },
            estado: { type: String, required: false },
        },
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuario',
            autopopulate: true,
        },
    },
    { collection: 'boleto', versionKey: false }
);

const boleto = mongoose.model('boletos', boletoSchema, 'boletos');
module.exports = boleto;

