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

class Compra{
    constructor(usuarioPedido, nombreProducto, precioProducto, unidadesProducto){
        this.Usuario = usuarioPedido;
        this.producto = nombreProducto;
        this.precio = precioProducto;
        this.unidades = unidadesProducto
    }
}


class Sistema {
    constructor() {
        this.usuarios = [
            new Usuario("santi@gmail.com", "Santiago", "santiszucs", "7754-8901-1011-6709", "345", "Santi0000", "admin", 50000),
            new Usuario("lucas@gmail.com", "Lucas", "lucasbenta", "4456-6765-8409-1010", "765", "Lucas0000", "admin", 50000),
            new Usuario("maria@gmail.com", "Maria", "mariaadu", "3267-8902-5986-1232", "911", "Maria0000", "cliente", 300000)
        ];

        this.productos = [
            new Stock(1, "Campera Nike", "Campera marca Nike, deportiva negra", "https://f.fcdn.app/imgs/63379c/www.globalsports.com.uy/gls/88f1/original/catalogo/NKBV2648-010-1/1500-1500/campera-nike-sportswear-club-black.jpg", 3200, false, false, 30),
            new Stock(2, "Campera Adidas", "Campera marca Adidas superstar, deportiva negra", "https://f.fcdn.app/imgs/323a82/www.zooko.com.uy/zoo/37bb/original/catalogo/ADCW1256-1032-1/460x460/campera-adidas-superstar-tt-black.jpg", 2900, false, true, 40),
            new Stock(3, "Championes Nike", "Championes nike dunk low twist blancos", "https://f.fcdn.app/imgs/e0da12/www.zooko.com.uy/zoo/5637/original/catalogo/NKDZ2794-001-1/1920-1200/championes-nike-nike-dunk-low-twist-black.jpg", 4000, false, true, 15),
            new Stock(4, "Pantalon Adidas", "Pantalon deportivo adidas negro, de triple raya clásico", "https://f.fcdn.app/imgs/028d00/www.zooko.com.uy/zoo/ee3f/original/catalogo/ADGF0210-000-5/460x460/pantalon-adidas-classics-superstar-black.jpg", 3400, false, true, 12)
        ]

        this.pedidos = []
    }

    agregarUsuario(mail, nombre, usuario, tarjetaCredito, pass, tipo, saldo) {
        let objUsuario = new Usuario(mail, nombre, usuario, tarjetaCredito, pass, tipo, saldo);
        this.usuarios.push(objUsuario);
    }
}