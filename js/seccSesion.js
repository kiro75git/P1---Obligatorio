// INSTANCIADO DE SISTEMA

let sistema = new Sistema()

// REGISTRO DE USUARIOS

function Registrar() {
    let mailInput = String(document.querySelector("#ingresoMail").value);
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);
    let tarjetaInput = String(document.querySelector("#ingresoTarjeta").value);
    let codigoCVCinput = Number(document.querySelector("#ingresoCVC").value);
    let nombreInput = String(document.querySelector("#ingresoNombre").value);

    
    if(verificarNombreYapellido(nombreInput)) {
        if(validarTarjeta(tarjetaInput, codigoCVCinput)) {
            if(VerificarNombreUsuario(usernameInput)){
                if(VerificarPass(passInput) === "OK") {
                    sistema.agregarUsuario(mailInput, nombreInput, usernameInput, tarjetaInput, codigoCVCinput, passInput, "cliente", saldoInicialDeUsuarioNuevo);
                    
                    document.querySelector("#pError").innerHTML = `Se registró correctamente! Ahora inice sesión.`
                    document.querySelector("#formRegistro").style.display = "none";
                    console.log(sistema.usuarios);
                }else{
                    // Error con los datos ingresados
                    document.querySelector("#pError").innerHTML = `${VerificarPass(passInput)}`;
                }
            }
        }else {
            console.log("Tarjeta no valida");
        }
    }else {
        document.querySelector("#pError").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        console.log("a");
        document.querySelector("#formRegistro").style.display = "block";
    }
    
}
document.querySelector("#btnRegistro").addEventListener("click", Registrar);

// INGRESO DE USUARIOS

function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value);

    for(let i=0; i < sistema.usuarios.length; i++) {
        if(usernameInput === sistema.usuarios[i].username) {
            console.log("Usuario encontrado");
            if(passInput === sistema.usuarios[i].contrasena) {
      
                // bien
                ExitoAlIniciarSesion(sistema.usuarios[i].tipoUsuario, sistema.usuarios[i].username, sistema.usuarios[i].saldo)
                break;
            }else{
                // mal
                document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo";
            }
        }else{
            document.querySelector("#pError").innerHTML = "Usuario no encontrado, intentelo denuevo";
        }
    } 
}
document.querySelector("#btnInicioSesion").addEventListener("click", Ingresar);

// FUNCIONALIDAD AL INICIAR SESION EXITOSAMENTE

function ExitoAlIniciarSesion(sesionDelUsuario, nombreDelUsuario) {
    tipoDeSesion = sesionDelUsuario;

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Cerrar sesión`;

    usuarioActivo = nombreDelUsuario;

    ActualizarSaldo()

    cambiarSeccion("sectCatalogo");

    document.querySelector("#displayUsuario").innerHTML = `Sesión iniciada como ${nombreDelUsuario}`

    document.querySelector("#infoUsuario").style.display = "block";
}

// FUNCION PARA ACTUALIZAR SALDO DEL USUARIO ( SE UTILIZA EN OTROS LADOS LUEGO DE QUE EL VALOR CAMBIE )

function ActualizarSaldo() {
    for(let i = 0; i < sistema.usuarios.length; i++) {
        if(sistema.usuarios[i].username === usuarioActivo) {
            document.querySelector("#displaySaldo").innerHTML = `Saldo: ${sistema.usuarios[i].saldo}`;
        }
    }
}

// FUNCIONALIDAD DEL CIERRE DE SESION

function CerrarSesion() {
    tipoDeSesion = "cerrada";

    console.log("Se cerró la sesion");

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Iniciar sesión`;

    usuarioActivo = "";

    document.querySelector("#infoUsuario").style.display = "none";
}