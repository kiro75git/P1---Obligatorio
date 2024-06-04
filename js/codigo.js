//usuarios precargados

class Usuarios {
    constructor(correoIng, nombreIng, contrasenaIng,  tipoUsuarioIng) {
        this.nombre = nombreIng;
        this.correo = correoIng;
        this.contrasena = contrasenaIng;
        this.tipoUsuario = tipoUsuarioIng;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [
            new Usuarios("lucas@gmail", "Lucas", "Lucas0000", "ad"),
            new Usuarios("maria@gmail", "Maria", "Maria0000", "cl")
        ];
    }

    agregarUsuario(mail, nombre, pass, tipo) {
        let objUsuario = new Usuarios(mail, nombre, pass, tipo);
        this.usuarios.push(objUsuario);
    }
}

//registro de usuarios

let sistema = new Sistema()

function Registrar() {
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let passInput = String(document.querySelector("#ingresoContra").value);
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    
    if(verificarNombreYapellido(nombreInput)) {
        if(VerificarPass(passInput) === "OK") {
            sistema.agregarUsuario(mailInput, nombreInput, passInput, "cl");
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
}
