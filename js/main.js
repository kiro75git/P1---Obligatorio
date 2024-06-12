// MODIFICAR A ANTOJO - DEBUG//
let saldoInicialDeUsuarioNuevo = 3000; // > 0
// MODIFICAR A ANTOJO - DEBUG //

let tipoDeSesion = 'cerrada';
let usuarioActivo = "";

// FUNCION DE LA NAVBAR, CAMBIAR SECCION

function mostrarSeccion() {
    let idBoton = this.getAttribute("id");//"btnSeccionAgregar"
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);//"seccionAgregar"
    cambiarSeccion(idSeccion);
}

// INICIALIZAR BOTONES NAVBAR ( UNICAMENTE EL BOTON DE INICIAR SESION / REGISTRAR DEBERIA SER VISIBLE AL ABRIR LA PAGINA )

let elementosOcultables = document.querySelectorAll('.elementoOcultable');
for (let i = 0; i < elementosOcultables.length; i++) {
    const eo = elementosOcultables[i];
    eo.addEventListener("click", mostrarSeccion);
}

// FUNCIONALIDAD BOTONES NAVBAR, OCULTA TODAS LAS SECCIONES Y LUEGO MUESTRA LA SECCION CORRESPONDIENTE AL BOTON

function cambiarSeccion(nuevaSeccion) {
    ocultarSecciones();
    document.querySelector("#" + nuevaSeccion).style.display = "block";
    if(nuevaSeccion === "sectSesion") {
        CerrarSesion();
    }else if(nuevaSeccion === "sectCatalogo") {
        ActualizarCatalogo();
    }else if(nuevaSeccion === "sectAdministracionDeInventario") {
        console.log("inventario");
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
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const unaSeccion = secciones[i];
        unaSeccion.style.display = "none";
    }
}

// FUNCIONALIDAD DE MUESTRA DE BOTONES DE NAVBAR EN BASE AL TIPO DE USUARIO ( ADMIN, CLIENTE O SESION CERRADA)

function mostrarElementosOcultos(tipoUsuario) {
    let elementosOcultables = document.querySelectorAll(".elementoOcultable");
    for (let i = 0; i < elementosOcultables.length; i++) {
        const elementoOcultable = elementosOcultables[i];
        elementoOcultable.style.display = "none";
    }
    let visibilidadVariables = document.querySelectorAll(".visibilidadVariable");
    for (let i = 0; i < visibilidadVariables.length; i++) {
        const visibilidadVariable = visibilidadVariables[i];
        visibilidadVariable.style.display = "none";
    }

    let elementosOcultablesMostrar = document.querySelectorAll("." + tipoUsuario)
    for (let i = 0; i < elementosOcultablesMostrar.length; i++) {
        const eoMostrar = elementosOcultablesMostrar[i];
        eoMostrar.style.display = "block";
    }
    let visibilidadVariablesMostrar = document.querySelectorAll("." + tipoUsuario)
    for (let i = 0; i < visibilidadVariablesMostrar.length; i++) {
        const vvMostrar = visibilidadVariablesMostrar[i];
        vvMostrar.style.display = "block";
    }
}
mostrarElementosOcultos(tipoDeSesion);