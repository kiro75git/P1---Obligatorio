// VER SECCION CATALOGO

function ActualizarCatalogo() {
    document.querySelector("#seccionCargaProductosJS").innerHTML = "";  //resetea la secciones para cargar productos y descuentos dentro del catalogo
    document.querySelector("#seccionCargaDescuentosJS").innerHTML = "";
    let contadorInactivos = 0;  //variable que contiene la cantidad de productos inactivos
    let mensajeInactivos = "";  //variable con string vacio para que quede en blanco al no haber mensajes
    for(let i = 0; i < sistema.productos.length; i++) { //bucle que recorre en la clase sistema los productos
        let productoActual = sistema.productos[i];  
        let stockDelProd = "";  //string vacio
        let idDelProd = productoActual.id.substring(8); //el string vacio toma el valor del id del producto
        let textoBoton = "Comprar"; //variable con string comprar que tendra la funcion de un boton
        let textoClassDisabled = ""; 
        let textoHtmlDescuentoTrue = "";
        if(productoActual.stock > 0) { 
            stockDelProd = String(productoActual.stock); //si el stock del producto es mayor a 0, la variable toma el valor de stock del producto actual
        }else{
            stockDelProd = 0;   //en caso contrario, el stock del producto es 0, el boton comprar, pasa a sinstock y se desactiva
            textoBoton = "SIN STOCK!";
            textoClassDisabled = `disabled="disabled"`;
        }
        if(productoActual.oferta) {
            textoHtmlDescuentoTrue = `<h3>¡DE DESCUENTO!</h3>`; //si el producto tiene oferta: true, se informa con un titulo en el catalogo
        }

        let options = ""; //variable para seleccionar stock declarada con string vacio
        
        for(let i = 1; i <= stockDelProd; i++) {    
            options += `<option value="${i}">${i}</option>`;    //se crea un bucle que recorre el stock, el select de unidades tomara la cantidad de stock disponible para que el usuario eliga cuantos quiera
        }
        
        // Generacion del producto en el catálogo
        if(productoActual.activo && productoActual.stock > 0) { //si el producto tiene activo: true y el stock es mayor a 0 se genera un DOM con toda la info del producto:
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
                            ${textoHtmlDescuentoTrue}
                            <h4>${productoActual.nombre} - ${productoActual.precio}</h4>
                            <p>${productoActual.descripcion}</p>
                            
                        </figcaption>
                    </figure>
                </article>
            `
            if(productoActual.oferta) { //si el producto esta en oferta aparece tambien un DOM en la seccion de productos en oferta
                document.querySelector("#seccionCargaDescuentosJS").innerHTML += `
                    <article class="producto">
                        <figure>
                            <img src="${productoActual.imagen}" alt="${productoActual.nombre}">
                            <figcaption>
                                <div class="comprar">
                                    <input type="button" value="${textoBoton}" ${textoClassDisabled} id="btnDescue${idDelProd}" class="button">
                                    <select id="slcUnidDesc${idDelProd}" class="selectUnidades">
                                        ${options}
                                    </select>
                                </div>
                                ${textoHtmlDescuentoTrue}
                                <h4>${productoActual.nombre} - ${productoActual.precio}</h4>
                                <p>${productoActual.descripcion}</p>
                                
                            </figcaption>
                        </figure>
                    </article>
                `
            }
        }else if(productoActual.activo && productoActual.stock <= 0) { //sino si el producto esta activo pero no tiene stock:
            productoActual.activo = false; //el producto pasa a false automaticamente, por lo que se desactiva
            console.log(`/////////////////////////////////////////////////////////`);
            console.log(`El producto ${productoActual.nombre}, se encontraba activo a pesar de no tener stock, se ha cambiado a inactivo automáticamente`);
            console.log(`/////////////////////////////////////////////////////////`);
            contadorInactivos += 1; //aumenta la variable acumuladora de productos inactivos
            mensajeInactivos += `${productoActual.nombre}, `    //se agrega a la lista de productos inactivos
        }else {
            contadorInactivos += 1;    
            mensajeInactivos += `${productoActual.nombre}, `;
        }

    }


    // Proporciona funcionalidad a los botones de compra del catalogo mediante un evento atado al id del boton utilizado en la funcion auxiliar efectuarCompra
    for(let i = 0; i < sistema.productos.length; i++) {
        if(sistema.productos[i].activo) {
            var identifInput = document.querySelector(`#btnCompra${i+1}`);  //se crea una variable que toma el valor del boton de compra + su id
            identifInput.addEventListener('click', efectuarCompra, false);  //se le agrega un evento de click a la variable con el valor del boton para llamar a la funcion efectuarCompra
            identifInput.idBotonComprar = identifInput.id;  //a la variable se le genera el atributo id del boton para tomar el valor del mismo
        }
    }

    for(let i = 0; i < sistema.productos.length; i++) {     
        if(sistema.productos[i].activo && sistema.productos[i].oferta) {    //se recorre la clase sistemas, el apartado de productos y si un producto esta activo y de oferta pasa que:
            var identifInputDescuento = document.querySelector(`#btnDescue${i+1}`);     // se toma el id del boton
            identifInputDescuento.addEventListener('click', efectuarCompraOferta, false);   //llama a la funcion al clickear
            identifInputDescuento.idBotonComprar = identifInputDescuento.id;       //se toma el id del boton
        }
    }
    
    if(tipoDeSesion === "admin" && contadorInactivos > 0) { //avisa al admin con una alerta la cantidad de productos inactivos
        console.log(`/////////////////////////////////////////////////////////`);
        console.log(`Hay ${contadorInactivos} productos inactivos: ${mensajeInactivos}`);
        console.log(`/////////////////////////////////////////////////////////`);
    }
    mostrarElementosOcultos(tipoDeSesion);
}

// FUNCION INDIVIDUAL PARA CADA BOTON DE COMPRA DENTRO DEL CATALOGO, UTILIZA UN EVENTO

function efectuarCompra(evt) {
    let idProducto = Number(evt.currentTarget.idBotonComprar.substring(9)); // substring(9) toma el valor del string a partir de la posicion 9, osea toma el id del producto / currentTarget toma el valor deseado del elemento html
    let cantidadCompra = Number(document.querySelector(`#slcUnidades${idProducto}`).value);     //se crea una variable de valor numerico que toma la cantidad de unidades de tal producto con tal id
    console.log(`Intentaste comprar ${cantidadCompra} ${sistema.productos[idProducto-1].nombre} desde el panel común`);     //se muestra un mensaje en la consola

    AgregarCompra(idProducto, cantidadCompra);      //se llama a la funcion agregar compra (en la seccion js de funciones)
}

function efectuarCompraOferta(evt) {        //lo mismo que la funcion anterior pero para los productos en oferta
    let idProducto = Number(evt.currentTarget.idBotonComprar.substring(9)); // substring(9) toma el valor del string a partir de la posicion 9, osea toma el id del producto
    let cantidadCompra = Number(document.querySelector(`#slcUnidDesc${idProducto}`).value);
    console.log(`Intentaste comprar ${cantidadCompra} ${sistema.productos[idProducto-1].nombre} desde el panel de oferta`);

    AgregarCompra(idProducto, cantidadCompra);
}

// FUNCION AUXILIAR QUE LANZA LA COMPRA

function AgregarCompra(idProductoDeseado, unidadesCompraDeseada) {      //funcion para agregar compra
    // Buscar el producto con el id dado en el array de productos
    let costeTotal = sistema.productos[idProductoDeseado-1].precio * unidadesCompraDeseada; //se crea una variable para tomar el coste total (precio x unidades deseadas)

    if(sistema.productos[idProductoDeseado-1].stock >= unidadesCompraDeseada) {     //si el stock del producto deseado (-1 porque el contador arranca en uno y en sistema arranca en 0) es mayor o igual a las unidades deseadas:
        // El producto fue encontrado, crea una nueva instancia de Compras
        let compra = new HistorialCompra(sistema.pedidos.length+1 ,usuarioActivo, idProductoDeseado, costeTotal, unidadesCompraDeseada, "Pendiente");
        // Almacena la compra en la lista de pedidos que esta en sistema
        sistema.pedidos.push(compra);

        console.log("Compra agregada al sistema:", compra);
    } else{
        console.log("No hay suficiente stock del producto deseado");
    }
}