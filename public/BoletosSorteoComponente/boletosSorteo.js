class BoletosSorteo extends HTMLElement {
    constructor() {
        super();
    }
    // Sirve para mostrar los elementos de presentación 

    connectedCallback() {
        this.attachShadow({ mode: "open" });
        this.#render();
        this.#cargarBoletos();
        this.#seleccionarBoletos();
        this.#agregarEstilo();


        
    }

    // Demas funciones para llenar los elementos de presentación
    #agregarEstilo() {
        let link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./BoletosSorteoComponente/css/estiloBoletoSorteoComponente.css");
        this.shadowRoot.appendChild(link);
    }

    #cargarBoletos() {
        //Cargar <div class="grid-container"></div>
        fetch('/api/boletos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => { return response.json() })
            .then((json) => {
                console.log(json);
                var numeros = json.data;
                const gridContainer = this.shadowRoot.querySelector('.grid-container');

                for (let i = 0; i < numeros.length; i++) {
                    if (numeros[i].estadoBoleto === "PAGADO" || numeros[i].estadoBoleto === "APARTADO") {
                        let div = document.createElement('div');
                        div.className = `grid-item no_available`;
                        gridContainer.appendChild(div);

                    }

                    else {
                        let div = document.createElement('div');
                        div.innerHTML = `${i + 1}`;
                        div.className = `grid-item item${i + 1}`;
                        gridContainer.appendChild(div);

                    }
                }

            });

    }

    #seleccionarBoletos() {
        const gridContainer = this.shadowRoot.querySelector('.grid-container');
        const msg = this.shadowRoot.querySelector('.msg')
        gridContainer.addEventListener('click',(e)=>{
            if(!e.target.classList.contains(`item${e.srcElement.innerHTML}`)){
                return
            }
            console.log(e.srcElement.innerHTML);
            const i = e.srcElement.innerHTML;
            e.target.classList.toggle('active');
            
            if(e.target.classList.contains('active')){
                let cont = document.createElement('div');
                let span = document.createElement('span');
                let span2 = document.createElement('span');
                span.innerHTML = `Número # ${i}`;
                span2.innerHTML = "$30.00";
                let div1 = document.createElement('div');
                
                div1.className = 'count1';
                div1.id=`count-${i}`;
                div1.appendChild(span);
                div1.appendChild(span2);
                this.shadowRoot.getElementById('count').appendChild(div1);
            }
            else {
                const id = this.shadowRoot.getElementById(`count-${i}`);
                this.shadowRoot.getElementById('count').removeChild(id);
            }
            
            msg.textContent="$"+this.shadowRoot.getElementById('count').childElementCount*price+".00"
        
        });

       
    }


    #render() {
        this.shadowRoot.innerHTML = `

        <div class="contenido">
        <div class="tickets">
        <h1 style="margin:0; text-align: center;">SORTEO SENTRA 2022</h2>
        <div class="grid-container">
            
        </div>
        <div class="bottom">
            <div class="bottom1">
                <div class="square no__available"></div>
                No disponible
            </div>
            <div class="bottom1">
                <div class="square available"></div>
                Disponible
            </div>
            <div class="bottom1">
                <div class="square select"></div>
                Seleccionados
            </div>
        </div>
    </div>

    <div class="monto">
            <div><h3 style="text-align: center;">NÚMEROS SELECCIONADOS</h2></div>
            <div class="count">
                <div class="countdiv" id="count">
                    
                </div>
                <hr>
                <div class="count1">
                    <span>TOTAL</span>
                    <div class="msg">$0.00</div>
                </div>
            </div>
            <div class="conditions">
                <input type="checkbox" >
                <div>Acepto recibir recordatorios  periódicos al correo ligado a mi cuenta sobre el apartado de números. *</div>
            </div>
            <div class="buttons">
                <button class="btn btn1">Apartar</button>
                <button class="btn btn2">Pagar</button>
            </div>
            <template>
                <div class="count1">
                    <span>Número #1</span>
                    <span></span>
                </div>
            </template>
        </div>
        </div>
    `

    }

    
    


}
window.customElements.define("boletos-sorteo", BoletosSorteo);