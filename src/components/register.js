// import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { auth } from "./firebase.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { createUser, signInGoogle } from '../firebase';

const provider = new GoogleAuthProvider();

export const register = (onNavigate) => {
  const divRegister = document.createElement('div');
  divRegister.className = 'div-register';

  const divPinkRegister = document.createElement('div');
  divPinkRegister.className = 'div-pink-register';
  divRegister.appendChild(divPinkRegister);

  const formRegister = document.createElement('form');
  formRegister.className = 'form-register';
  divRegister.appendChild(formRegister);

  const imageRegisterPeople = document.createElement('img');
  imageRegisterPeople.className = 'img-people-register';
  imageRegisterPeople.src = './images/image-register.png';
  imageRegisterPeople.alt = 'Vegan Book picture';
  divPinkRegister.appendChild(imageRegisterPeople);

  const imageRegister = document.createElement('img');
  imageRegister.className = 'img-logo-register';
  imageRegister.src = './images/LogoVBB.png';
  imageRegister.alt = 'logo de Vegan Book';
  formRegister.appendChild(imageRegister);

  const borderContainerRegister = document.createElement('div');
  borderContainerRegister.className = 'border-container-register';
  formRegister.appendChild(borderContainerRegister);

  const title = document.createElement('h2');
  title.textContent = '¡Regístrate!';
  borderContainerRegister.appendChild(title);

  const divUserName = document.createElement('div');
  divUserName.className = 'div-username';
  borderContainerRegister.appendChild(divUserName);

  const inputName = document.createElement('input');
  inputName.className = 'input-name';
  inputName.type = 'text';
  inputName.placeholder = 'Nombre';
  inputName.value = '';
  divUserName.appendChild(inputName);

  const inputLastName = document.createElement('input');
  inputLastName.className = 'input-lastname';
  inputLastName.type = 'text';
  inputLastName.placeholder = 'Apellido';
  inputLastName.value = '';
  divUserName.appendChild(inputLastName);

  const inputEmail = document.createElement('input');
  inputEmail.className = 'input-email';
  inputEmail.id = 'email';
  inputEmail.type = 'text';
  inputEmail.placeholder = 'Correo electrónico';
  inputEmail.value = '';
  borderContainerRegister.appendChild(inputEmail);

  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.id = 'password';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.value = '';
  borderContainerRegister.appendChild(inputPassword);

  const buttonCreateAccount = document.createElement('button');
  buttonCreateAccount.className = 'button-create-account';
  buttonCreateAccount.textContent = 'Crear cuenta';
  buttonCreateAccount.type = 'submit';

  const errorText = document.createElement('p');
  errorText.className = 'error-text-register';
  borderContainerRegister.appendChild(errorText);

  buttonCreateAccount.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;

    errorText.textContent = '';

    if (email.length === 0 || !email.includes('@') || !email.includes('.')) {
      errorText.textContent = 'Por favor ingresa un correo electrónico válido.';
      return;
    }

    if (password.length !== 6) {
      errorText.textContent = 'La contraseña debe tener 6 caracteres.';
      return;
    }

    // console.log('im here');
    // createUser(inputEmail.value, inputPassword.value);
    createUser(email, password);
    firebase
      .auth()
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
        errorText.textContent = errorMessage;
      });

    //   .then((response) => { console.log(response) })
    //   .catch(console.log);
  });

  borderContainerRegister.appendChild(buttonCreateAccount);

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button-google';
  buttonGoogle.id = 'button-google-register';
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.type = 'submit';
  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        console.log(user);
        onNavigate('/timeline');
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  });
  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'img-google';
  imgGoogle.src = './images/google.png';
  imgGoogle.alt = 'imagen Google';
  buttonGoogle.appendChild(imgGoogle);
  borderContainerRegister.appendChild(buttonGoogle);

  const hr = document.createElement('hr');
  borderContainerRegister.appendChild(hr);

  const optionalText = document.createElement('h4');
  optionalText.textContent = '¿Ya tienes cuenta?';
  borderContainerRegister.appendChild(optionalText);

  const buttonLoginBack = document.createElement('button');
  buttonLoginBack.className = 'button-login-back';
  buttonLoginBack.textContent = 'Iniciar sesión';

  buttonLoginBack.addEventListener('click', () => onNavigate('/'));
  borderContainerRegister.appendChild(buttonLoginBack);

  return divRegister;
};
