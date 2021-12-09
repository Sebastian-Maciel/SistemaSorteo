class BoletosSorteo extends HTMLElement {
  constructor() {
    super();
  }
  // Sirve para mostrar los elementos de presentación

  connectedCallback() {
    let sorteoId = this.getAttribute("sorteoId");
    this.attachShadow({ mode: "open" });
    this.#render();
    this.#cargarBoletos(sorteoId);
    this.#seleccionarBoletos();
    this.#agregarEstilo();
    this.#modal();
  }

  // Demas funciones para llenar los elementos de presentación
  #agregarEstilo() {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./BoletosSorteoComponente/css/styles.css");
    this.shadowRoot.appendChild(link);
  }

  #cargarBoletos(id) {
    fetch(`/api/sorteo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        const sorteo = json.data;
        const numerosSorteo = sorteo.numMax;
        const boletosSorteo = sorteo.boletos;
        console.log(sorteo);
        const gridContainer = this.shadowRoot.querySelector(".grid-container");

        for (let i = 0; i < numerosSorteo; i++) {
          let div = document.createElement("div");
          div.innerHTML = `${i + 1}`;
          div.className = `grid-item item${i + 1}`;
          div.setAttribute("id", `numero${i + 1}`);
          gridContainer.appendChild(div);
        }
        boletosSorteo.forEach((boleto) => {
          fetch(`/api/boleto/${boleto}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              return response.json();
            })
            .then((json) => {
              const divObj = this.shadowRoot.querySelector(
                `#numero${json.data.numero}`
              );
              divObj.className = `grid-item no_available`;
            });
        });
        console.log(boletosSorteo);
      });
  }

  #seleccionarBoletos() {
    var listaNumeros = [];
    const sorteo = this.#getSorteo(this.sorteoId);
    console.log("Hola sorteooo");
    console.log(sorteo);

    const gridContainer = this.shadowRoot.querySelector(".grid-container");
    const msg = this.shadowRoot.querySelector(".msg");
    const precio = 45;
    gridContainer.addEventListener("click", (e) => {
      if (!e.target.classList.contains(`item${e.srcElement.innerHTML}`)) {
        return;
      }
      console.log(e.srcElement.innerHTML);
      const i = e.srcElement.innerHTML;
      e.target.classList.toggle("active");

      if (e.target.classList.contains("active")) {
        let cont = document.createElement("div");
        let span = document.createElement("span");
        let span2 = document.createElement("span");
        span.innerHTML = `Número # ${i}`;
        span2.innerHTML = `$${precio}.00`;
        let div1 = document.createElement("div");

        div1.className = "count1";
        div1.id = `count-${i}`;
        div1.appendChild(span);
        div1.appendChild(span2);
        this.shadowRoot.getElementById("count").appendChild(div1);
        listaNumeros.push(i);
      } else {
        const index = listaNumeros.indexOf(i);
        if (index > -1) {
          listaNumeros.splice(index, 1);
        }
        const id = this.shadowRoot.getElementById(`count-${i}`);
        this.shadowRoot.getElementById("count").removeChild(id);
      }
      console.log(listaNumeros);
      msg.textContent =
        "$" +
        this.shadowRoot.getElementById("count").childElementCount * precio +
        ".00";
    });

    const botonApartar = this.shadowRoot.querySelector("#btnApartar");
    botonApartar.addEventListener("click", (e) => {
      if (listaNumeros.length != 0) {
        this.#apartarBoleto(listaNumeros);
      } else {
        alert("Seleccione mínimo un número.");
      }
    });
  }

  #apartarBoleto(nums) {
    let checkbox = this.shadowRoot.querySelector("input[name=checkbox]");
    let nombre = this.shadowRoot.querySelector("#nombre");
    let correo = this.shadowRoot.querySelector("#correo");
    let direccion = this.shadowRoot.querySelector("#direccion");
    let numero = this.shadowRoot.querySelector("#numero");
    let ciudad = this.shadowRoot.querySelector("#ciudad");
    let estado = this.shadowRoot.querySelector("#estado");
    let boletos = [];

    var regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
    var name = document.getElementById("nom").value;
    if (!regName.test(name)) {
      alert("Invalid name given.");
    } else {
      alert("Valid name given.");
    }

    if (checkbox.checked) {
      nums.forEach((num) => {
        fetch(`api/boleto/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            numero: num,
            estadoBoleto: "APARTADO",
            movimientoBoleto: {
              fecha: new Date(Date.now()),
              descripcion: "APARTADO",
            },
            usuario: "61a5b8819acfb4d377fe57cd",
            persona: {
              nombre: nombre.value,
              correo: correo.value,
              direccion: direccion.value,
              numTelefono: numero.value,
              ciudad: ciudad.value,
              estado: estado.value,
            },
          }),
        })
          .then((response) => response.json())
          .then((json) => {
            boletos.push(json.bol.id);
          })
          .catch(function (error) {
            console.warn("Something went wrong.", error);
          });
      });
    } else {
      nums.forEach((num) => {
        fetch(`api/boleto/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            numero: num,
            estadoBoleto: "APARTADO",
            movimientoBoleto: {
              fecha: new Date(Date.now()),
              descripcion: "APARTADO",
            },
            usuario: "61a5b8819acfb4d377fe57cd",
          }),
        })
          .then((response) => response.json())
          .then((json) => {})
          .catch(function (error) {
            console.warn("Something went wrong.", error);
          });
      });
    }

    const sorteo = this.#getSorteo("6195d546e8db7ac7226fccbb");
    console.log(sorteo);
    this.#actualizarSorteo(sorteo.data._id, boletos);
  }

  #actualizarSorteo(sorteoId, boletos) {
    console.log("hola: ", boletos);
    fetch(`api/sorteo/${sorteoId}`, {
      method: "PUT",
      headers: {
        headers: {
          "Content-Type": "application/json",
        },
      },
      body: JSON.stringify({
        boletos: boletos,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        console.log("Hola");
        console.log(json);
      })
      .catch(function (error) {
        console.warn("Something went wrong.", error);
      });
  }

  #getSorteo(sorteoId) {
    fetch(`/api/sorteo/${sorteoId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {});
  }

  #modal() {
    var checkbox = this.shadowRoot.querySelector("input[name=checkbox]");
    var modal = this.shadowRoot.querySelector(".bg-modal");
    var closebutton = this.shadowRoot.querySelector(".close");

    checkbox.addEventListener("click", function () {
      if (this.checked) {
        console.log("Seleccionado");
        modal.style.display = "flex";
        this.checked = true;
      }

      closebutton.addEventListener("click", function () {
        modal.style.display = "none";
      });
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
    <div class="bg-modal">
    <div class="modal-content">
        <div class="close">x</div>
            <input type="text" id="nombre" placeholder="Nombre completo">
            <input type="text" id="correo" placeholder="Correo">
            <input type="text" id="direccion" placeholder="Dirección">
            <input type="text" id="numero" placeholder="Número telefónico">
            <input type="text" id="ciudad" placeholder="Ciudad">
            <input type="text" id="estado" placeholder="Estado">
    </div>
</div>
        <div>
            <h3 style="text-align: center;">NÚMEROS SELECCIONADOS</h2>
        </div>

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
            <input type="checkbox" name="checkbox" id="cbpersona">
            <label for="cdpersona">Deseo apartarlo para otra persona.</label><br>
        </div>
        <div class="buttons">
            <button class="btn btn1" id="btnApartar">Apartar</button>
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
    `;
  }
}

window.customElements.define("boletos-sorteo", BoletosSorteo);
