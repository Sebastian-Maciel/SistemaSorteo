const express = require('express');
const sorteo = require('../controladores/sorteoController');
const boleto = require('../controladores/boletoController');

const router = express.Router();

//sorteo
router.post('/sorteo', sorteo.guardarSorteo);
router.get('/sorteo/:id', sorteo.getSorteo);
router.get('/sorteos', sorteo.getSorteos);
router.get('/sorteoboletos/:id', sorteo.getBoletosPorSorteo);
router.delete('/sorteo/:id', sorteo.eliminarSorteo);
router.put('/sorteo/:id', sorteo.actualizarSorteo);


//boleto
router.post('/boleto/', boleto.crearBoleto);
router.put('/boleto/:id', boleto.actualizarBoleto);
router.get('/boletos', boleto.getBoletos);
router.get('/boleto/:id', boleto.getBoleto);

//Sorteo
// router
// .route('/sorteo')
// .put(sorteo.guardarSorteo)
// .get('/:id', sorteo.getSorteo)
// .get('/sorteos', sorteo.getSorteos)
// .delete('/:id', sorteo.eliminarSorteo)
// .post('/:id', sorteo.actualizarSorteo);

//Boleto
// router
// .route('/boleto')
// .post('/:id', boleto.actualizarBoleto); 

module.exports = router;
