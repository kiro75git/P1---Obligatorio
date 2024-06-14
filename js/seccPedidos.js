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
    document.querySelector("#pedidosClienteIdentificacion").innerHTML = usuarioActivo;

    let gastoTotalUsuario = 0;
    for(let i = 0; i < sistema.pedidos.length; i++) {
        let textoPedido = "";
        let disabledEnabled = "";

        if(sistema.pedidos[i].confirmacion !== "Pendiente") {
            disabledEnabled = ` disabled="disabled" `;
        }
        
        if(usuarioActivo === sistema.pedidos[i].usuario) {
            if(sistema.pedidos[i].confirmacion === "Confirmado") {
                gastoTotalUsuario += sistema.pedidos[i].costeTotal;
            }
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
            if(sistema.pedidos[i].confirmacion === "Pendiente") {
                document.querySelector("#tablaPedidosClientePendientes").innerHTML += textoPedido;
            }else if(sistema.pedidos[i].confirmacion === "Confirmado") {
                document.querySelector("#tablaPedidosClienteConfirmados").innerHTML += textoPedido;
            }else{ //Cancelado
                document.querySelector("#tablaPedidosClienteCancelados").innerHTML += textoPedido;
            }
        }
    }

    document.querySelector("#tablaPedidosClienteFoot").innerHTML = `
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>Sus gastos totales:</td>
                                                                    <td>${gastoTotalUsuario}</td>`;

    for(let i = 0; i < sistema.pedidos.length; i++) {
        if(sistema.pedidos[i].usuario === usuarioActivo) {
            if(sistema.pedidos[i].confirmacion === "Pendiente") {
                var identifInputCancelar = document.querySelector(`#btnCancelarPedido${sistema.pedidos[i].id}`);
                identifInputCancelar.addEventListener('click', efectuarCancelacion, false);
                identifInputCancelar.idBotonCancelar = identifInputCancelar.id;
            }
        }
    }

    let seHanCanceladoPedidos = false;

    for(let i = 0; i < sistema.pedidos.length; i++) {
        let textoPedido = "";

        let idProducto = sistema.pedidos[i].productoId;
        let saldoUsuario = 0;
        let disabledEnabled = "";

        if(sistema.pedidos[i].confirmacion !== "Pendiente" || !sistema.productos[idProducto-1].activo) {
            disabledEnabled = ` disabled="disabled" `;
        }
        if(sistema.productos[idProducto-1].stock < sistema.pedidos[i].unidades && sistema.pedidos[i].confirmacion !== "Cancelado") {
            sistema.pedidos[i].confirmacion = "Cancelado";
            seHanCanceladoPedidos = true;
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
        if(sistema.pedidos[i].confirmacion === "Pendiente") {
            document.querySelector("#tablaPedidosAdminPendientes").innerHTML += textoPedido;
        }else if(sistema.pedidos[i].confirmacion === "Confirmado") {
            document.querySelector("#tablaPedidosAdminConfirmados").innerHTML += textoPedido;
        }else{ //Cancelado
            document.querySelector("#tablaPedidosAdminCancelados").innerHTML += textoPedido;
        }
    }

    for(let i = 0; i < sistema.pedidos.length; i++) {
        if(sistema.pedidos[i].confirmacion === "Pendiente") {
            var identifInputConfirmar = document.querySelector(`#btnConfirmarPedido${sistema.pedidos[i].id}`);
            identifInputConfirmar.addEventListener('click', efectuarConfirmacion, false);
            identifInputConfirmar.idBotonConfirmar = identifInputConfirmar.id;
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
    let idPedido = Number(evt.currentTarget.idBotonConfirmar.substring(18));
    console.log(`Usted intentó confirmar el pedido ${idPedido}`);
    let pedidoActual = sistema.pedidos[idPedido-1];

    let idProducto = pedidoActual.productoId;

    if(sistema.productos[idProducto-1].stock >= pedidoActual.unidades) {
        pedidoActual.confirmacion = "Confirmado";
    }else {
        alert(`Intentó confirmar un pedido para cual no hay stock suficiente, dicho pedido se ha cancelado automáticamente.`);
        pedidoActual.confirmacion = "Cancelado";
    }


    if(pedidoActual.confirmacion = "Confirmado"){
        for(let i = 0; i < sistema.usuarios.length; i++){
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

    ActualizarCatalogo();
    ActualizarPedidosYHistorial();
}