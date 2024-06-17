// VER SECCION GANANCIAS

function VerGanancias(){ // Solo una funcion es necesaria, 
    let gananciasTotales = 0;       //se crea una variable con valor 0 para tomar valor de las ganancias

    // se crea un dom para generar una tabla
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
    `; // crea el head de una tabla para ingresar los datos de los productos

    let textoConfirmados = "";  //variable con string vacio para asegurarnos que no se repita la info
    
    let productoAinspeccionar = "";     //variable con string vacio
    for (let i = 0; i < sistema.productos.length; i++) {
        productoAinspeccionar = sistema.productos[i];   //la variable con string vacio toma el valor de los productos almacenados en sistemas
        let idProducto = Number(sistema.productos[i].id.substring(8));  //se crea una variable para tomar el id del producto
        let costeTotalEsteProducto = 0;     //variable que almacenara el valor total de todos los pedidos confirmados de este producto
        let unidadesVendidasEsteProducto = 0;   //tomara el valor de la cantidad de unidades vendidas de ese producto
        for (let y = 0; y < sistema.pedidos.length; y++) {
            if(sistema.pedidos[y].productoId === idProducto && sistema.pedidos[y].confirmacion === "Confirmado") {      //si el id del producto es igaul a la variable generada para tomar id
                costeTotalEsteProducto += sistema.pedidos[y].costeTotal;
                unidadesVendidasEsteProducto += sistema.pedidos[y].unidades;
            } // agrega a las ganancias en caso de que el pedido haya sido confirmado
        }
        gananciasTotales += costeTotalEsteProducto;
        
        //body de la tabla con la info de las ventas de los productos
        textoConfirmados = `
        <tr>
            <td>${productoAinspeccionar.nombre}</td>
            <td>${unidadesVendidasEsteProducto}</td>
            <td>${costeTotalEsteProducto}</td>
        </tr>`; // le ingresa los datos a la tabla en forma de filas nuevas
        document.querySelector("#tablaGananciasTotales").innerHTML += textoConfirmados;
    }

    document.querySelector("#tablaGananciasTotales").innerHTML += `
    <tfoot>
        <td></td>
        <td>Ganancias totales:</td>
        <td>${gananciasTotales}</td>
    </tfoot>
    `; // crea un foot final para mostrar las ganancias totales
}