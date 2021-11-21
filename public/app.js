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



const apartarBoleto = (idBoleto, persona) => {
    let boleto= getBoleto(idBoleto);
    boleto.estadoBoleto= "APARTADO";
    boleto.persona={
        nombre: persona.nombre,
        correo: persona.correo,
        direccion: persona.direccion,
        numTelefono: persona.numTelefono,
        ciudad: persona.ciudad,
        estado: persona.estado
    }
    fetch('/api/boleto/' + idBoleto, {
        method: 'POST',
        body: boleto
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    });
}

const getBoleto = (idBoleto) => {
    fetch('/api/boleto'+ idBoleto, {
        method: 'GET'
    })
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        return data;
    }); 
}