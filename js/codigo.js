//usuarios precargados

class Usuarios {
    constructor(nombreIng, correoIng, contrasenaIng,  tipoUsuarioIng) {
        this.nombre = nombreIng;
        this.correo = correoIng;
        this.contrasena = contrasenaIng;
        this.tipoUsuario = tipoUsuarioIng;
    }
}

class Sistema {
    constructor() {
        this.usuarios = [
            new Usuarios("lucas@gmail", "Lucas", "123", "ad"),
            new Usuarios("maria@gmail", "Maria", "435", "cl")
        ];
    }

    agregarUsuario(mail, nombre, pass, tipo) {
        let objUsuario = new Usuarios(mail, pass, nombre, tipo);
        this.usuarios.push(objUsuario);
    }
}

//registro de usuarios

let sistema = new Sistema()

function Registrar() {
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let passInput = String(document.querySelector("#ingresoContra").value);
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    if(VerificarPass(passInput) === "OK") {
        if(verificarNombreYapellido(nombreInput)) {
            sistema.agregarUsuario(mailInput, nombreInput, passInput, "cliente");
            // new Usuarios (nombreIng, edadIng, nacionalidadIng);
            // Sistema.push(usuarios);
            // console.log();
            
            document.querySelector("#pErrores").innerHTML = `Correcto!`
            console.log(sistema.usuarios);
        }else{
            document.querySelector("#pErrores").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        }
    }else{
        // Error con los datos ingresados
        document.querySelector("#pErrores").innerHTML = `${VerificarPass(passInput)}`;
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

let tipoDeSesion = 'cerrada';
function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let tipoDeUsuario = String(document.querySelector("#slcTipoUsuario").value);

    let encontrado = false;

    for(let i=0; i < objUsuario.length; i++) {
        if(mailInput === objUsuario[i[0]]) {
            console.log("Usuario encontrado");
            encontrado = true;
            if(passInput === objUsuario[i[2]] && tipoDeUsuario === objUsuario[i[3]]) {
                // bien
                tipoDeSesion = tipoDeUsuario;
                console.log(tipoDeSesion);
            }else{
                // mal
                document.querySelector("#pErrores").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
            }
        }
    } 

    

    
}
document.querySelector("#btnInicioSesion").addEventListener("click", Ingresar);

//funcion para verificar nombre y apellido

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




