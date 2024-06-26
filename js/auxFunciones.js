//funcion para verificar contraseña
function VerificarPass(pass) {
    let error = "ninguno";
    let password = pass;
    let hasNum = false;
    if(password.length >= 5) {
            for(let i = 0; i < password.length; i++) {
                    switch (password.charAt(i)) { // verifica que tenga un numero
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
                                    if(i === 0) { // verifica que no empiece por un numero
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
            for(let i = 0; i < password.length; i++) { // verifica que no tenga espacios, y que tenga minusculas y mayusculas
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

    if(error === "longitud") { // dependiendo del error que se devolvió, se le asigna un texto de error
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
function validarTarjeta(nroTarjeta, codigoCVC) {
    // cvc

    codigoValido = false;

    if(String(codigoCVC).length === 3) {
        codigoValido = true;  //si la clave es de 3 digitos devuelve true
    }

    //funcion para verificar tarjeta mediante metodo de Luhn:
    
    let dev = false;
    let contadorGuiones = 0;
        
    for(let r = 0; r < nroTarjeta.length; r++){
        let caracterPos =  nroTarjeta.charAt(r);
            
        if(caracterPos === "-"){
            contadorGuiones++;
        }
    }

    let tarjetaDepurada = ""; // crea una tarjeta depurada borrando todos los caracteres no numericos (-, $, .)
    for(let i = 0; i < nroTarjeta.length; i++) {
        let numero = Number(nroTarjeta.charAt(i));
        if(!isNaN(numero)) {
            tarjetaDepurada += String(numero);
        }
    }

    if (contadorGuiones === 3){ // verifica que la tarjeta tenga el formato correcto
        let acumulador = 0;
        let digitoVerificar = tarjetaDepurada.charAt(tarjetaDepurada.length - 1);
        
        let cont = 0;
        for (let i = tarjetaDepurada.length - 2; i >= 0; i--) {
            let valorAcumular = Number(tarjetaDepurada.charAt(i));
            if (cont % 2 === 0) {
                let duplicado = Number(tarjetaDepurada.charAt(i)) * 2;
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
            dev = true; // si el digito final de la tarjeta se verifica contra luhn, devuelve true, de lo contrario, devuelve false
        }
    
    }else {
        document.querySelector("#pError").innerHTML = "ocurrió un error al ingresar los datos"
    }
    if(dev && codigoValido) {
        return true;
    }else {
        return false;
    }
}

//verificar ingreso nombre y apellido
function verificarNombreYapellido(nombreUsuario){
    let verificarEspacio = false;  
    let hayEspacios = 0;    //contador de espacios
    for(let i = 0; i < nombreUsuario.length; i++){
        let valorCaracter = nombreUsuario.charAt(i);    //bucle que recorre el string de usuario
        
        if(valorCaracter === " "){
            hayEspacios++;              //si se encuentra un espacio el contador aumenta
        }
    }
    
    if(hayEspacios > 0){
        verificarEspacio = true;        //si hay al menos un espacio la variable cambia a true, confirmando asi que cumple el requisito
    } else {
        document.querySelector("#pError").innerHTML = "Las credenciales no coinciden, intentelo denuevo"
    }
    
    return verificarEspacio;   //devuelve el resultado de la funcion (true o false)
}

//funcion para volver case insensitive el username ingresado y que verifique si ya existe
function VerificarNombreUsuario(nombreUsuarioIng){
    let usuarioValido = true;
    let usuarioMin = nombreUsuarioIng.toLowerCase();        //convierte al string en minusculas para volverlo case insensitive
    for(let i = 0; i < sistema.usuarios.length; i++){

        if(usuarioMin === sistema.usuarios[i].username){    //se recorre el string e itera sobre la clase sistemas, si el string ya esta registado se queda en true
            usuarioValido = false;
            console.log("el nombre de usuario elegido ya existe");
        } else {
            console.log("nombre de usuario valido");
        }
    }
    return usuarioValido;   //devuelve el resultado
}