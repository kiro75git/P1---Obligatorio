// DEBUG //
let saldoInicialDeUsuarioNuevo = 3000;
// DEBUG //

let tipoDeSesion = 'cerrada';
let usuarioActivo = "";

function mostrarSeccion() {
    let idBoton = this.getAttribute("id");//"btnSeccionAgregar"
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);//"seccionAgregar"
    cambiarSeccion(idSeccion);
}

let elementosOcultables = document.querySelectorAll('.elementoOcultable');
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
    }else if(nuevaSeccion === "sectPedidos") {
        ActualizarPedidosYHistorial();
    } else if(nuevaSeccion === "sectGanancias"){
        VerGanancias();
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
        let textoBoton = "Comprar";
        let textoClassDisabled = "";
        if(productoActual.stock > 0) {
            stockDelProd = String(productoActual.stock);
        }else{
            stockDelProd = 0;
            textoBoton = "SIN STOCK!";
            textoClassDisabled = `disabled="disabled"`;
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
                        <img src="${productoActual.imagen}" alt="${productoActual.nombre}">
                        <figcaption>
                            <div class="comprar">
                                <input type="button" value="${textoBoton}" ${textoClassDisabled} id="btnCompra${idDelProd}" class="button">
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


    // Proporciona funcionalidad a los botones de compra del catalogo mediante un evento atado al id del boton utilizado en la funcion auxiliar efectuarCompra
    for(let i = 0; i < sistema.productos.length; i++) {
        if(sistema.productos[i].activo) {
            var identifInput = document.querySelector(`#btnCompra${i+1}`);
            identifInput.addEventListener('click', efectuarCompra, false);
            identifInput.idBotonComprar = identifInput.id;
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
    let codigoCVCinput = Number(document.querySelector("#ingresoCVC").value);
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    
    if(verificarNombreYapellido(nombreInput)) {
        if(validarTarjeta(tarjetaInput, codigoCVCinput)) {
            if(VerificarNombreUsuario(usernameInput)){
                if(VerificarPass(passInput) === "OK") {
                    sistema.agregarUsuario(mailInput, nombreInput, usernameInput, tarjetaInput, codigoCVCinput, passInput, "cliente", saldoInicialDeUsuarioNuevo);
                    
                    document.querySelector("#pError").innerHTML = `Se registró correctamente! Ahora inice sesión.`
                    document.querySelector("#formRegistro").style.display = "none";
                    console.log(sistema.usuarios);
                }else{
                    // Error con los datos ingresados
                    document.querySelector("#pError").innerHTML = `${VerificarPass(passInput)}`;
                }
            }
        }else {
            console.log("Tarjeta no valida");
        }
    }else {
        document.querySelector("#pError").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        console.log("a");
        document.querySelector("#formRegistro").style.display = "block";
    }
    
}
document.querySelector("#btnRegistro").addEventListener("click", Registrar);

function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);

    for(let i=0; i < sistema.usuarios.length; i++) {
        if(usernameInput === sistema.usuarios[i].username) {
            console.log("Usuario encontrado");
            if(passInput === sistema.usuarios[i].contrasena) {
      
                // bien
                ExitoAlIniciarSesion(sistema.usuarios[i].tipoUsuario, sistema.usuarios[i].username, sistema.usuarios[i].saldo)
                break;
            }else{
                // mal
                document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo";
            }
        }else{
            document.querySelector("#pError").innerHTML = "Usuario no encontrado, intentelo denuevo";
        }
    } 
}
document.querySelector("#btnInicioSesion").addEventListener("click", Ingresar);

// INICIO DE SESION EXITOSO

function ExitoAlIniciarSesion(sesionDelUsuario, nombreDelUsuario) {
    tipoDeSesion = sesionDelUsuario;

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Cerrar sesión`;

    usuarioActivo = nombreDelUsuario;

    ActualizarSaldo()

    cambiarSeccion("sectCatalogo");

    document.querySelector("#displayUsuario").innerHTML = `Sesión iniciada como ${nombreDelUsuario}`

    document.querySelector("#infoUsuario").style.display = "block";
}

function ActualizarSaldo() {
    for(let i = 0; i < sistema.usuarios.length; i++) {
        if(sistema.usuarios[i].username === usuarioActivo) {
            document.querySelector("#displaySaldo").innerHTML = `Saldo: ${sistema.usuarios[i].saldo}`;
        }
    }
}

function CerrarSesion() {
    tipoDeSesion = "cerrada";

    console.log("Se cerró la sesion");

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Iniciar sesión`;

    usuarioActivo = "";

    document.querySelector("#infoUsuario").style.display = "none";
}

// LANZAR COMPRA

function efectuarCompra(evt) {
    let idProducto = Number(evt.currentTarget.idBotonComprar.substring(9)); // substring(9) toma el valor del string a partir de la posicion 9, osea toma el id del producto
    let cantidadCompra = Number(document.querySelector(`#slcUnidades${idProducto}`).value);
    console.log(`Intentaste comprar ${cantidadCompra} ${sistema.productos[idProducto-1].nombre}`);

    AgregarCompra(idProducto, cantidadCompra);
}

// LANZAR COMPRA

// tomar pedidos y agregarlos al historial

function AgregarCompra(idProductoDeseado, unidadesCompraDeseada) {
    // Buscar el producto con el id dado en el array de productos
    let costeTotal = sistema.productos[idProductoDeseado-1].precio * unidadesCompraDeseada;

    if(sistema.productos[idProductoDeseado-1].stock >= unidadesCompraDeseada) {
        // El producto fue encontrado, crea una nueva instancia de Compras
        let compra = new HistorialCompra(sistema.pedidos.length+1 ,usuarioActivo, idProductoDeseado, costeTotal, unidadesCompraDeseada, "Pendiente");
        // Almacena la compra en la lista de pedidos que esta en sistema
        sistema.pedidos.push(compra);

        console.log("Compra agregada al sistema:", compra);
    } else{
        console.log("No hay suficiente stock del producto deseado");
    }
}

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








// SECCION PEDIDOS Y HISTORIAL

function ActualizarPedidosYHistorial() {
    document.querySelector("#tablaPedidosAdmin").innerHTML = `
                    <thead>
                        <td>
                            ID en el Historial
                        </td>
                        <td>
                            Usuario
                        </td>
                        <td>
                            Saldo del usuario
                        </td>
                        <td>
                            Unidades
                        </td>
                        <td>
                            Nombre
                        </td>
                        <td>
                            Subtotal
                        </td>
                        <td>
                            Estado
                        </td>
                        <td>
                            Opciones
                        </td>
                    </thead>`;
    document.querySelector("#tablaPedidosCliente").innerHTML = `
                    <thead>
                        <td>
                            Unidades
                        </td>
                        <td>
                            Nombre
                        </td>
                        <td>
                            Subtotal
                        </td>
                        <td>
                            Estado
                        </td>
                        <td>
                            Opciones
                        </td>
                    </thead>`;
    document.querySelector("#pedidosClienteIdentificacion").innerHTML = usuarioActivo;

    for(let i = 0; i < sistema.pedidos.length; i++) {
        let textoPedido = "";
        let disabledEnabled = "";

        if(sistema.pedidos[i].confirmacion !== "Pendiente") {
            disabledEnabled = ` disabled="disabled" `
        }
        
        if(usuarioActivo === sistema.pedidos[i].usuario) {
            let idProducto = sistema.pedidos[i].productoId; 
            textoPedido = `
            <tr>
            <td>${sistema.pedidos[i].unidades}</td>
            <td>${sistema.productos[idProducto-1].nombre}</td>
            <td>${sistema.pedidos[i].costeTotal}</td>
            <td>${sistema.pedidos[i].confirmacion}</td>
            <td style="display: flex;"><input ${disabledEnabled} id="btnCancelarPedido${sistema.pedidos[i].id}" type="button" value="Cancelar"></td>
            </tr>
            `
            document.querySelector("#tablaPedidosCliente").innerHTML += textoPedido;
        }
    }

    for(let i = 0; i < sistema.pedidos.length; i++) {
        if(sistema.pedidos[i].usuario === usuarioActivo) {
            if(sistema.pedidos[i].confirmacion === "Pendiente") {
                var identifInputCancelar = document.querySelector(`#btnCancelarPedido${sistema.pedidos[i].id}`);
                identifInputCancelar.addEventListener('click', efectuarCancelacion, false);
                identifInputCancelar.idBotonCancelar = identifInputCancelar.id;
            }
        }
    }

    for(let i = 0; i < sistema.pedidos.length; i++) {
        let textoPedido = "";

        let idProducto = sistema.pedidos[i].productoId;
        let saldoUsuario = 0;
        let disabledEnabled = "";

        if(sistema.pedidos[i].confirmacion !== "Pendiente") {
            disabledEnabled = ` disabled="disabled" `
        }

        for(let y = 0; y < sistema.usuarios.length; y++) {
            if(sistema.usuarios[y].username === sistema.pedidos[i].usuario) {
                saldoUsuario = sistema.usuarios[y].saldo;
            }
        }

        textoPedido = `
        <tr>
        <td>${sistema.pedidos[i].id}</td>
        <td>${sistema.pedidos[i].usuario}</td>
        <td>${saldoUsuario}</td>
        <td>${sistema.pedidos[i].unidades}</td>
        <td>${sistema.productos[idProducto-1].nombre}</td>
        <td>${sistema.pedidos[i].costeTotal}</td>
        <td>${sistema.pedidos[i].confirmacion}</td>
        <td style="display: flex;"><input ${disabledEnabled} id="btnConfirmarPedido${sistema.pedidos[i].id}" type="button" value="Confirmar"></td>
        </tr>
        `
        document.querySelector("#tablaPedidosAdmin").innerHTML += textoPedido;
    }

    for(let i = 0; i < sistema.pedidos.length; i++) {
        if(sistema.pedidos[i].confirmacion === "Pendiente") {
            var identifInputConfirmar = document.querySelector(`#btnConfirmarPedido${sistema.pedidos[i].id}`);
            identifInputConfirmar.addEventListener('click', efectuarConfirmacion, false);
            identifInputConfirmar.idBotonConfirmar = identifInputConfirmar.id;
        }
    }
}

function efectuarCancelacion(evt) {
    let idPedido = Number(evt.currentTarget.idBotonCancelar.substring(17)); // Substring(17) toma el texto que sigue a #btnCancelarPedido, vease toma el id del pedido, #btnCancelarPedido tiene 17 letras, por lo tanto se toma el texto a partir de las 17 letras iniciales.
    console.log(`Usted intentó cancelar el pedido ${idPedido}`);

    sistema.pedidos[idPedido-1].confirmacion = "Cancelado";
    

    ActualizarPedidosYHistorial();
}

function efectuarConfirmacion(evt) {
    let idPedido = Number(evt.currentTarget.idBotonConfirmar.substring(18));
    console.log(`Usted intentó confirmar el pedido ${idPedido}`);

    sistema.pedidos[idPedido-1].confirmacion = "Confirmado";

    if(sistema.pedidos[idPedido-1].confirmacion = "Confirmado"){
        for(let i = 0; i < sistema.usuarios.length; i++){
            let pedidoActual = sistema.pedidos[idPedido-1];
            if(sistema.usuarios[i].username === pedidoActual.usuario){
                sistema.usuarios[i].saldo -= pedidoActual.costeTotal;
                sistema.productos[pedidoActual.productoId-1].stock -= pedidoActual.unidades;
                console.log(sistema.productos[pedidoActual.productoId-1].stock);
                console.log(pedidoActual.unidades);
                ActualizarSaldo()
                console.log(`Se hizo la compra`);
            }
        }
    }

    ActualizarPedidosYHistorial();
}

//ver ganancias

function VerGanancias(){
    let gananciasTotales = 0;

    document.querySelector("#tablaGananciasTotales").innerHTML = `
    <thead>
                        <td>
                             Producto
                        </td>
                        <td>
                             Unidades vendidas
                        </td>
                        <td>
                             Ganancia del producto
                        </td>
                    </thead>
    `

    let textoConfirmados = "";
    
    let productoAinspeccionar = "";
    for (let i = 0; i < sistema.productos.length; i++) {
        productoAinspeccionar = sistema.productos[i];
        let idProducto = sistema.productos[i].id
        let costeTotalEsteProducto = 0;
        let unidadesVendidasEsteProducto = 0;
        for (let y = 0; y < sistema.pedidos.length; y++) {
            if(sistema.pedidos[y].productoId === idProducto && sistema.pedidos[y].confirmacion === "Confirmado") {
                costeTotalEsteProducto += sistema.pedidos[y].costeTotal;
                unidadesVendidasEsteProducto += sistema.pedidos[y].unidades;
            }
        }
        gananciasTotales += costeTotalEsteProducto;
        
        textoConfirmados = `
        <tr>
            <td>${productoAinspeccionar.nombre}</td>
            <td>${unidadesVendidasEsteProducto}</td>
            <td>${costeTotalEsteProducto}</td>
        </tr>`;
        document.querySelector("#tablaGananciasTotales").innerHTML += textoConfirmados;
    }

    document.querySelector("#tablaGananciasTotales").innerHTML += `
    <tfoot>
        <td></td>
        <td>Ganancias totales:</td>
        <td>${gananciasTotales}</td>
    </tfoot>
    `
}



