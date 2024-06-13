// VER SECCION CATALOGO

function ActualizarCatalogo() {
    document.querySelector("#seccionCargaProductosJS").innerHTML = "";
    document.querySelector("#seccionCargaDescuentosJS").innerHTML = "";
    let contadorInactivos = 0;
    let mensajeInactivos = "";
    for(let i = 0; i < sistema.productos.length; i++) {
        let productoActual = sistema.productos[i];
        let stockDelProd = "";
        let idDelProd = productoActual.id.substring(8);
        let textoBoton = "Comprar";
        let textoClassDisabled = "";
        let textoHtmlDescuentoTrue = "";
        if(productoActual.stock > 0) {
            stockDelProd = String(productoActual.stock);
        }else{
            stockDelProd = 0;
            textoBoton = "SIN STOCK!";
            textoClassDisabled = `disabled="disabled"`;
        }
        if(productoActual.oferta) {
            textoHtmlDescuentoTrue = `<h3>¡DE DESCUENTO!</h3>`;
        }

        let options = "";
        
        for(let i = 1; i <= stockDelProd; i++) {
            options += `<option value="${i}">${i}</option>`;
        }
        
        // Generacion del producto en el catálogo
        if(productoActual.activo && productoActual.stock > 0) {
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
            if(productoActual.oferta) {
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
        }else if(productoActual.activo && productoActual.stock <= 0) {
            productoActual.activo = false;
            console.log(`/////////////////////////////////////////////////////////`);
            console.log(`El producto ${productoActual.nombre}, se encontraba activo a pesar de no tener stock, se ha cambiado a inactivo automáticamente`);
            console.log(`/////////////////////////////////////////////////////////`);
            contadorInactivos += 1;
            mensajeInactivos += `${productoActual.nombre}, `
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

    for(let i = 0; i < sistema.productos.length; i++) {
        if(sistema.productos[i].activo && sistema.productos[i].oferta) {
            var identifInputDescuento = document.querySelector(`#btnDescue${i+1}`);
            identifInputDescuento.addEventListener('click', efectuarCompraOferta, false);
            identifInputDescuento.idBotonComprar = identifInputDescuento.id;
        }
    }
    
    if(tipoDeSesion === "admin" && contadorInactivos > 0) {
        console.log(`/////////////////////////////////////////////////////////`);
        console.log(`Hay ${contadorInactivos} productos inactivos: ${mensajeInactivos}`);
        console.log(`/////////////////////////////////////////////////////////`);
    }
    mostrarElementosOcultos(tipoDeSesion);
}

// FUNCION INDIVIDUAL PARA CADA BOTON DE COMPRA DENTRO DEL CATALOGO, UTILIZA UN EVENTO

function efectuarCompra(evt) {
    let idProducto = Number(evt.currentTarget.idBotonComprar.substring(9)); // substring(9) toma el valor del string a partir de la posicion 9, osea toma el id del producto
    let cantidadCompra = Number(document.querySelector(`#slcUnidades${idProducto}`).value);
    console.log(`Intentaste comprar ${cantidadCompra} ${sistema.productos[idProducto-1].nombre} desde el panel común`);

    AgregarCompra(idProducto, cantidadCompra);
}

function efectuarCompraOferta(evt) {
    let idProducto = Number(evt.currentTarget.idBotonComprar.substring(9)); // substring(9) toma el valor del string a partir de la posicion 9, osea toma el id del producto
    let cantidadCompra = Number(document.querySelector(`#slcUnidDesc${idProducto}`).value);
    console.log(`Intentaste comprar ${cantidadCompra} ${sistema.productos[idProducto-1].nombre} desde el panel de oferta`);

    AgregarCompra(idProducto, cantidadCompra);
}

// FUNCION AUXILIAR QUE LANZA LA COMPRA

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