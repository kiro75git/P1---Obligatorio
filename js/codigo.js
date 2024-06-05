//usuarios precargados

class Usuarios {
    constructor(correoIng, nombreIng, usernameIng, tarjetaIng, contrasenaIng,  tipoUsuarioIng,) {
        this.nombre = nombreIng;
        this.correo = correoIng;
        this.username = usernameIng;
        this.tarjeta = tarjetaIng;
        this.contrasena = contrasenaIng;
        this.tipoUsuario = tipoUsuarioIng;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [
            new Usuarios("lucas@gmail", "Lucas", "lucasbenta", "4456-6765-8409-1010", "Lucas0000", "ad"),
            new Usuarios("maria@gmail", "Maria", "mariaadu", "3267-8902-5986-1232", "Maria0000", "cl")
        ];
    }

    agregarUsuario(mail, nombre, usuario, tarjetaCredito, pass, tipo) {
        let objUsuario = new Usuarios(mail, nombre, usuario, tarjetaCredito, pass, tipo);
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
            sistema.agregarUsuario(mailInput, nombreInput, usernameInput, tarjetaInput, passInput, "cl");
            // new Usuarios (nombreIng, edadIng, nacionalidadIng);
            // Sistema.push(usuarios);
            // console.log();
            
            document.querySelector("#pErrores").innerHTML = `Se registró correctamente! Ahora inice sesión.`
            console.log(sistema.usuarios);
        }else{
            // Error con los datos ingresados
            document.querySelector("#pErrores").innerHTML = `${VerificarPass(passInput)}`;
        }
    }else{
        document.querySelector("#pErrores").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        document.querySelector("#ingresoNombre").removeAttribute("hidden");
        document.querySelector("#labelIngresoNombre").removeAttribute("hidden");
        document.querySelector("#labelIngresoUsername").removeAttribute("hidden");
        document.querySelector("#ingresoUsername").removeAttribute("hidden");
        document.querySelector("#ingresoTarjeta").removeAttribute("hidden");
        document.querySelector("#labelIngresoTarjeta").removeAttribute("hidden");
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

let tipoDeSesion = 'Cerrada';
let usuarioActivo;

function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let tipoDeUsuario = String(document.querySelector("#slcTipoUsuario").value);

    let encontrado = false;

    for(let i=0; i < sistema.usuarios.length; i++) {
        if(mailInput === sistema.usuarios[i].correo) {
            console.log("Usuario encontrado");
            encontrado = true;
            if(passInput === sistema.usuarios[i].contrasena && tipoDeUsuario === sistema.usuarios[i].tipoUsuario) {
                // bien
                ExitoAlIniciarSesion(tipoDeUsuario, sistema.usuarios[i].nombre)
                break;
            }else{
                // mal
                document.querySelector("#pErrores").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
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
        document.querySelector("#pErrores").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
    }
    
    return verificarEspacio;
}

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
        document.querySelector("#pErrores").innerHTML = "ocurrió un error al ingresar los datos"
    }
}
  

// INICIO DE SESION EXITOSO

function ExitoAlIniciarSesion(sesionDelUsuario, nombreDelUsuario) {

    if(sesionDelUsuario === "ad"){
        tipoDeSesion = "Administrador";
    }else{
        tipoDeSesion = "Cliente";
    }

    document.querySelector("#pErrores").innerHTML = `Ha iniciado sesión como ${nombreDelUsuario}, su perfil tiene permisos de ${tipoDeSesion.toLowerCase()}`;

    // Mas tarde agregar funcion que cambie el aspecto de la pagina en base a que tipo de sesión se inició
    
    document.querySelector("#formInicioSesion").setAttribute("hidden", "hidden");
    document.querySelector("#btnCerrarSesion").removeAttribute("hidden");
}

function CerrarSesion() {
    tipoDeSesion = "Cerrada";
    document.querySelector("#pErrores").innerHTML = `Ha cerrado sesión`;
    document.querySelector("#ingresoNombre").setAttribute("hidden", "hidden");
    document.querySelector("#labelIngresoNombre").setAttribute("hidden", "hidden");
    document.querySelector("#labelIngresoUsername").setAttribute("hidden", "hidden");
    document.querySelector("#ingresoUsername").setAttribute("hidden", "hidden");
    document.querySelector("#ingresoTarjeta").setAttribute("hidden", "hidden");
    document.querySelector("#labelIngresoTarjeta").setAttribute("hidden", "hidden");
    document.querySelector("#formInicioSesion").removeAttribute("hidden");
    document.querySelector("#btnCerrarSesion").setAttribute("hidden", "hidden");
}
document.querySelector("#btnCerrarSesion").addEventListener("click", CerrarSesion);
