import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { createUser } from "../firebase";

export const register = (onNavigate) => {
  const divRegister = document.createElement("div");
  divRegister.className = "div-register";

  const divPinkRegister = document.createElement("div");
  divPinkRegister.className = "div-pink-register";
  divRegister.appendChild(divPinkRegister);

  const formRegister = document.createElement("form");
  formRegister.className = "form-register";
  divRegister.appendChild(formRegister);

  const imageRegister = document.createElement("img");
  imageRegister.className = "img-logo";
  imageRegister.src = "./images/LogoVBB.png";
  imageRegister.alt = "logo de Vegan Book";
  formRegister.appendChild(imageRegister);

  const borderContainerRegister = document.createElement("div");
  borderContainerRegister.className = "border-container-register";
  formRegister.appendChild(borderContainerRegister);

  const title = document.createElement("h2");
  title.textContent = "¡Regístrate!";
  borderContainerRegister.appendChild(title);

  const inputName = document.createElement("input");
  inputName.className = "input-name";
  inputName.type = "text";
  inputName.placeholder = "Nombre";
  inputName.value = "";
  borderContainerRegister.appendChild(inputName);

  const inputLastName = document.createElement("input");
  inputLastName.className = "input-lastname";
  inputLastName.type = "text";
  inputLastName.placeholder = "Apellidos";
  inputLastName.value = "";
  borderContainerRegister.appendChild(inputLastName);

  const inputEmail = document.createElement("input");
  inputEmail.className = "input-email";
  inputEmail.id = "email";
  inputEmail.type = "text";
  inputEmail.placeholder = "Correo electrónico";
  inputEmail.value = "";
  borderContainerRegister.appendChild(inputEmail);

  const inputPassword = document.createElement("input");
  inputPassword.className = "input-password";
  inputPassword.id = "password";
  inputPassword.type = "password";
  inputPassword.placeholder = "Contraseña";
  inputPassword.value = "";
  borderContainerRegister.appendChild(inputPassword);

  const divRemember = document.createElement("div");
  divRemember.className = "div-remember";
  borderContainerRegister.appendChild(divRemember);

  const inputRemember = document.createElement("input");
  inputRemember.className = "input-remember";
  inputRemember.type = "checkbox";
  divRemember.appendChild(inputRemember);

  const textRemember = document.createElement("p");
  textRemember.className = "text-remember";
  textRemember.textContent = "Recordar";
  divRemember.appendChild(textRemember);

  const forgetPassword = document.createElement("p");
  forgetPassword.className = "forget-password";
  forgetPassword.textContent = "¿Olvidaste la contraseña?";
  divRemember.appendChild(forgetPassword);

  const buttonCreateAccount = document.createElement("button");
  buttonCreateAccount.className = "button-create-account";
  buttonCreateAccount.textContent = "Crear cuenta";
  buttonCreateAccount.type = "submit";
  buttonCreateAccount.addEventListener("click", (e) => {
    e.preventDefault();

    // console.log('im here');
    createUser(inputEmail.value, inputPassword.value);
    console.log(inputEmail.value);
    console.log(inputPassword.value);
    firebase.auth()
      .createUserWithEmailAndPassword(inputEmail, inputPassword)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
        // ..
      });

    //   .then((response) => { console.log(response) })
    //   .catch(console.log);
  });

  borderContainerRegister.appendChild(buttonCreateAccount);

  const buttonGoogle = document.createElement("button");
  buttonGoogle.className = "button-google";
  buttonGoogle.textContent = "Continuar con Google";
  buttonGoogle.type = "submit";
  buttonGoogle.addEventListener("click", () => onNavigate("/")); // muro red social
  const imgGoogle = document.createElement("img");
  imgGoogle.className = "img-google";
  imgGoogle.src = "./images/google.png";
  imgGoogle.alt = "imagen Google";
  buttonGoogle.appendChild(imgGoogle);
  borderContainerRegister.appendChild(buttonGoogle);

  const hr = document.createElement("hr");
  borderContainerRegister.appendChild(hr);

  const optionalText = document.createElement("h4");
  optionalText.textContent = "¿Ya tienes cuenta?";
  borderContainerRegister.appendChild(optionalText);

  const buttonLoginBack = document.createElement("button");
  buttonLoginBack.className = "button-login-back";
  buttonLoginBack.textContent = "Iniciar sesión";

  buttonLoginBack.addEventListener("click", () => onNavigate("/"));
  borderContainerRegister.appendChild(buttonLoginBack);

  return divRegister;
};
