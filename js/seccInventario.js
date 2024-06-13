// VER SECCION DE ADMIN DE INVENTARIO
        
function ActualizarInventario() {
    let options = ``;
    for(let i = 0; i < sistema.productos.length; i++) {
        options += `<option value="${i}">${sistema.productos[i].nombre}</option>`;
    }
    document.querySelector("#slcProductoAdministrar").innerHTML = `${options}`;
    mostrarElementosOcultos(tipoDeSesion);
    document.querySelector("#btnCrearNuevoProducto").value = "Deseo crear un nuevo producto";
    document.querySelector("#formCrearProducto").innerHTML = ""
}

// FUNCIONALIDAD DESPLEGAR INFORMACION DEL PRODUCTO ( SELECT )

function MostrarInformacionProdcutoInventario() {
    let IDSeleccionado = Number(document.querySelector("#slcProductoAdministrar").value) + 1;
    let ProductoSeleccionado = undefined;
    for(let i = 0; i < sistema.productos.length; i++) {
        if(IDSeleccionado === Number(sistema.productos[i].id.substring(8))) {
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
document.querySelector("#slcProductoAdministrar").addEventListener("click", MostrarInformacionProdcutoInventario);

// FUNCIONALIDAD DESPLEGAR OPCIONES DE MODIFICACION DEL PRODUCTO ( SELECT 2 )

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
document.querySelector("#slcParametroACambiar").addEventListener("click", DesplegarMenuParaModificarInventario);

// FUNCIONALIDAD DE EFECTIVAMENTE REALIZAR UNA MODIFICACION A UN OBJETO DE CLASE PRODUCTO

function RealizarCambioEnInventario() {
    let IDProductoElegido = Number(document.querySelector("#slcProductoAdministrar").value) + 1;
    let parametroACambiarProductoElegido = String(document.querySelector("#slcParametroACambiar").value);
    let ProductoSeleccionado = undefined;

    let mensajeAMostrar = "";
    for(let i = 0; i < sistema.productos.length; i++) {
        if(IDProductoElegido === Number(sistema.productos[i].id.substring(8))) {
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

// FUNCIONALIDAD DEL BOTON DE ELEGIR CREAR UN NUEVO PRODUCTO, DESPLEGAR EL MENU CON SUS OPCIONES Y A SU VEZ CREAR UN NUEVO PRODUCTO EN CASO DE QUE SE RELLENEN LOS CAMPOS

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
            let idNuevo = "ID_PROD_" + String(Number(sistema.productos.length) + 1);
            let productoNuevo = new Stock(idNuevo, nombreNuevo, descNueva, imagenNueva, precioNuevo, descuentoNuevo, activoNuevo, stockNuevo);
            sistema.productos.push(productoNuevo);
            document.querySelector("#pControlCrearProducto").innerHTML = `El producto se creó exitosamente, se le ha proporcionado el id: ${idNuevo}`;

        }else {
            document.querySelector("#pControlCrearProducto").innerHTML = "Ocurrió un error procesando los datos ingresados (probablemente faltó ingresar algun dato)";
        }
        document.querySelector("#btnCrearNuevoProducto").value = "Deseo crear un nuevo producto";
        // limpiar 
        document.querySelector("#formCrearProducto").innerHTML = "";
    }
}

document.querySelector("#btnCrearNuevoProducto").addEventListener("click", ActividadBotonProducto);