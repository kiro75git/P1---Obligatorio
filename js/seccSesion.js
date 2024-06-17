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
    // toma los valores de los campos de texto y numericos
    
    if(verificarNombreYapellido(nombreInput)) {                 // hace uso de las funciones auxiliares para verificar algunos campos
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
            console.log("Tarjeta no valida");           // devuelve codigos de error en base a que parte de la verificacion falló
        }
    }else {
        document.querySelector("#pError").innerHTML = `Ingrese su nombre y apellido separados por un espacio.`;
        console.log("a");
        document.querySelector("#formRegistro").style.display = "block"; // este else se llama en caso de que sea la primera vez que se presiona el boton de registro, en ese caso se muestran los campos de texto, la siguiente vez que se presione el mismo boton se intentará registrar
    }
    
}
document.querySelector("#btnRegistro").addEventListener("click", Registrar);

// INGRESO DE USUARIOS

function Ingresar() {
    let passInput = String(document.querySelector("#ingresoContra").value);
    let usernameInput = String(document.querySelector("#ingresoUsername").value).toLowerCase();

    for(let i=0; i < sistema.usuarios.length; i++) {
        if(usernameInput === String(sistema.usuarios[i].username).toLowerCase()) {
            console.log("Usuario encontrado");
            if(passInput === sistema.usuarios[i].contrasena) {
      
                // bien
                ExitoAlIniciarSesion(sistema.usuarios[i].tipoUsuario, sistema.usuarios[i].username, sistema.usuarios[i].saldo)
                break; // si se loguea con exito, se llama a la funcion para iniciar sesión
            }else{
                // mal
                document.querySelector("#pError").innerHTML = "Las credenciales no coinciden";
            }
        }else{
            document.querySelector("#pError").innerHTML = "Usuario no encontrado";
        }
    } 
}
document.querySelector("#btnInicioSesion").addEventListener("click", Ingresar);

// FUNCIONALIDAD AL INICIAR SESION EXITOSAMENTE

function ExitoAlIniciarSesion(sesionDelUsuario, nombreDelUsuario) {
    tipoDeSesion = sesionDelUsuario; // el tipo de sesion se utilizará para decidir que mostrarle al usuario

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Cerrar sesión`;

    usuarioActivo = nombreDelUsuario; // se declara el usuario activo, esta variable se utilizará en muchos otros lados de la página, y solo se limpiará al cerrar sesión

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
    tipoDeSesion = "cerrada"; // se limpia el tipo de sesion

    console.log("Se cerró la sesion");

    mostrarElementosOcultos(tipoDeSesion);

    document.querySelector("#textoNavSesion").innerHTML = `Iniciar sesión`;

    usuarioActivo = ""; // se limpia el usuario activo

    document.querySelector("#infoUsuario").style.display = "none";
}