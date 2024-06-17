// VER SECCION PEDIDOS Y HISTORIAL

function ActualizarPedidosYHistorial() {  //funcion que genera un DOM con la información de los pedidos
    document.querySelector("#tablaPedidosAdminHead").innerHTML = `
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
                        </td>`;
    document.querySelector("#tablaPedidosAdminCancelados").innerHTML = "";
    document.querySelector("#tablaPedidosAdminConfirmados").innerHTML = "";
    document.querySelector("#tablaPedidosAdminPendientes").innerHTML = "";
    document.querySelector("#tablaPedidosClienteHead").innerHTML = `
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
                        </td>`;
    document.querySelector("#tablaPedidosClienteCancelados").innerHTML = "";
    document.querySelector("#tablaPedidosClienteConfirmados").innerHTML = "";
    document.querySelector("#tablaPedidosClientePendientes").innerHTML = "";
    document.querySelector("#pedidosClienteIdentificacion").innerHTML = usuarioActivo; // se le proporciona un head a las tablas, y otros valores fijos de usuario a usuario

    let gastoTotalUsuario = 0;      //variable que tomara el valor del gasto del usuario
    for(let i = 0; i < sistema.pedidos.length; i++) {
        let textoPedido = "";       //string vacio par actualizar el parrafo
        let disabledEnabled = "";   //variable que tomara el valor del atributo para desactivar

        if(sistema.pedidos[i].confirmacion !== "Pendiente") {  //si la confirmacion del pedido no esta en pendiente
            disabledEnabled = ` disabled="disabled" `;  
        } // esta variable existe unicamente para que en caso de que el pedido no se encuentre pendiente, el boton tenga el atributo "disabled" y no se pueda presionar
        
        if(usuarioActivo === sistema.pedidos[i].usuario) {      //si el usuario que esta activo es igual al que efectuo el pedido
            if(sistema.pedidos[i].confirmacion === "Confirmado") { //y si el pedido ya esta confirmado
                gastoTotalUsuario += sistema.pedidos[i].costeTotal;  //se acumula al gasto total del usuario el costo total de la compra
            }; 
            let idProducto = sistema.pedidos[i].productoId; //variable que toma el id del producto 
            //se actualiza el string vacio generando una tabla con la info de la compra, con un boton para cancelar el pedido
            textoPedido = `
            <tr>
            <td>${sistema.pedidos[i].unidades}</td>
            <td>${sistema.productos[idProducto-1].nombre}</td>
            <td>${sistema.pedidos[i].costeTotal}</td>
            <td>${sistema.pedidos[i].confirmacion}</td>
            <td style="display: flex;"><input ${disabledEnabled} id="btnCancelarPedido${sistema.pedidos[i].id}" type="button" value="Cancelar"></td>
            </tr>
            `; // se instancia la fila en la tabla, correspondiente al pedido
            if(sistema.pedidos[i].confirmacion === "Pendiente") {
                document.querySelector("#tablaPedidosClientePendientes").innerHTML += textoPedido;
            }else if(sistema.pedidos[i].confirmacion === "Confirmado") {
                document.querySelector("#tablaPedidosClienteConfirmados").innerHTML += textoPedido;
            }else{ //Cancelado
                document.querySelector("#tablaPedidosClienteCancelados").innerHTML += textoPedido;
            }; // se toman los pedidos, y se separan entre confirmados, cancelados y pendientes
        }
    }

    document.querySelector("#tablaPedidosClienteFoot").innerHTML = `
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>Sus gastos totales:</td>
                                                                    <td>${gastoTotalUsuario}</td>`; // se le da un foot a la tabla con el gasto total

    //misma funcion de boton para cada una de las celdas de la lista
    for(let i = 0; i < sistema.pedidos.length; i++) {
        if(sistema.pedidos[i].usuario === usuarioActivo) {
            if(sistema.pedidos[i].confirmacion === "Pendiente") {
                var identifInputCancelar = document.querySelector(`#btnCancelarPedido${sistema.pedidos[i].id}`);
                identifInputCancelar.addEventListener('click', efectuarCancelacion, false);
                identifInputCancelar.idBotonCancelar = identifInputCancelar.id;
            }
        }
    }

    let seHanCanceladoPedidos = false; //variable para confirmar si se cancelaron pedidos

    for(let i = 0; i < sistema.pedidos.length; i++) {       //se itera sobre los pedidos
        let textoPedido = "";   //string vacio

        let idProducto = sistema.pedidos[i].productoId; //toma id del producto
        let saldoUsuario = 0;       //saldo del usuario
        let disabledEnabled = "";   //variable de atributo disabled sin declarar aun

        if(sistema.pedidos[i].confirmacion !== "Pendiente" || !sistema.productos[idProducto-1].activo) {
            disabledEnabled = ` disabled="disabled" `;      //si la compra no esta pendiente o el producto no esta activo la variable toma el valor del atributo disabled
        }
        if(sistema.productos[idProducto-1].stock < sistema.pedidos[i].unidades && sistema.pedidos[i].confirmacion !== "Cancelado") {
            sistema.pedidos[i].confirmacion = "Cancelado";      //si el stock es menor a las unidades y la confirmacion es distinta a cancelado, se cancela automaticamente la compra
            seHanCanceladoPedidos = true;   //se confirma que hay pedidos cancelados
        }

        for(let y = 0; y < sistema.usuarios.length; y++) {
            if(sistema.usuarios[y].username === sistema.pedidos[i].usuario) {
                saldoUsuario = sistema.usuarios[y].saldo; // se obtiene el saldo del usuario una vez el usuario del pedido coincida con uno en el sistema
            }
        }
        //se actualiza la lista de pedidos
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
        `; // se muestra la informacion de los pedidos, como esta es la tabla para administradores, la informacion incluye otras cosas como el usuario, el id del pedido, el estado de confirmacion, etc.
        if(sistema.pedidos[i].confirmacion === "Pendiente") {
            document.querySelector("#tablaPedidosAdminPendientes").innerHTML += textoPedido;
        }else if(sistema.pedidos[i].confirmacion === "Confirmado") {
            document.querySelector("#tablaPedidosAdminConfirmados").innerHTML += textoPedido;
        }else{ //Cancelado
            document.querySelector("#tablaPedidosAdminCancelados").innerHTML += textoPedido;
        }
    }

    for(let i = 0; i < sistema.pedidos.length; i++) {
        if(sistema.pedidos[i].confirmacion === "Pendiente") { // se recorren todos los botones con confirmacion pendiente para darles funcionalidad
            var identifInputConfirmar = document.querySelector(`#btnConfirmarPedido${sistema.pedidos[i].id}`); // la variable itentifInputConfirmar contiene al elemento del html de uno de los botones
            identifInputConfirmar.addEventListener('click', efectuarConfirmacion, false); // primero se le da un event listener al boton dentro del html
            identifInputConfirmar.idBotonConfirmar = identifInputConfirmar.id; // luego se le pasa un parametro a traves del event unico del boton, el parametro elegido a pasar es el atributo "id" mismamente del boton dentro del html
        }
    }

    if(seHanCanceladoPedidos) {
        alert(`Algunos pedidos se han cancelado automáticamente, debido a falta de stock`);
    }
}

// FUNCION INDIVIDUAL PARA CADA BOTON DE CANCELACION DE PEDIDOS, UTILIZA UN EVENTO Y REALIZA LA ACCION CORRESPONDIENTE DIRECTAMENTE

function efectuarCancelacion(evt) {
    let idPedido = Number(evt.currentTarget.idBotonCancelar.substring(17)); // Substring(17) toma el texto que sigue a #btnCancelarPedido, vease toma el id del pedido, #btnCancelarPedido tiene 17 letras, por lo tanto se toma el texto a partir de las 17 letras iniciales.
    console.log(`Usted intentó cancelar el pedido ${idPedido}`);

    sistema.pedidos[idPedido-1].confirmacion = "Cancelado";
    
    ActualizarPedidosYHistorial();
}

// FUNCION INDIVIDUAL PARA CADA BOTON DE CONFIRMACION DE PEDIDOS, UTILIZA UN EVENTO Y REALIZA LA ACCION CORRESPONDIENTE DIRECTAMENTE

function efectuarConfirmacion(evt) {
    let idPedido = Number(evt.currentTarget.idBotonConfirmar.substring(18)); // Substring(18) toma el texto que sigue a #btnConfirmarPedido, vease toma el id del pedido #btnConfirmarPedido tiene 18 letras, por lo tanto se toma el texto a partir de las 18 letras iniciales.
    console.log(`Usted intentó confirmar el pedido ${idPedido}`);
    let pedidoActual = sistema.pedidos[idPedido-1];

    let idProducto = pedidoActual.productoId;

    if(sistema.productos[idProducto-1].stock >= pedidoActual.unidades) {
        pedidoActual.confirmacion = "Confirmado";
    }else {
        alert(`Intentó confirmar un pedido para cual no hay stock suficiente, dicho pedido se ha cancelado automáticamente.`);
        pedidoActual.confirmacion = "Cancelado";
    }; // en caso de que no se pueda confirmar el pedido a falta de stock, este se cancela y se emite una alerta


    if(pedidoActual.confirmacion = "Confirmado"){
        for(let i = 0; i < sistema.usuarios.length; i++){ // se recorren los usuarios para encontrar el que coincide con el pedido
            if(sistema.usuarios[i].username === pedidoActual.usuario){
                sistema.usuarios[i].saldo -= pedidoActual.costeTotal;
                sistema.productos[pedidoActual.productoId-1].stock -= pedidoActual.unidades;
                console.log(sistema.productos[pedidoActual.productoId-1].stock); // se resta el saldo al usuario, se resta el stock al producto, se loguean los cambios en la consola y se cierra la funcion
                console.log(pedidoActual.unidades);
                ActualizarSaldo()
                console.log(`Se hizo la compra`);  
            }
        }
    }

    ActualizarCatalogo();
    ActualizarPedidosYHistorial(); // se llama a actualizar el catalogo y los pedidos para que todos los datos queden al dia
}