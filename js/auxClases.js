// DECLARACION DE CLASES

// clase que creara los usuarios
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

//clase que creara el stock de los productos
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

//clase que genera un pedido y lo agrega al historial de compras
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

//clase general, donde se almacenan todos los datos de las clases anteriores
class Sistema {
    constructor() {
        this.usuarios = [
            //admins
            new Usuario("santi@gmail.com", "Santiago Szucs", "santiszucs", "7754-8901-1011-6709", "345", "Santi0000", "admin", 18000),
            new Usuario("lucas@gmail.com", "Lucas Bentancur", "lucasbenta", "4456-6765-8409-1010", "765", "Lucas0000", "admin", 17000),
            new Usuario("sfagnoni@gmail.com", "Santiago Fagnini", "sfagnoni", "5506-2559-8133-4939", "476", "SantiF1234", "admin", 13000),
            new Usuario("raul@gmail.com", "Raul Gimenez", "rgimenez", "3781-8261-4820-1573", "435", "Raul7777", "admin", 10000),
            new Usuario("luis@gmail.com", "Luis Suarez", "luisito", "6011-5730-9387-5086", "499", "Luis2011", "admin", 10000),

            //compradores
            new Usuario("maria@gmail.com", "Maria", "mariaadu", "3267-8902-5986-1232", "911", "Maria0000", "cliente", 3000),
            new Usuario("martin@gmail.com", "Martin", "martoo", "4539-6253-0847-8250", "110", "Martin0000", "cliente", 3000),
            new Usuario("rafael@gmail.com", "Rafael", "rafa", "6833-7894-1122-1342", "770", "Rafa0000", "cliente", 3000),
            new Usuario("renaldo@gmail.com", "Renaldo", "rena", "4916-1035-6733-4187", "501", "Rena0000", "cliente", 3000),
            new Usuario("javier@gmail.com", "Javier", "javi", "5243-1303-1185-0979", "321", "Javi1234", "cliente", 3000)
        ];

        this.productos = [
            new Stock("PROD_ID_1", "Campera Nike", "Campera marca Nike, deportiva negra", "https://f.fcdn.app/imgs/63379c/www.globalsports.com.uy/gls/88f1/original/catalogo/NKBV2648-010-1/1500-1500/campera-nike-sportswear-club-black.jpg", 500, true, true, 30),
            new Stock("PROD_ID_2", "Campera Adidas", "Campera marca Adidas superstar, deportiva negra", "https://f.fcdn.app/imgs/323a82/www.zooko.com.uy/zoo/37bb/original/catalogo/ADCW1256-1032-1/460x460/campera-adidas-superstar-tt-black.jpg", 700, false, true, 40),
            new Stock("PROD_ID_3", "Championes Nike", "Championes nike dunk low twist blancos", "https://f.fcdn.app/imgs/e0da12/www.zooko.com.uy/zoo/5637/original/catalogo/NKDZ2794-001-1/1920-1200/championes-nike-nike-dunk-low-twist-black.jpg", 900, true, true, 15),
            new Stock("PROD_ID_4", "Pantalon Adidas", "Pantalon deportivo adidas negro, de triple raya clásico", "https://f.fcdn.app/imgs/028d00/www.zooko.com.uy/zoo/ee3f/original/catalogo/ADGF0210-000-5/460x460/pantalon-adidas-classics-superstar-black.jpg", 450, false, true, 12),
            new Stock("PROD_ID_5", "Canguro Puma", "Canguro negro puma", "https://f.fcdn.app/imgs/5cdd4f/www.stadiumsport.uy/stspuy/645b/original/catalogo/051.867640102/1920-1200/canguro-de-hombre-puma-logo-negro-blanco.jpg", 600, false, true, 25),
            new Stock("PROD_ID_6", "Calza negra mujer", "calza deportiva para mujer", "https://www.muvin.com.uy/wp-content/uploads/2022/09/calca-legging-solid-power-frente-preto.jpg", 150, false, true, 40),
            new Stock("PROD_ID_7", "Jordan Retro 4", "Jordan retro 4 exclusivas", "https://acdn.mitiendanube.com/stores/001/240/717/products/air-jordan-4-military-black-27e8bd43e35c357501169600631246861-d0199f0aac10f4067616960063530112-1024-1024.png", 2000, true, true, 10),
            new Stock("PROD_ID_8", "Banda de sudor", "Banda de sudor adidas negra para tenis", "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/c92e966285b5475c90a1af43010c10e9_9366/Banda_de_Sudor_de_Tenis_AEROREADY_Negro_IC3563_01_standard.jpg", 150, false, true, 50),
            new Stock("PROD_ID_9", "Musculosa Reebok", "Musculosa Reebok negra", "https://www.tiendaclic.com.ar/77010308-large_default/musculosa-reebok-gs-vector.jpg", 600, false, true, 20),
            new Stock("PROD_ID_10", "Campera de lluvia Nike", "Campera de lluvia marca Nike negra", "https://f.fcdn.app/imgs/0fd60e/www.zooko.com.uy/zoo/2db3/original/catalogo/NKDX0672-010-1/1920-1200/campera-nike-club-black.jpg", 1000, false, true, 20),
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

//array donde se almacenan las imagenes precargadas en caso de que se desee crear un producto
let urlImagenes = [
    "https://m.media-amazon.com/images/I/71YNztim1US._AC_SL1500_.jpg", //botines
    "https://f.fcdn.app/imgs/851216/www.globalsports.com.uy/gls/336d/original/catalogo/ADHT3458-3638-1/2000-2000/medias-adidas-socks-3-white.jpg", //medias
    "https://http2.mlstatic.com/D_996605-MLA41743524392_052020-C.jpg", //cuello termico
    "https://f.fcdn.app/imgs/6031ac/www.stadiumsport.uy/stspuy/1b04/original/catalogo/118.562000001/2000-2000/short-de-mujer-under-armour-fly-by-2-0-negro.jpg", //short
    "https://http2.mlstatic.com/D_NQ_NP_788947-MLU72934288077_112023-O.webp" //gorro
];