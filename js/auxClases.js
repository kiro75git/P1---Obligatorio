// DECLARACION DE CLASES

class Usuario {
    constructor(correoIng, nombreIng, usernameIng, tarjetaIng, cvcIng, contrasenaIng,  tipoUsuarioIng, saldoIng) {
        this.nombre = nombreIng;
        this.correo = correoIng;
        this.username = usernameIng;
        this.tarjeta = tarjetaIng;
        this.cvc = cvcIng;
        this.contrasena = contrasenaIng;
        this.tipoUsuario = tipoUsuarioIng;
        this.saldo = saldoIng;
        
    }
}

class Stock {
    constructor(idProducto, nombreProducto, descripcionProducto, imagenProducto, precioProducto, ofertaProducto, activoProducto, stockProducto) {
        this.id = idProducto;
        this.nombre = nombreProducto;
        this.descripcion = descripcionProducto;
        this.imagen = imagenProducto;
        this.precio = precioProducto;
        this.oferta = ofertaProducto;
        this.activo = activoProducto;
        this.stock = stockProducto;
    }
}

class HistorialCompra{
    constructor(idHistorial, usuarioHistorial, productoIdHistorial, costeTotalHistorial, unidadesHistorial, confirmacionHistorial){
        this.id = idHistorial;
        this.usuario = usuarioHistorial;
        this.productoId = productoIdHistorial;
        this.costeTotal = costeTotalHistorial;
        this.unidades = unidadesHistorial;
        this.confirmacion = confirmacionHistorial;
    }
}


class Sistema {
    constructor() {
        this.usuarios = [
            new Usuario("santi@gmail.com", "Santiago", "santiszucs", "7754-8901-1011-6709", "345", "Santi0000", "admin", 18000),
            new Usuario("lucas@gmail.com", "Lucas", "lucasbenta", "4456-6765-8409-1010", "765", "Lucas0000", "admin", 17000),
            new Usuario("maria@gmail.com", "Maria", "mariaadu", "3267-8902-5986-1232", "911", "Maria0000", "cliente", 19000)
        ];

        this.productos = [
            new Stock("PROD_ID_1", "Campera Nike", "Campera marca Nike, deportiva negra", "https://f.fcdn.app/imgs/63379c/www.globalsports.com.uy/gls/88f1/original/catalogo/NKBV2648-010-1/1500-1500/campera-nike-sportswear-club-black.jpg", 500, true, true, 30),
            new Stock("PROD_ID_2", "Campera Adidas", "Campera marca Adidas superstar, deportiva negra", "https://f.fcdn.app/imgs/323a82/www.zooko.com.uy/zoo/37bb/original/catalogo/ADCW1256-1032-1/460x460/campera-adidas-superstar-tt-black.jpg", 700, false, true, 40),
            new Stock("PROD_ID_3", "Championes Nike", "Championes nike dunk low twist blancos", "https://f.fcdn.app/imgs/e0da12/www.zooko.com.uy/zoo/5637/original/catalogo/NKDZ2794-001-1/1920-1200/championes-nike-nike-dunk-low-twist-black.jpg", 900, true, true, 15),
            new Stock("PROD_ID_4", "Pantalon Adidas", "Pantalon deportivo adidas negro, de triple raya clásico", "https://f.fcdn.app/imgs/028d00/www.zooko.com.uy/zoo/ee3f/original/catalogo/ADGF0210-000-5/460x460/pantalon-adidas-classics-superstar-black.jpg", 450, false, true, 12)
        ]

        this.pedidos = [
            new HistorialCompra(1, "lucasbenta", 2, 700, 1, "Pendiente"),
            new HistorialCompra(2, "mariaadu", 3, 900, 1, "Confirmado"),
            new HistorialCompra(3, "mariaadu", 1, 500, 1, "Pendiente"),
            new HistorialCompra(4, "mariaadu", 4, 900, 2, "Confirmado"),
            new HistorialCompra(5, "lucasbenta", 3, 1800, 2, "Confirmado"),
            new HistorialCompra(6, "santiszucs", 3, 900, 1, "Confirmado"),
            new HistorialCompra(7, "santiszucs", 2, 1400, 2, "Pendiente")
        ]

        
    }

    agregarUsuario(mail, nombre, usuario, tarjetaCredito, cvc, pass, tipo, saldo) {
        let objUsuario = new Usuario(mail, nombre, usuario, tarjetaCredito, cvc, pass, tipo, saldo);
        this.usuarios.push(objUsuario);
    }
}