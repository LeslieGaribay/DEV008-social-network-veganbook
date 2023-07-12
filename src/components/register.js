// import { GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
// import { auth } from "./firebase.js";
import { GoogleAuthProvider } from 'firebase/auth';
import { createUser, signInGoogle } from '../lib/firebase';

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

  const divError = document.createElement('div');
  divError.className = 'div-error';
  borderContainerRegister.appendChild(divError);

  const errorText = document.createElement('p');
  errorText.classList.add('error-text-register', 'error-text-hidden');
  divError.appendChild(errorText);

  buttonCreateAccount.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;

    errorText.textContent = '';
    errorText.classList.add('error-text-hidden');

    if (email === '' && password === '') {
      errorText.textContent = 'Ups 🙈, ingresa un correo y una contraseña';
      errorText.classList.remove('error-text-hidden');
      return;
    }

    if (email !== '' && password === '') {
      errorText.textContent = 'Ups 🙉, ingresa una contraseña';
      errorText.classList.remove('error-text-hidden');
      return;
    }

    if (email === '' && password !== '') {
      errorText.textContent = 'Ups 🙉, ingresa un correo electrónico';
      errorText.classList.remove('error-text-hidden');
      return;
    }

    if (email.length === 0 || !email.includes('@') || !email.includes('.')) {
      errorText.textContent = 'Ups 🙉, ingresa un correo electrónico válido';
      errorText.classList.remove('error-text-hidden');
      return;
    }

    if (password.length < 6) {
      errorText.textContent = 'Ups 🙉, la contraseña debe tener al menos 6 caracteres';
      errorText.classList.remove('error-text-hidden');
      return;
    }

    errorText.textContent = '';
    errorText.classList.add('error-text-hidden');

    createUser(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        localStorage.setItem('Usuario', JSON.stringify(user));
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        switch (errorCode) {
          case 'auth/email-already-exists':
          case 'auth/email-already-in-use':
            errorText.textContent = '⚡ El correo electrónico ya está registrado ⚡';
            errorText.classList.remove('error-text-hidden');
            break;
          case 'auth/invalid-email':
            errorText.textContent = '⚡ El correo ingresado no es válido ⚡';
            break;
          default:
            errorText.textContent = errorMessage;
            errorText.classList.add('error-text-hidden');
        }
      });
  });

  borderContainerRegister.appendChild(buttonCreateAccount);

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button-google';
  buttonGoogle.id = 'button-google-register';
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.type = 'submit';
  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle()
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        const user = result.user;
        console.log(user);
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/internal-error':
            errorText.textContent = '⚡ Error interno ⚡';
            break;
          default:
            errorText.textContent = errorMessage;
            errorText.classList.add('error-text-hidden');
        }
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
