import { signIn } from "../firebase";

export const login = (onNavigate) => {
  const divLogin = document.createElement("div");
  divLogin.className = "div-login";

  const divPinkLogin = document.createElement("div");
  divPinkLogin.className = "div-pink-login";
  divLogin.appendChild(divPinkLogin);

  const formLogin = document.createElement("div");
  formLogin.className = "form-login";
  divLogin.appendChild(formLogin);

  const imageLoginPeople = document.createElement('img');
  imageLoginPeople.className = 'img-people';
  imageLoginPeople.src = './images/image-login.png';
  imageLoginPeople.alt = 'Vegan Book picture';
  divLogin.appendChild(imageLoginPeople);

  const imageLogin = document.createElement("img");
  imageLogin.className = "img-logo";
  imageLogin.src = "./images/LogoVBB.png";
  imageLogin.alt = "logo de Vegan Book";
  formLogin.appendChild(imageLogin);

  const borderContainerLogin = document.createElement("div");
  borderContainerLogin.className = "border-container-login";
  formLogin.appendChild(borderContainerLogin);

  const title = document.createElement("h2");
  title.textContent = "Ingresa a tu cuenta";
  borderContainerLogin.appendChild(title);

  const inputEmailLogin = document.createElement("input");
  inputEmailLogin.className = "input-email";
  inputEmailLogin.id = "user-email";
  inputEmailLogin.type = "text";
  inputEmailLogin.placeholder = "Email";
  inputEmailLogin.value = "";
  borderContainerLogin.appendChild(inputEmailLogin);

  const inputPasswordLogin = document.createElement("input");
  inputPasswordLogin.className = "input-password";
  inputPasswordLogin.type = "password";
  inputPasswordLogin.id = "user-password";
  inputPasswordLogin.placeholder = "Contraseña";
  inputPasswordLogin.value = "";
  borderContainerLogin.appendChild(inputPasswordLogin);

  const divRemember = document.createElement("div");
  divRemember.className = "div-remember";
  borderContainerLogin.appendChild(divRemember);

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

  const buttonLogin = document.createElement("button");
  buttonLogin.className = "button-login";
  buttonLogin.textContent = "Iniciar sesión";
  buttonLogin.type = "submit";
  buttonLogin.addEventListener("click", (e) => {
    e.preventDefault();

    signIn(inputEmailLogin.value, inputPasswordLogin.value);
    console.log(inputEmailLogin.value);
    console.log(inputPasswordLogin.value);

    firebase.auth()
      .signInWithEmailAndPassword(inputEmailLogin, inputPasswordLogin)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        // ...
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
  });

  borderContainerLogin.appendChild(buttonLogin);

  // buttonLogin.addEventListener('click', () => onNavigate('/timeline')); // muro red social

  const buttonGoogle = document.createElement("button");
  buttonGoogle.className = "button-google";
  buttonGoogle.textContent = "Iniciar sesión con Google";
  buttonGoogle.type = "submit";
  borderContainerLogin.appendChild(buttonGoogle);

  const imgGoogle = document.createElement("img");
  imgGoogle.className = "img-google";
  imgGoogle.src = "./images/google.png";
  imgGoogle.alt = "imagen Google";
  buttonGoogle.appendChild(imgGoogle);

  buttonLogin.addEventListener("click", () => onNavigate("/")); // autentificación con google

  const hr = document.createElement("hr");
  borderContainerLogin.appendChild(hr);

  const optionalText = document.createElement("h4");
  optionalText.textContent = "¿Eres nuevo en VeganBook?";
  borderContainerLogin.appendChild(optionalText);

  const buttonRegister = document.createElement("button");
  buttonRegister.className = "button-register";
  buttonRegister.textContent = "¡Regístrate!";
  buttonRegister.type = "submit";
  borderContainerLogin.appendChild(buttonRegister);

  buttonRegister.addEventListener("click", () => onNavigate("/register"));

  return divLogin;
};
