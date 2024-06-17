// VER SECCION DE ADMIN DE INVENTARIO
        
function ActualizarInventario() {
    let options = ``;
    for(let i = 0; i < sistema.productos.length; i++) {
        options += `<option value="${i}">${sistema.productos[i].nombre}</option>`; // actualiza el select con todos los productos
    }
    document.querySelector("#slcProductoAdministrar").innerHTML = `${options}`;
    mostrarElementosOcultos(tipoDeSesion);
    document.querySelector("#btnCrearNuevoProducto").value = "Deseo crear un nuevo producto"; // le proporciona eventlisteners a las funcionalidades de la seccion
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
                                                                    ID:${ProductoSeleccionado.id}`; // muestra en un cuadro toda la informacon del producto
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
    }; // cambia las opciones para modificarle los datos al producto en base a que tipo de parametro se le quiere modificar
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
            break; // se toma el id, substring(8) sire para tomar los ultimos caracteres del string, osea los numeros del id
        }
    }
    let ParametroDentroDelProducto = undefined;
    if(ProductoSeleccionado !== undefined) {
        let nuevoValor = document.querySelector("#parametroACambiar").value;
        if(parametroACambiarProductoElegido !== undefined) {
            if(nuevoValor === "on") {
                nuevoValor = document.querySelector("#parametroACambiar").checked;
            }; // si el valor es on, siginifca que se trata de una checkbox, en ese caso se toma el .checked, que devuelve un booleano
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
    if(String(document.querySelector("#btnCrearNuevoProducto").value) === "Deseo crear un nuevo producto") {     //si el boton crear nuevo producto es igual a "deseo crear un nuevo producto se genera un DOM con la interfaz para crear el mismo"
        document.querySelector("#formCrearProducto").innerHTML = `<label for="inpNombreNuevoProducto">Nombre: </label><input type="text" id="inpNombreNuevoProducto">
                    <label for="inpDescNuevoProducto">Descripcion: </label><input type="text" id="inpDescNuevoProducto">                               
                    <label for="inpNombreNuevoProducto">Precio: </label><input type="number" id="inpPrecioNuevoProducto">
                    <label for="inpDescuentoNuevoProducto">Se encuentra de descuento: </label><input type="checkbox" id="inpDescuentoNuevoProducto">
                    <label for="inpActivoNuevoProducto">Se encuentra activo: </label><input type="checkbox" id="inpActivoNuevoProducto">
                    <label for="inpStockNuevoProducto">Stock inicial: </label><input type="number" id="inpStockNuevoProducto">
                    <label for="inpImagenNuevoProducto">Imagen:</label> <br>
                                                                        <form>
                                                                        <label for="botinesSlc">Botines</label>
                                                                        <input type="radio" id="botinesSlc" value="${urlImagenes[0]}" name="newProductImg">   

                                                                        <label for="mediasSlc">Medias</label>
                                                                        <input type="radio" id="mediasSlc" value="${urlImagenes[1]}" name="newProductImg"> 

                                                                        <label for="cuelloSlc">Cuello termico</label>
                                                                        <input type="radio" id="cuelloSlc" value="${urlImagenes[2]}" name="newProductImg"> 

                                                                        <label for="shortSlc">Short deportivo</label>
                                                                        <input type="radio" id="shortSlc" value="${urlImagenes[3]}" name="newProductImg"> 

                                                                        <label for="gorroSlc">Gorro</label>
                                                                        <input type="radio" id="gorroSlc" value="${urlImagenes[4]}" name="newProductImg"> 
                                                                        </form>`; //cada radio toma la url de la foto deseada, las url estan depositadas en un array en el apartado js de clases

        let radiosVistaPrevia = document.querySelectorAll('input[name="newProductImg"]');  
        for (var j = 0; j < radiosVistaPrevia.length; j++) {
            radiosVistaPrevia[j].addEventListener("click", vistaPrevia); //se toma el valor del input seleccionado para mostrar una vista previa de la imagen deseada
        } 


        document.querySelector("#btnCrearNuevoProducto").value = "Crear Producto";
    }else if(String(document.querySelector("#btnCrearNuevoProducto").value) === "Crear Producto") {    //si se clickea en crear producto se tomaran todos los valores ingresados
        let imagenNueva = null; // variable de imagen vacía (si no se selecciona imagen no se actualiza)
        let nombreNuevo = document.querySelector("#inpNombreNuevoProducto").value;
        let descNueva = document.querySelector("#inpDescNuevoProducto").value;
        let precioNuevo = document.querySelector("#inpPrecioNuevoProducto").value;
        let descuentoNuevo = document.querySelector("#inpDescuentoNuevoProducto").checked;
        let activoNuevo = document.querySelector("#inpActivoNuevoProducto").checked;
        let stockNuevo = document.querySelector("#inpStockNuevoProducto").value;
        let slcImagen = document.querySelectorAll('input[name="newProductImg"]');

        for(let i = 0;i < slcImagen.length; i++){  //se crea un bucle para iterar sobre la familia de radios
            if (slcImagen[i].checked){      //verifica cual de los radios esta seleccionado
                imagenNueva = slcImagen[i].value; //y se toma el valor del mismo
    
                console.log(`${imagenNueva} fue seleccionado`);
            }
        }

        if(nombreNuevo !== "" && descNueva !== "" && precioNuevo > 0 && imagenNueva !== null && stockNuevo >= 0) {  //si se cumplen todas estas condiciones el producto se crea en catálogo
            let idNuevo = "ID_PROD_" + String(Number(sistema.productos.length) + 1);
            let productoNuevo = new Stock(idNuevo, nombreNuevo, descNueva, imagenNueva, precioNuevo, descuentoNuevo, activoNuevo, stockNuevo); //se crea una nueva isntancia de stock
            
            sistema.productos.push(productoNuevo);
            document.querySelector("#pControlCrearProducto").innerHTML = `El producto se creó exitosamente, se le ha proporcionado el id: ${idNuevo}`;

        }else {
            document.querySelector("#pControlCrearProducto").innerHTML = "Ocurrió un error procesando los datos ingresados (probablemente faltó ingresar algun dato)";
        }
        document.querySelector("#btnCrearNuevoProducto").value = "Deseo crear un nuevo producto"; // se reemplaza el texto por el mismo que habia cuando el form estaba escondido
        document.querySelector("#vistaPreviaProducto").innerHTML = ""; 
        // limpiar 
        document.querySelector("#formCrearProducto").innerHTML = "";
    }
}

function vistaPrevia(){
    let imagenPreview = document.querySelectorAll('input[name="newProductImg"]');
    let mostrarNuevaImagen = null;

    for(let r = 0; r < imagenPreview.length; r++){
        if (imagenPreview[r].checked){
            mostrarNuevaImagen = imagenPreview[r].value;

            console.log(`${mostrarNuevaImagen} fue seleccionado`);
        }
    }
    let nombreProdNuevo = document.querySelector("#inpNombreNuevoProducto").value;
    let precioProdNuevo = document.querySelector("#inpPrecioNuevoProducto").value;
    let descProdNuevo = document.querySelector("#inpDescNuevoProducto").value;
    let textoHtmlDescuentoTrue = "";
    let descuentoProdNuevo = document.querySelector("#inpDescuentoNuevoProducto").checked;
    if(descuentoProdNuevo) {
        textoHtmlDescuentoTrue = `<h3>¡DE DESCUENTO!</h3>`;
    } // se toman los valores del form para crear la vista previa, el codigo html es exactamente igual al del catalogo, por lo que deberia verse identico
    document.querySelector("#vistaPreviaProducto").innerHTML = `
                    <article class="producto">
            <figure>
                <img src="${mostrarNuevaImagen}" alt="${nombreProdNuevo}">
                <figcaption>
                    <h4>${nombreProdNuevo} - ${precioProdNuevo}</h4>
                    <p>${descProdNuevo}</p>
                    ${textoHtmlDescuentoTrue}
                </figcaption>
            </figure>
        </article>
    `; // mediante este codigo se muestra una vista previa del producto mientras se esta creando
}

document.querySelector("#formCrearProducto").addEventListener("click", vistaPrevia);

document.querySelector("#btnCrearNuevoProducto").addEventListener("click", ActividadBotonProducto);