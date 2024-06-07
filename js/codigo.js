// DEBUG //
let saldoInicialDeUsuarioNuevo = 10000;
// DEBUG //

let tipoDeSesion = 'cerrada';
let usuarioActivo = "";
let saldoDelUsuarioActivo = 0;

function mostrarSeccion() {
    let idBoton = this.getAttribute("id");//"btnSeccionAgregar"
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);//"seccionAgregar"
    cambiarSeccion(idSeccion);
}

let elementosOcultables = document.querySelectorAll(".elementoOcultable");
for (let i = 0; i < elementosOcultables.length; i++) {
    const eo = elementosOcultables[i];
    eo.addEventListener("click", mostrarSeccion);
}

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
    }
}

cambiarSeccion("sectSesion");

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const unaSeccion = secciones[i];
        unaSeccion.style.display = "none";
    }
}

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



//usuarios precargados

class Usuario {
    constructor(correoIng, nombreIng, usernameIng, tarjetaIng, contrasenaIng,  tipoUsuarioIng, saldoIng) {
        this.nombre = nombreIng;
        this.correo = correoIng;
        this.username = usernameIng;
        this.tarjeta = tarjetaIng;
        this.contrasena = contrasenaIng;
        this.tipoUsuario = tipoUsuarioIng;
        this.saldo = saldoIng;
        
    }
}

class Stock {
    constructor(idProducto, nombreProducto, descripcionProducto, imagenProducto, precioProducto, ofertaProducto, activoProducto, stockProducto) {
        this.id = idProducto;
        this.nombre = nombreProducto;
        this.descripcion = descripcionProducto;
        this.imagen = imagenProducto;
        this.precio = precioProducto;
        this.oferta = ofertaProducto;
        this.activo = activoProducto;
        this.stock = stockProducto;
    }
}

class Compra{
    constructor(usuarioPedido, nombreProducto, precioProducto, unidadesProducto){
        this.Usuario = usuarioPedido;
        this.producto = nombreProducto;
        this.precio = precioProducto;
        this.unidades = unidadesProducto
    }
}


class Sistema {
    constructor() {
        this.usuarios = [
            new Usuario("lucas@gmail", "Lucas", "lucasbenta", "4456-6765-8409-1010", "Lucas0000", "admin", 50000),
            new Usuario("maria@gmail", "Maria", "mariaadu", "3267-8902-5986-1232", "Maria0000", "cliente", 300000)
        ];

        this.productos = [
            new Stock(1, "Campera Nike", "Campera marca Nike, deportiva negra", "https://f.fcdn.app/imgs/63379c/www.globalsports.com.uy/gls/88f1/original/catalogo/NKBV2648-010-1/1500-1500/campera-nike-sportswear-club-black.jpg", 3200, false, false, 30),
            new Stock(2, "Campera Adidas", "Campera marca Adidas superstar, deportiva negra", "https://f.fcdn.app/imgs/323a82/www.zooko.com.uy/zoo/37bb/original/catalogo/ADCW1256-1032-1/460x460/campera-adidas-superstar-tt-black.jpg", 2900, false, true, 40),
            new Stock(3, "Campera Under Armour", "Campera de nylon marca Under Armour negra", "https://f.fcdn.app/imgs/bd240e/menpi.uy/menpuy/3975/original/catalogo/1380868001-0-1/1500-1500/campera-under-armour-moda-hombre-strm-ins-run-hbd-jkt-black-s-c.jpg", 4000, false, true, 30)
        ]

        this.pedidos = []
    }

    agregarUsuario(mail, nombre, usuario, tarjetaCredito, pass, tipo, saldo) {
        let objUsuario = new Usuario(mail, nombre, usuario, tarjetaCredito, pass, tipo, saldo);
        this.usuarios.push(objUsuario);
    }
}

//registro de usuarios

let sistema = new Sistema()

function ActualizarCatalogo() {
    document.querySelector("#seccionCargaProductosJS").innerHTML = "";
    for(let i = 0; i < sistema.productos.length; i++) {
        let productoActual = sistema.productos[i];
        let stockDelProd = "";
        let visibDelProd = "visibilidadVariable admin";
        let mensajeInactivo = "visibilidadVariable";
        let idDelProd = productoActual.id;
        if(productoActual.stock > 0) {
            stockDelProd = String(productoActual.stock);
        }else{
            stockDelProd = "SIN STOCK!";
        }
        if(productoActual.activo) {
            visibDelProd = "visibilidadVariable admin cliente"
        }else {
            mensajeInactivo = "visibilidadVariable admin";
        }

        let options = "";
        for(let i = 1; i <= stockDelProd; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        
        // Generacion del producto en el catálogo

        document.querySelector("#seccionCargaProductosJS").innerHTML += `
            <article class="producto ${visibDelProd}">
                    <figure>
                        <h5 class="${mensajeInactivo}"> EL PRODUCTO ESTA INACTIVO, NO ES VISIBLE PARA LOS CLIENTES </h5>
                        <img src=${productoActual.imagen} alt=${productoActual.nombre}>
                        <figcaption>
                            <h4>${productoActual.nombre}</h4>
                            <p>${productoActual.descripcion}</p>
                            <h5>${productoActual.precio}</h5>
                            <div class="comprar">
                                <input type="button" id="btnCompra${idDelProd}" value="Comprar">
                                <select id="slcUnidades${idDelProd}">
                                    ${options}
                                </select>
                            </div>
                        </figcaption>
                    </figure>
                </article>
        `
    }
    mostrarElementosOcultos(tipoDeSesion);
}

function Registrar() {
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);
    let tarjetaInput = String(document.querySelector("#ingresoTarjeta").value);
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    
    if(verificarNombreYapellido(nombreInput)) {
        if(VerificarPass(passInput) === "OK") {
            sistema.agregarUsuario(mailInput, nombreInput, usernameInput, tarjetaInput, passInput, "cliente", saldoInicialDeUsuarioNuevo);
            // new Usuario (nombreIng, edadIng, nacionalidadIng);
            // Sistema.push(usuarios);
            // console.log();
            
            document.querySelector("#pError").innerHTML = `Se registró correctamente! Ahora inice sesión.`
            document.querySelector("#formRegistro").style.display = "none";
            console.log(sistema.usuarios);
        }else{
            // Error con los datos ingresados
            document.querySelector("#pError").innerHTML = `${VerificarPass(passInput)}`;
        }
    }else{
        document.querySelector("#pError").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        
        document.querySelector("#formRegistro").style.display = "block";
    }
}

document.querySelector("#btnRegistro").addEventListener("click", Registrar);

//funcion para verificar contraseña
function VerificarPass(pass) {
    let error = "ninguno";
    let password = pass;
    let hasNum = false;
    if(password.length >= 5) {
            for(let i = 0; i < password.length; i++) {
                    switch (password.charAt(i)) {
                            case "0":
                            case "1":
                            case "2":
                            case "3":
                            case "4":
                            case "5":
                            case "6":
                            case "7":
                            case "8":
                            case "9":
                                    if(i === 0) {
                                            error = "numeroinicio";
                                    }
                                    hasNum = true;
                                    break;
                            default:
                                    break;
                    }
            }
            if(!hasNum) {
                    error = "sinnumero";
            }
            let minCount = 0;
            let mayCount = 0;
            for(let i = 0; i < password.length; i++) {
                    if(password.charAt(i) === " ") {
                            error = "espacio"
                    }else if(password.charAt(i) === password.charAt(i).toUpperCase()) {
                            mayCount++;
                    }else if(password.charAt(i) === password.charAt(i).toLowerCase()) {
                            minCount++;
                    }
            }
            if(!(minCount > 0 && mayCount > 0)) {
                    error = "mayusminus";
            }
            
    }else {error = "longitud";}

    let mensaje = "OK";

    if(error === "longitud") {
            mensaje = "Su contraseña debe tener al menos 5 caracteres";
    }else if(error === "mayusminus") {
            mensaje = "Su contraseña debe tener una mayúscula y una minúscula";
    }else if(error === "numeroinicio") {
            mensaje = "Su contraseña no puede comenzar por un número";
    }else if(error === "sinnumero") {
            mensaje = "Su contraseña debe tener al menos un número";
    }else if(error === "espacio") {
            mensaje = "Su contraseña no puede tener espacios en blanco";
    }

    return mensaje;
}

function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);

    let encontrado = false;

    for(let i=0; i < sistema.usuarios.length; i++) {
        if(usernameInput === sistema.usuarios[i].username) {
            console.log("Usuario encontrado");
            encontrado = true;
            if(passInput === sistema.usuarios[i].contrasena) {
      
                // bien
                ExitoAlIniciarSesion(sistema.usuarios[i].tipoUsuario, sistema.usuarios[i].nombre, sistema.usuarios[i].saldo)
                break;
            }else{
                // mal
                document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
            }
        }  
    } 
}

document.querySelector("#btnInicioSesion").addEventListener("click", Ingresar);

//verificar ingreso nombre y apellido
function verificarNombreYapellido(nombreUsuario){
    let verificarEspacio = false;
    let hayEspacios = 0;
    for(let i = 0; i < nombreUsuario.length; i++){
        let valorCaracter = nombreUsuario.charAt(i);
        
        if(valorCaracter === " "){
            hayEspacios++;
        }
    }
    
    if(hayEspacios > 0){
        verificarEspacio = true;
    } else {
        document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
    }
    
    return verificarEspacio;
}

//verificar ingreso de tarjeta
function validarTarjeta(nroTarjeta) {
    //funcion para verificar tarjeta:

    let contadorGuiones = 0;
        
    for(let r = 0; r < nroTarjeta.length; r++){
        let caracterPos =  nroTarjeta.charAt(r);
            
        if(caracterPos === "-"){
            contadorGuiones++;
        }
    }

    if (contadorGuiones === 3){
            let acumulador = 0;
            let digitoVerificar = nroTarjeta.charAt(nroTarjeta.length - 1);
            let dev = false;
            let cont = 0;
            for (let i = nroTarjeta.length - 2; i >= 0; i--) {
                let valorAcumular = Number(nroTarjeta.charAt(i));
                if (cont % 2 === 0) {
                    let duplicado = Number(nroTarjeta.charAt(i)) * 2;
                    if (duplicado >= 10) {
                        let duplicadoStr = String(duplicado);
                        let suma = Number(duplicadoStr.charAt(0)) + Number(duplicadoStr.charAt(1));
                        valorAcumular = suma;
                    } else {
                        valorAcumular = duplicado;
                    }
                }
                acumulador += valorAcumular;
                cont++;
            }
            let multiplicado = acumulador * 9;
            let multiplicadoStr = String(multiplicado);
            let digitoVerificador = multiplicadoStr.charAt(multiplicadoStr.length - 1);
            if (digitoVerificar === digitoVerificador) {
                dev = true;
            }
            return dev;

    }else {
        document.querySelector("#pError").innerHTML = "ocurrió un error al ingresar los datos"
    }
}

// INICIO DE SESION EXITOSO

function ExitoAlIniciarSesion(sesionDelUsuario, nombreDelUsuario, saldoDelUsuario) {
    tipoDeSesion = sesionDelUsuario;

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Cerrar sesión`;

    usuarioActivo = nombreDelUsuario;

    saldoDelUsuarioActivo = saldoDelUsuario;

    cambiarSeccion("sectCatalogo");

    document.querySelector("#displayUsuario").innerHTML = `Sesión iniciada como ${nombreDelUsuario}`

    document.querySelector("#displaySaldo").innerHTML = `Saldo: ${saldoDelUsuario}`

    document.querySelector("#infoUsuario").style.display = "block";
}

function CerrarSesion() {
    tipoDeSesion = "cerrada";

    console.log("Se cerró la sesion");

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Iniciar sesión`;

    usuarioActivo = "";

    saldoDelUsuarioActivo = 0;

    document.querySelector("#infoUsuario").style.display = "none";
}


function CrearCompra(){
    let campoUnidades = document.querySelector("campoUno").value;
    
    AgregarCompra(idProducto, campoUnidades);
}


// tomar pedidos y agregarlos al historial

function AgregarCompra(idProducto, unidadesProducto) {
    // Buscar el producto con el id dado en el array de productos
    let productoAux = null;
    for (let i = 0; i < this.productos.length; i++) {
        if (this.productos[i].id === idProducto) {
            productoAux = this.productos[i];
        }
    }

    if (productoEncontrado) {
        // El producto fue encontrado, crea una nueva instancia de Compras
        let compra = new Compra(usuarioActivo, productoAux.nombre, productoAux.precio, unidadesProducto);
        // Almacena la compra en la lista de pedidos que esta en sistema
        this.pedidos.push(compra);

        console.log("Compra agregada al sistema:", compra);
    } else {
        console.log("No se encontró un producto con el id especificado.");
    }
}

document.querySelector("#btnCompra").addEventListener("click", CrearCompra);




// function AgregarCompraYagregarHistorial(){
//     //bucle para encontrar id de producto deseado
//     for(let y = 0; y < Stock.length; y++){
//         let idProductoDeseado = this.id[i];

//     //bucle para realizar pedido

//     if(idProductoDeseado === 1){
//         for (let i = 0; i < productos.length; i++){
//             let producto = this.productos[i];
//             if(producto.id === 1){
//                 let nuevaCompra = new Compras(producto.nombre, producto.precio, unidades);
//             pedidos.push(nuevaCompra);
//             console.log(`Compra agregada: ${unidades} unidades de ${producto.nombre} a $${producto.precio} cada una.`);
//                 return; 
//             }
//             }
//     } else if(idProductoDeseado === 2){
//         for (let i = 0; i < productos.length; i++){
//             let producto = this.productos[i];
//             if(producto.id === 2){
//                 let nuevaCompra = new Compras(producto.nombre, producto.precio, unidades);
//             pedidos.push(nuevaCompra);
//             console.log(`Compra agregada: ${unidades} unidades de ${producto.nombre} a $${producto.precio} cada una.`);
//                 return; 
//             }
//             }
//     } else {
//         for (let i = 0; i < productos.length; i++){
//             let producto = this.productos[i];
//             if(producto.id === 3){
//                 let nuevaCompra = new Compras(producto.nombre, producto.precio, unidades);
//             pedidos.push(nuevaCompra);
//             console.log(`Compra agregada: ${unidades} unidades de ${producto.nombre} a $${producto.precio} cada una.`);
//                 return; 
//             }
//         }
//     }
    
// }
// }

// SECCION DE ADMIN DE INVENTARIO
        
function ActualizarInventario() {
    let options = ``;
    for(let i = 0; i < sistema.productos.length; i++) {
        options += `<option value="${i}">${sistema.productos[i].nombre}</option>`;
    }
    document.querySelector("#slcProductoAdministrar").innerHTML = `${options}`;
    mostrarElementosOcultos(tipoDeSesion);
}

document.querySelector("#slcProductoAdministrar").addEventListener("click", MostrarInformacionProdcutoInventario);

function MostrarInformacionProdcutoInventario() {
    let IDSeleccionado = Number(document.querySelector("#slcProductoAdministrar").value) + 1;
    let ProductoSeleccionado = undefined;
    for(let i = 0; i < sistema.productos.length; i++) {
        if(IDSeleccionado === sistema.productos[i].id) {
            ProductoSeleccionado = sistema.productos[i];
            break;
        }
    }
    if(ProductoSeleccionado === undefined) {
        document.querySelector("#mostrarInfoProducto").innerHTML = `Error al conseguir la información del producto`;
    }else {
        document.querySelector("#mostrarInfoProducto").innerHTML = `Nombre: ${ProductoSeleccionado.nombre}<br>
                                                                    Descripción: ${ProductoSeleccionado.descripcion}<br>
                                                                    Precio: ${ProductoSeleccionado.precio}<br>
                                                                    Descuento: ${ProductoSeleccionado.oferta}<br>
                                                                    Activo: ${ProductoSeleccionado.activo}<br>
                                                                    Stock:  ${ProductoSeleccionado.stock}<br>
                                                                    Imagen (link): ${ProductoSeleccionado.imagen}<br>
                                                                    ID:${ProductoSeleccionado.id}`
    }
}

document.querySelector("#slcParametroACambiar").addEventListener("click", DesplegarMenuParaModificarInventario);

function DesplegarMenuParaModificarInventario() {
    let parametroACambiar = String(document.querySelector("#slcParametroACambiar").value);
    if(parametroACambiar === "activo" || parametroACambiar === "descuento") {
        document.querySelector("#parametroACambiarSection").innerHTML = `<label for="parametroACambiar" class="invLabel"> Seleccione el nuevo valor </label><input type="checkbox" id="parametroACambiar">`;
    }else if(parametroACambiar === "precio" || parametroACambiar === "stock") {
        document.querySelector("#parametroACambiarSection").innerHTML = `<label for="parametroACambiar" class="invLabel"> Ingrese el nuevo valor </label><input type="number" id="parametroACambiar">`;
    }else if(parametroACambiar === "nombre" || parametroACambiar === "descripcion" || parametroACambiar === "imagen") {
        document.querySelector("#parametroACambiarSection").innerHTML = `<label for="parametroACambiar" class="invLabel"> Ingrese ${parametroACambiar} deseado/a </label><input type="text" id="parametroACambiar">`;
    }
    document.querySelector("#parametroACambiarSection").innerHTML += `<input type="button" value="Realizar cambio" id="btnRealizarCambiosEnInventario">`
    document.querySelector("#btnRealizarCambiosEnInventario").addEventListener("click", RealizarCambioEnInventario);
}


function RealizarCambioEnInventario() {
    let IDProductoElegido = Number(document.querySelector("#slcProductoAdministrar").value) + 1;
    let parametroACambiarProductoElegido = String(document.querySelector("#slcParametroACambiar").value);
    let ProductoSeleccionado = undefined;

    let mensajeAMostrar = "";
    for(let i = 0; i < sistema.productos.length; i++) {
        if(IDProductoElegido === sistema.productos[i].id) {
            ProductoSeleccionado = sistema.productos[i];
            break;
        }
    }
    let ParametroDentroDelProducto = undefined;
    if(ProductoSeleccionado !== undefined) {
        let nuevoValor = document.querySelector("#parametroACambiar").value;
        if(parametroACambiarProductoElegido !== undefined) {
            if(nuevoValor === "on") {
                nuevoValor = document.querySelector("#parametroACambiar").checked;
            }
        }
        switch (parametroACambiarProductoElegido) {
            case "nombre":
                ParametroDentroDelProducto = ProductoSeleccionado.nombre;
                ProductoSeleccionado.nombre = nuevoValor;
                break;
            case "descripcion":
                ParametroDentroDelProducto = ProductoSeleccionado.descripcion;
                ProductoSeleccionado.descripcion = nuevoValor;
                break;
            case "precio":
                ParametroDentroDelProducto = ProductoSeleccionado.precio;
                ProductoSeleccionado.precio = nuevoValor;
                break;
            case "descuento":
                ParametroDentroDelProducto = ProductoSeleccionado.oferta;
                ProductoSeleccionado.descuento = nuevoValor;
                break;
            case "activo":
                ParametroDentroDelProducto = ProductoSeleccionado.activo;
                ProductoSeleccionado.activo = nuevoValor;
                break;
            case "stock":
                ParametroDentroDelProducto = ProductoSeleccionado.stock;
                ProductoSeleccionado.stock = nuevoValor;
                break;
            case "imagen":
                ParametroDentroDelProducto = ProductoSeleccionado.imagen;
                ProductoSeleccionado.imagen = nuevoValor;
                break;
            default:
                mensajeAMostrar = "Ocurrió un error determinando que atributo desea cambiar.";
                break;
        }
        mensajeAMostrar = `Se ha realizado el cambio de ${parametroACambiarProductoElegido} dentro de ${ProductoSeleccionado.nombre}: ${ParametroDentroDelProducto} ha pasado a ser ${nuevoValor}`;
        
    }else {
        mensajeAMostrar = "Ocurrió un error determinando que producto desea cambiar.";
    }
    document.querySelector("#mensajeDeExitoErrorInventario").innerHTML = mensajeAMostrar;
    MostrarInformacionProdcutoInventario();
}