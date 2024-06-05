// DEBUG //
let saldoInicialDeUsuarioNuevo = 10000;
// DEBUG //

let tipoDeSesion = 'cerrada';
let usuarioActivo = "";
let saldoDelUsuarioActivo = 0;

function mostrarSeccion() {
    let idBoton = this.getAttribute("id");//"btnSeccionAgregar"
    let idSeccion = idBoton.charAt(3).toLowerCase() + idBoton.substring(4);//"seccionAgregar"
    cambiarSeccion(idSeccion);
}

let elementosOcultables = document.querySelectorAll(".elementoOcultable");
for (let i = 0; i < elementosOcultables.length; i++) {
    const eo = elementosOcultables[i];
    eo.addEventListener("click", mostrarSeccion);
}

function cambiarSeccion(nuevaSeccion) {
    ocultarSecciones();
    document.querySelector("#" + nuevaSeccion).style.display = "block";
    if(nuevaSeccion === "sectSesion") {
        CerrarSesion();
    }
}

cambiarSeccion("sectSesion");

function ocultarSecciones() {
    let secciones = document.querySelectorAll(".seccion");
    for (let i = 0; i < secciones.length; i++) {
        const unaSeccion = secciones[i];
        unaSeccion.style.display = "none";
    }
}

function mostrarElementosOcultos(tipoUsuario) {
    let elementosOcultables = document.querySelectorAll(".elementoOcultable");
    for (let i = 0; i < elementosOcultables.length; i++) {
        const elementoOcultable = elementosOcultables[i];
        elementoOcultable.style.display = "none";
    }
    let visibilidadVariables = document.querySelectorAll(".visibilidadVariable");
    for (let i = 0; i < visibilidadVariables.length; i++) {
        const visibilidadVariable = visibilidadVariables[i];
        visibilidadVariable.style.display = "none";
    }

    let elementosOcultablesMostrar = document.querySelectorAll("." + tipoUsuario)
    for (let i = 0; i < elementosOcultablesMostrar.length; i++) {
        const eoMostrar = elementosOcultablesMostrar[i];
        eoMostrar.style.display = "block";
    }
    let visibilidadVariablesMostrar = document.querySelectorAll("." + tipoUsuario)
    for (let i = 0; i < visibilidadVariablesMostrar.length; i++) {
        const vvMostrar = visibilidadVariablesMostrar[i];
        vvMostrar.style.display = "block";
    }
}

mostrarElementosOcultos(tipoDeSesion);



//usuarios precargados

class Usuarios {
    constructor(correoIng, nombreIng, usernameIng, tarjetaIng, contrasenaIng,  tipoUsuarioIng, saldoIng) {
        this.nombre = nombreIng;
        this.correo = correoIng;
        this.username = usernameIng;
        this.tarjeta = tarjetaIng;
        this.contrasena = contrasenaIng;
        this.tipoUsuario = tipoUsuarioIng;
        this.saldo = saldoIng;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [
            new Usuarios("lucas@gmail", "Lucas", "lucasbenta", "4456-6765-8409-1010", "Lucas0000", "admin", 50000),
            new Usuarios("maria@gmail", "Maria", "mariaadu", "3267-8902-5986-1232", "Maria0000", "cliente", 300000)
        ];
    }

    agregarUsuario(mail, nombre, usuario, tarjetaCredito, pass, tipo, saldo) {
        let objUsuario = new Usuarios(mail, nombre, usuario, tarjetaCredito, pass, tipo, saldo);
        this.usuarios.push(objUsuario);
    }
}

//registro de usuarios

let sistema = new Sistema()

function Registrar() {
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);
    let tarjetaInput = String(document.querySelector("#ingresoTarjeta").value);
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    
    if(verificarNombreYapellido(nombreInput)) {
        if(VerificarPass(passInput) === "OK") {
            sistema.agregarUsuario(mailInput, nombreInput, usernameInput, tarjetaInput, passInput, "cliente", saldoInicialDeUsuarioNuevo);
            // new Usuarios (nombreIng, edadIng, nacionalidadIng);
            // Sistema.push(usuarios);
            // console.log();
            
            document.querySelector("#pError").innerHTML = `Se registró correctamente! Ahora inice sesión.`
            document.querySelector("#formRegistro").style.display = "none";
            console.log(sistema.usuarios);
        }else{
            // Error con los datos ingresados
            document.querySelector("#pError").innerHTML = `${VerificarPass(passInput)}`;
        }
    }else{
        document.querySelector("#pError").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        
        document.querySelector("#formRegistro").style.display = "block";
    }
}

document.querySelector("#btnRegistro").addEventListener("click", Registrar);

//funcion para verificar contraseña
function VerificarPass(pass) {
    let error = "ninguno";
    let password = pass;
    let hasNum = false;
    if(password.length >= 5) {
            for(let i = 0; i < password.length; i++) {
                    switch (password.charAt(i)) {
                            case "0":
                            case "1":
                            case "2":
                            case "3":
                            case "4":
                            case "5":
                            case "6":
                            case "7":
                            case "8":
                            case "9":
                                    if(i === 0) {
                                            error = "numeroinicio";
                                    }
                                    hasNum = true;
                                    break;
                            default:
                                    break;
                    }
            }
            if(!hasNum) {
                    error = "sinnumero";
            }
            let minCount = 0;
            let mayCount = 0;
            for(let i = 0; i < password.length; i++) {
                    if(password.charAt(i) === " ") {
                            error = "espacio"
                    }else if(password.charAt(i) === password.charAt(i).toUpperCase()) {
                            mayCount++;
                    }else if(password.charAt(i) === password.charAt(i).toLowerCase()) {
                            minCount++;
                    }
            }
            if(!(minCount > 0 && mayCount > 0)) {
                    error = "mayusminus";
            }
            
    }else {error = "longitud";}

    let mensaje = "OK";

    if(error === "longitud") {
            mensaje = "Su contraseña debe tener al menos 5 caracteres";
    }else if(error === "mayusminus") {
            mensaje = "Su contraseña debe tener una mayúscula y una minúscula";
    }else if(error === "numeroinicio") {
            mensaje = "Su contraseña no puede comenzar por un número";
    }else if(error === "sinnumero") {
            mensaje = "Su contraseña debe tener al menos un número";
    }else if(error === "espacio") {
            mensaje = "Su contraseña no puede tener espacios en blanco";
    }

    return mensaje;
}

function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);

    let encontrado = false;

    for(let i=0; i < sistema.usuarios.length; i++) {
        if(usernameInput === sistema.usuarios[i].username) {
            console.log("Usuario encontrado");
            encontrado = true;
            if(passInput === sistema.usuarios[i].contrasena) {
                // bien
                ExitoAlIniciarSesion(sistema.usuarios[i].tipoUsuario, sistema.usuarios[i].nombre, sistema.usuarios[i].saldo)
                break;
            }else{
                // mal
                document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
            }
        }  
    } 
}

document.querySelector("#btnInicioSesion").addEventListener("click", Ingresar);

//verificar ingreso nombre y apellido
function verificarNombreYapellido(nombreUsuario){
    let verificarEspacio = false;
    let hayEspacios = 0;
    for(let i = 0; i < nombreUsuario.length; i++){
        let valorCaracter = nombreUsuario.charAt(i);
        
        if(valorCaracter === " "){
            hayEspacios++;
        }
    }
    
    if(hayEspacios > 0){
        verificarEspacio = true;
    } else {
        document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
    }
    
    return verificarEspacio;
}

//verificar ingreso de tarjeta
function validarTarjeta(nroTarjeta) {
    //funcion para verificar tarjeta:

    let contadorGuiones = 0;
        
    for(let r = 0; r < nroTarjeta.length; r++){
        let caracterPos =  nroTarjeta.charAt(r);
            
        if(caracterPos === "-"){
            contadorGuiones++;
        }
    }

    if (contadorGuiones === 3){
            let acumulador = 0;
            let digitoVerificar = nroTarjeta.charAt(nroTarjeta.length - 1);
            let dev = false;
            let cont = 0;
            for (let i = nroTarjeta.length - 2; i >= 0; i--) {
                let valorAcumular = Number(nroTarjeta.charAt(i));
                if (cont % 2 === 0) {
                    let duplicado = Number(nroTarjeta.charAt(i)) * 2;
                    if (duplicado >= 10) {
                        let duplicadoStr = String(duplicado);
                        let suma = Number(duplicadoStr.charAt(0)) + Number(duplicadoStr.charAt(1));
                        valorAcumular = suma;
                    } else {
                        valorAcumular = duplicado;
                    }
                }
                acumulador += valorAcumular;
                cont++;
            }
            let multiplicado = acumulador * 9;
            let multiplicadoStr = String(multiplicado);
            let digitoVerificador = multiplicadoStr.charAt(multiplicadoStr.length - 1);
            if (digitoVerificar === digitoVerificador) {
                dev = true;
            }
            return dev;

    }else {
        document.querySelector("#pError").innerHTML = "ocurrió un error al ingresar los datos"
    }
}

// INICIO DE SESION EXITOSO

function ExitoAlIniciarSesion(sesionDelUsuario, nombreDelUsuario, saldoDelUsuario) {
    tipoDeSesion = sesionDelUsuario;

    mostrarElementosOcultos(tipoDeSesion);

    cambiarSeccion("sectCatalogo");

    document.querySelector("#textoNavSesion").innerHTML = `Cerrar sesión`;

    usuarioActivo = nombreDelUsuario;

    saldoDelUsuarioActivo = saldoDelUsuario;

    document.querySelector("#displayUsuario").innerHTML = `Sesión iniciada como ${nombreDelUsuario}`

    document.querySelector("#displaySaldo").innerHTML = `Saldo: ${saldoDelUsuario}`

    document.querySelector("#infoUsuario").style.display = "block";
}

function CerrarSesion() {
    tipoDeSesion = "cerrada";

    console.log("Se cerró la sesion");

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Iniciar sesión`;

    usuarioActivo = "";

    saldoDelUsuarioActivo = 0;

    document.querySelector("#infoUsuario").style.display = "none";
}

//funcion boton de compra
/*
class Compras{
    constructor(nombreProducto, precioProducto, unidadesProducto){
        this.producto = nombreProducto;
        this.precio = precioProducto;
        this.unidades = unidadesProducto
    }
}

document.querySelector("#btnCompra").addEventListener("click", RealizarPedido);

*/