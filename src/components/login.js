import { GoogleAuthProvider } from 'firebase/auth';
import { signInUser, signInGoogle } from '../lib/firebase';

export const login = (onNavigate) => {
  const divLogin = document.createElement('div');
  divLogin.className = 'div-login';

  const divPinkLogin = document.createElement('div');
  divPinkLogin.className = 'div-pink-login';
  divLogin.appendChild(divPinkLogin);

  const formLogin = document.createElement('div');
  formLogin.className = 'form-login';
  divLogin.appendChild(formLogin);

  const imageLoginPeople = document.createElement('img');
  imageLoginPeople.className = 'img-people';
  imageLoginPeople.src = './images/image-login.png';
  imageLoginPeople.alt = 'Vegan Book picture';
  divPinkLogin.appendChild(imageLoginPeople);

  const imageLogin = document.createElement('img');
  imageLogin.className = 'img-logo';
  imageLogin.src = './images/LogoVBB.png';
  imageLogin.alt = 'logo de Vegan Book';
  formLogin.appendChild(imageLogin);

  const borderContainerLogin = document.createElement('div');
  borderContainerLogin.className = 'border-container-login';
  formLogin.appendChild(borderContainerLogin);

  const title = document.createElement('h2');
  title.textContent = 'Ingresa a tu cuenta';
  borderContainerLogin.appendChild(title);

  const inputEmailLogin = document.createElement('input');
  inputEmailLogin.className = 'input-email';
  inputEmailLogin.id = 'user-email';
  inputEmailLogin.type = 'text';
  inputEmailLogin.placeholder = 'Email';
  inputEmailLogin.value = '';
  borderContainerLogin.appendChild(inputEmailLogin);

  const inputPasswordLogin = document.createElement('input');
  inputPasswordLogin.className = 'input-password';
  inputPasswordLogin.type = 'password';
  inputPasswordLogin.id = 'user-password';
  inputPasswordLogin.placeholder = 'Contraseña';
  inputPasswordLogin.value = '';
  borderContainerLogin.appendChild(inputPasswordLogin);

  const divRemember = document.createElement('div');
  divRemember.className = 'div-remember';
  borderContainerLogin.appendChild(divRemember);

  const inputRemember = document.createElement('input');
  inputRemember.className = 'input-remember';
  inputRemember.type = 'checkbox';
  divRemember.appendChild(inputRemember);

  const textRemember = document.createElement('p');
  textRemember.className = 'text-remember';
  textRemember.textContent = 'Recordar';
  divRemember.appendChild(textRemember);

  const forgetPassword = document.createElement('p');
  forgetPassword.className = 'forget-password';
  forgetPassword.textContent = '¿Olvidaste la contraseña?';
  divRemember.appendChild(forgetPassword);

  const buttonLogin = document.createElement('button');
  buttonLogin.className = 'button-login';
  buttonLogin.textContent = 'Iniciar sesión';
  buttonLogin.type = 'submit';

  const errorText = document.createElement('p');
  errorText.className = 'error-text';
  borderContainerLogin.appendChild(errorText);

  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmailLogin.value;
    const password = inputPasswordLogin.value;

    errorText.textContent = '';

    if (email === '' && password === '') {
      errorText.textContent = 'Ups 🙈, ingresa un correo y una contraseña';
      return;
    }

    if (email !== '' && password === '') {
      errorText.textContent = 'Ups 🙉, ingresa una contraseña';
      return;
    }

    if (email === '' && password !== '') {
      errorText.textContent = 'Ups 🙉, ingresa un correo electrónico';
      return;
    }

    if (email.length === 0 || !email.includes('@') || !email.includes('.')) {
      errorText.textContent = 'Ups 🙉, ingresa un correo electrónico válido';
      return;
    }

    if (password.length < 6) {
      errorText.textContent = 'Ups 🙉, la contraseña debe tener al menos 6 caracteres';
      return;
    }

    signInUser(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('Usuario', JSON.stringify(user));
        console.log(user);
        onNavigate('/timeline');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/wrong-password':
            errorText.textContent = '⚡ La contraseña es incorrecta ⚡';
            break;
          case 'auth/invalid-email':
            errorText.textContent = '⚡ El correo ingresado no es válido ⚡';
            break;
          case 'auth/user-not-found':
            errorText.textContent = '⚡ Usuario y/o contraseña incorrecta ⚡';
            break;
          case 'auth/too-many-requests':
            errorText.textContent = '⚡ Superaste el número de intentos permitidos, vuelve a intentarlo luego ⚡';
            break;
          default:
            errorText.textContent = errorMessage;
        }
      });
  });

  borderContainerLogin.appendChild(buttonLogin);

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button-google';
  buttonGoogle.id = 'button-google-login';
  buttonGoogle.textContent = 'Iniciar sesión con Google';
  buttonGoogle.type = 'submit';
  borderContainerLogin.appendChild(buttonGoogle);

  buttonGoogle.addEventListener('click', (e) => {
    e.preventDefault();
    signInGoogle()
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const user = result.user;
        localStorage.setItem('Usuario', JSON.stringify(user));
        // IdP data available using getAdditionalUserInfo(result)
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

  const hr = document.createElement('hr');
  borderContainerLogin.appendChild(hr);

  const optionalText = document.createElement('h4');
  optionalText.textContent = '¿Eres nuevo en VeganBook?';
  borderContainerLogin.appendChild(optionalText);

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-register';
  buttonRegister.textContent = '¡Regístrate!';
  buttonRegister.type = 'submit';
  borderContainerLogin.appendChild(buttonRegister);

  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  return divLogin;
};
