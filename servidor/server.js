const express = require('express');
const cors = require('cors');
const path = require('path');

const router = require('../rutas/rutas');
const ErrorHandler = require('../errorHandler/errorHandler');


const app = express();
app.set('port', 3000);
app.use(express.json());

app.use(cors({ origin: '*' }));

app.use('/api', router);


// obtiene la ruta del directorio publico donde se encuentran los elementos estaticos (css, js).
var publicPath = path.resolve(__dirname, '../public'); //path.join(__dirname, 'public'); también puede ser una opción

// Para que los archivos estaticos queden disponibles.
app.use(express.static(publicPath));

// sendFile will go here
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


app.all('*', (req, resp, next) => {
    next(
        new ErrorHandler(
            `No se pudo acceder a ${req.originalUrl} en el servidor`,
            404
        )
    );
});

app.use(express.urlencoded({ extended: true }));

module.exports = app;