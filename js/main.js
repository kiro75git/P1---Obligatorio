// MODIFICAR A ANTOJO - DEBUG//
let saldoInicialDeUsuarioNuevo = 3000; // > 0
// MODIFICAR A ANTOJO - DEBUG //

let tipoDeSesion = 'cerrada';
let usuarioActivo = "";

// FUNCION DE LA NAVBAR, CAMBIAR SECCION

function mostrarSeccion() {
    let idBoton = this.getAttribute("id");//"btnSeccionAgregar"
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);//"seccionAgregar"
    cambiarSeccion(idSeccion); // llama a cambiar seccion en base a que seccion se eligió en la barra superior
}

// INICIALIZAR BOTONES NAVBAR ( UNICAMENTE EL BOTON DE INICIAR SESION / REGISTRAR DEBERIA SER VISIBLE AL ABRIR LA PAGINA )

let elementosOcultables = document.querySelectorAll('.elementoOcultable'); // selecciona los elementos del header, que se ocultan en base al tipo de sesion
for (let i = 0; i < elementosOcultables.length; i++) {
    const eo = elementosOcultables[i];
    eo.addEventListener("click", mostrarSeccion); // se lama a mostrarseccion cuando se presionan esos elementos
}

// FUNCIONALIDAD BOTONES NAVBAR, OCULTA TODAS LAS SECCIONES Y LUEGO MUESTRA LA SECCION CORRESPONDIENTE AL BOTON

function cambiarSeccion(nuevaSeccion) {
    ocultarSecciones(); // se llama a ocultar todas las secciones
    document.querySelector("#" + nuevaSeccion).style.display = "block";
    if(nuevaSeccion === "sectSesion") { // esta escalera de if elses sirve para comprobar que nueva seccion quiere ser mostrada y mostrarla, ademas se llama a la funcion que actualiza la seccion de ser necesario
        CerrarSesion();
    }else if(nuevaSeccion === "sectCatalogo") {
        ActualizarCatalogo();
    }else if(nuevaSeccion === "sectAdministracionDeInventario") {
        ActualizarInventario();
    }else if(nuevaSeccion === "sectPedidos") {
        ActualizarPedidosYHistorial();
    } else if(nuevaSeccion === "sectGanancias"){
        VerGanancias();
    }
}
cambiarSeccion("sectSesion");

// FUNCION PARA OCULTAR TODAS LAS SECCIONES ( AUXILIAR )

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");  //se toma el valor de todas las clases seccion
    for (let i = 0; i < secciones.length; i++) {    //se itera sobre la variable secciones
        const unaSeccion = secciones[i];
        unaSeccion.style.display = "none";  //hace que no se muestre
    }
}

// FUNCIONALIDAD DE MUESTRA DE BOTONES DE NAVBAR EN BASE AL TIPO DE USUARIO ( ADMIN, CLIENTE O SESION CERRADA)

function mostrarElementosOcultos(tipoUsuario) {
    let elementosOcultables = document.querySelectorAll(".elementoOcultable");  //toma el valor de todas las clases elementoOcultable
    for (let i = 0; i < elementosOcultables.length; i++) {  
        const elementoOcultable = elementosOcultables[i];       //se itera sobre ellas
        elementoOcultable.style.display = "none";      //hace que no se muestren
    }
    let visibilidadVariables = document.querySelectorAll(".visibilidadVariable");
    for (let i = 0; i < visibilidadVariables.length; i++) {
        const visibilidadVariable = visibilidadVariables[i];
        visibilidadVariable.style.display = "none";
    }

    let elementosOcultablesMostrar = document.querySelectorAll("." + tipoUsuario)   //se toma el valor de todas las clases mas el tipo de usuario (user o admin)
    for (let i = 0; i < elementosOcultablesMostrar.length; i++) {
        const eoMostrar = elementosOcultablesMostrar[i];    //se itera sobre ellas
        eoMostrar.style.display = "block"; //hace que se muestren
    }
    let visibilidadVariablesMostrar = document.querySelectorAll("." + tipoUsuario)
    for (let i = 0; i < visibilidadVariablesMostrar.length; i++) {
        const vvMostrar = visibilidadVariablesMostrar[i];
        vvMostrar.style.display = "block";
    }
}
mostrarElementosOcultos(tipoDeSesion);