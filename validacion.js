//Haz tú validación en javascript acá

const camposDeFormulario = document.getElementsByClassName("formcontato__input");
const textArea = document.getElementsByClassName("formcontato__textarea");
const formulario = document.getElementById("form");

const tiposError = [
    "valueMissing",
    "tooLong",
    "customError"
  ];

const mensajes = {
    nombre: {
        valueMissing: "El campo nombre no puede estar vacío.",
        tooLong: "El maximo de caracteres es 50.",
    },
    email : {
        valueMissing: "El campo nombre no puede estar vacío.",
        customError: "No es un correo valido",
    },
    asunto:  {
        valueMissing: "El campo asunto no puede estar vacío.",
        tooLong: "El maximo de caracteres es 50.",
    },
    mensaje:  {
        valueMissing: "El campo mensaje no puede estar vacío.",
        tooLong: "El maximo de caracteres es 50.",
    }
}


function checkEmail(campo){
    const email = campo.value
    var re = /\S+@\S+\.\S+/;
    if(campo.value.length < 1){
        return true
    }
    if(!re.test(email)){
        campo.setCustomValidity('No es un email valido')
    }
}

function verificarCampo(campo){
    campo.setCustomValidity("");
    let mensaje = "";

    if(campo.name == "email"){
        checkEmail(campo);
    }

    tiposError.forEach((error) => {
        if (campo.validity[error]) {
            mensaje = mensajes[campo.name][error];
        }
    });
    const mensajeError = campo.parentNode.querySelector(".mensaje-error");
    const validarInputCheck = campo.checkValidity();

    console.log(validarInputCheck);
    if (!validarInputCheck) {
        mensajeError.textContent = mensaje;
    } else {
        mensajeError.textContent = "";
    }
}

camposDeFormulario.nombre.addEventListener("blur", () => verificarCampo(camposDeFormulario.nombre));
camposDeFormulario.nombre.addEventListener("invalid", (evento) => evento.preventDefault());

camposDeFormulario.email.addEventListener("blur", () => verificarCampo(camposDeFormulario.email));
camposDeFormulario.email.addEventListener("invalid", (evento) => evento.preventDefault());


camposDeFormulario.asunto.addEventListener("blur", () => verificarCampo(camposDeFormulario.asunto));
camposDeFormulario.asunto.addEventListener("invalid", (evento) => evento.preventDefault());

textArea.mensaje.addEventListener("blur", () => verificarCampo(textArea.mensaje));
textArea.mensaje.addEventListener("invalid", (evento) => evento.preventDefault());


formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const listaRespuestas = {
      nombre: e.target.elements["nombre"].value,
      //email: e.target.elements["email"].value,
      //identificacion: e.target.elements["identificacion"].value,
      //cuil: e.target.elements["cuil"].value,
      // fecha_nacimiento: e.target.elements["fecha_nacimiento"].value,
    };
    localStorage.setItem("registro", JSON.stringify(listaRespuestas));
    window.location.href = "./abrir-cuenta-form-2.html";
  });

