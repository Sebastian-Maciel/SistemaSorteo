class ApartarBoletos extends HTMLElement {
    constructor() {
        super();
    }
    // Sirve para mostrar los elementos de presentación 

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.#render();
        this.ingresarInfo();
        this.#agregarEstilo();
    }
    #render() {
        this.shadowRoot.innerHTML = `
        <div class="monto">
            <div id="titulo"><h3 style="text-align: center;">NÚMEROS SELECCIONADOS</h2></div>
            <div class="count" id="info">
                <div class="countdiv" id="count">

                </div>
                <hr>
                <div class="count1">
                    <span>TOTAL</span>
                    <div class="msg">$0.00</div>
                </div>
            </div>
            
            <div class="buttons" id="buttons">
                <button class="btn btn1" id="apartar">Apartar</button>
                <button class="btn btn2">Pagar</button>
            </div>
            <template>
                <div class="count1">
                    <span>Número #1</span>
                    <span></span>
                </div>
            </template>
        </div>
        `
        let ele = this.shadowRoot.getElementById("apartar");
        ele.addEventListener("click", (e) => {
            if (e.target.classList.contains('active')) {
                let boletos = e.target.classList.getElementById("active");
                this.ingresarInfo(boletos)
                
            }
        });
    }
    ingresarInfo(boletos) {
        let ele = this.shadowRoot.getElementById("titulo");
        ele.innerHTML = "INFORMACIÓN"
        ele = this.shadowRoot.getElementById("info");
        ele.innerHTML = `
        <form class = "count">
            <label>Nombre</label><br>
            <input type="text" id="nombre"><br><br>
            <label>Correo</label><br>
            <input type="email" id="correo"><br><br>
            <label>Dirección</label><br>
            <input type="text" id="direccion"><br><br>
            <label>Número de telefono</label><br>
            <input type="text" id="numTelefono"><br><br>
            <label>Ciudad</label><br>
            <input type="text" id="ciudad"><br><br>
            <label>Entidad</label><br>
            <input type="text" id="entidad"><br><br>
            <input type="checkbox">Acepto recibir recordatorios  periódicos al correo ligado a mi cuenta sobre el apartado de números. *<br><br>
            <input type = "submit" value="Confirmar" id="confirmar">
        </form>
        
        `
        
        
        ele = this.shadowRoot.getElementById("buttons");
        ele.innerHTML = "";
        ele = this.shadowRoot.getElementById("confirmar");
        let persona = {
            nombre: this.shadowRoot.getElementById("nombre").textContent,
            correo: this.shadowRoot.getElementById("correo").textContent,
            direccion: this.shadowRoot.getElementById("direccion").textContent,
            numTelefono: this.shadowRoot.getElementById("numTelefono").textContent,
            ciudad: this.shadowRoot.getElementById("ciudad").textContent,
            estado: this.shadowRoot.getElementById("entidad").textContent
        }
        ele.addEventListener("click", this.apartarBoletos(persona, boletos));



    }
    apartarBoletos(persona, boletos) {
        fetch('/api/boleto/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((json) => {
                var boletos2 = json.data;
                

                for (let i = 0; i < boletos2.length; i++) {
                    let boleto = boletos2[boletos[i]];
                    boleto.estadoBoleto = "APARTADO";
                    boleto.persona = {
                        nombre: persona.nombre,
                        correo: persona.correo,
                        direccion: persona.direccion,
                        numTelefono: persona.numTelefono,
                        ciudad: persona.ciudad,
                        estado: persona.estado
                    }
                }
            });
        

    }
    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./BoletosSorteoComponente/css/estiloBoletoSorteoComponente.css");
        this.shadowRoot.appendChild(link);
    }
}
window.customElements.define("apartar-boletos", ApartarBoletos);