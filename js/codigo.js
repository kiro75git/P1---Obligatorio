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

//registro de usuarios

let sistema = new Sistema()

function ActualizarCatalogo() {
    document.querySelector("#seccionCargaProductosJS").innerHTML = "";
    let contadorInactivos = 0;
    let mensajeInactivos = "";
    for(let i = 0; i < sistema.productos.length; i++) {
        let productoActual = sistema.productos[i];
        let stockDelProd = "";
        let idDelProd = productoActual.id;
        if(productoActual.stock > 0) {
            stockDelProd = String(productoActual.stock);
        }else{
            stockDelProd = "SIN STOCK!";
        }

        let options = "";
        for(let i = 1; i <= stockDelProd; i++) {
            options += `<option value="${i}">${i}</option>`;
        }

         
        let seleccionProd = `<input type="radio" id="prod${idDelProd}" name="slcProducto" value="${idDelProd}">`;
        
        
        // Generacion del producto en el catálogo
        if(productoActual.activo) {
            document.querySelector("#seccionCargaProductosJS").innerHTML += `
            <article class="producto">
                    <figure>
                        <img src=${productoActual.imagen} alt=${productoActual.nombre}>
                        <figcaption>
                            <div class="comprar">
                                <label for="radios">Elegir</label>
                                <div id="radios">
                                    ${seleccionProd}
                                </div>
                                <select id="slcUnidades${idDelProd}" class="selectUnidades">
                                    ${options}
                                </select>
                            </div>
                            <h4>${productoActual.nombre} - ${productoActual.precio}</h4>
                            <p>${productoActual.descripcion}</p>
                            
                        </figcaption>
                    </figure>
                </article>
            `
        }else {
            contadorInactivos += 1;
            mensajeInactivos += `${productoActual.nombre}, `;
        }

    }
    if(tipoDeSesion === "admin" && contadorInactivos > 0) {
        alert(`Hay ${contadorInactivos} productos inactivos: ${mensajeInactivos}`);
    }
    mostrarElementosOcultos(tipoDeSesion);
}

function Registrar() {
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);
    let tarjetaInput = String(document.querySelector("#ingresoTarjeta").value);
    let codigoCVC = document.querySelector("#ingresoCVC").value;
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    VerificarCVC(codigoCVC);

    if(verificarNombreYapellido(nombreInput)) {
        if(VerificarPass(passInput) === "OK") {
            sistema.agregarUsuario(mailInput, nombreInput, usernameInput, tarjetaInput, codigoCVC, passInput, "cliente", saldoInicialDeUsuarioNuevo);
            
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

//verificar codigo de seguridad (CVC)

function VerificarCVC(codigoCVC){

    codigoValido = false;

    if(codigoCVC.length === 3){
        for (let i = 0; i < codigoCVC.length; i++){
            let valorCaracter = codigoCVC.charAt(i);

            if(valorCaracter >= "0" && valorCaracter <= "9"){

                codigoValido = true;


            } else {
                //error
            }
        }
    } 
    return codigoValido;
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

//boton para realizar pedido

document.querySelector("#btnComprar").addEventListener("click", CrearCompra);

function CrearCompra(){
    //toma de datos 
    let campoUnidades = document.querySelector(".selectUnidades").value; //cantidad Unidades
    let selectProd = document.querySelectorAll(`input[name="slcProducto"]`); //Producto Elegido con input radio
    let productoDeseado;
    for(let i = 0; i < selectProd.length; i++) {
        
        if(selectProd[i].checked){
            productoDeseado = selectProd[i];
        }
    }
    
    
    AgregarCompra(productoDeseado, campoUnidades);
}


// tomar pedidos y agregarlos al historial

function AgregarCompra(idProducto, unidadesProducto) {
    // Buscar el producto con el id dado en el array de productos
    let productoAux = null;  //variable nula
    for (let i = 0; i < this.productos.length; i++) {  //recorrer los productos
        if (this.productos[i].id === idProducto) {
            productoAux = this.productos[i];     //la variable toma el valor de los productos
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

//creacion productos

document.querySelector("#btnCrearNuevoProducto").addEventListener("click", ActividadBotonProducto);

function ActividadBotonProducto() {
    if(String(document.querySelector("#btnCrearNuevoProducto").value) === "Deseo crear un nuevo producto") {
        document.querySelector("#formCrearProducto").innerHTML = `<label for="inpNombreNuevoProducto">Nombre: </label><input type="text" id="inpNombreNuevoProducto">
                    <label for="inpDescNuevoProducto">Descripcion: </label><input type="text" id="inpDescNuevoProducto">                               
                    <label for="inpNombreNuevoProducto">Precio: </label><input type="number" id="inpPrecioNuevoProducto">
                    <label for="inpDescuentoNuevoProducto">Se encuentra de descuento: </label><input type="checkbox" id="inpDescuentoNuevoProducto">
                    <label for="inpActivoNuevoProducto">Se encuentra activo: </label><input type="checkbox" id="inpActivoNuevoProducto">
                    <label for="inpStockNuevoProducto">Stock inicial: </label><input type="number" id="inpStockNuevoProducto">
                    <label for="inpImagenNuevoProducto">Imagen (URL): </label><input type="text" id="inpImagenNuevoProducto">`;
        document.querySelector("#btnCrearNuevoProducto").value = "Crear Producto";
    }else if(String(document.querySelector("#btnCrearNuevoProducto").value) === "Crear Producto") {
        let nombreNuevo = document.querySelector("#inpNombreNuevoProducto").value;
        let descNueva = document.querySelector("#inpDescNuevoProducto").value;
        let precioNuevo = document.querySelector("#inpPrecioNuevoProducto").value;
        let descuentoNuevo = document.querySelector("#inpDescuentoNuevoProducto").checked;
        let activoNuevo = document.querySelector("#inpActivoNuevoProducto").checked;
        let stockNuevo = document.querySelector("#inpStockNuevoProducto").value;
        let imagenNueva = document.querySelector("#inpImagenNuevoProducto").value;

        if(nombreNuevo !== "" && descNueva !== "" && precioNuevo !== 0 && imagenNueva !== "" && stockNuevo >= 0) {
            let idNuevo = Number(sistema.productos.length) + 1;
            let productoNuevo = new Stock(idNuevo, nombreNuevo, descNueva, imagenNueva, precioNuevo, descuentoNuevo, activoNuevo, stockNuevo);
            sistema.productos.push(productoNuevo);
            document.querySelector("#pControlCrearProducto").innerHTML = `El producto se creó exitosamente, se le ha proporcionado el id: ${idNuevo}`;

        }else {
            document.querySelector("#pControlCrearProducto").innerHTML = "Ocurrió un error procesando los datos ingresados";
        }
        document.querySelector("#btnCrearNuevoProducto").value = "Deseo crear un nuevo producto";
        // limpiar 
        document.querySelector("#formCrearProducto").innerHTML = "";
    }
}

//seccion Historial y pedidos

document.querySelector("#sectPedidos").innerHTML += `

            <tr>
               <td>Usuario</td>
                <td>Producto</td>
                <td>Unidades</td>
                <td>Precio</td>
                <td><input type="button" id="btnAprobar" value="Aprobar Pedido"></td>
                </tr>
`;


