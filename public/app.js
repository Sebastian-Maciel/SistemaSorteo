const boleto = require("../modelos/boleto");

const mostrarBoletos = () => {

}



const getBoletosPorSorteo = (idSorteo) => {
    let sorteo = getSorteo(idSorteo);
    let boletos = getBoletos();

    for (i = 0; i < sorteo.boletos; i++) {
        
    }
    sorteo.boletos.forEach(boleto => {
        
    })
}

const getSorteo = (idSorteo) => {
    fetch('/api/sorteo/' + idSorteo, {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    });
}

const getBoletos = () => {
    fetch('/api/boletos', {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    }); 
}