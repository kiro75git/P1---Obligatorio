// VER SECCION GANANCIAS

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