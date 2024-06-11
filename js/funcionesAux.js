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

//verificar codigo de seguridad (CVC)
function VerificarCVC(codigoCVC){

    codigoValido = false;

    if(codigoCVC.length === 3){
        for (let i = 0; i < codigoCVC.length; i++){
            let valorCaracter = codigoCVC.charAt(i);

            if(valorCaracter >= "0" && valorCaracter <= "9"){

                codigoValido = true;


            } else {
                //error
            }
        }
    } 
    return codigoValido;
}

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