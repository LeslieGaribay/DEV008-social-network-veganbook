import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { createUser } from '../firebase';

export const register = (onNavigate) => {
  const divRegister = document.createElement('div');
  divRegister.className = 'div-register';

  const formRegister = document.createElement('form');
  formRegister.className = 'form-register';

  const imageRegister = document.createElement('img');
  imageRegister.className = 'img-logo';
  imageRegister.src = './images/LogoVBB.png';
  imageRegister.alt = 'logo de Vegan Book';
  formRegister.appendChild(imageRegister);

  const title = document.createElement('h2');
  title.textContent = '¡Regístrate!';
  formRegister.appendChild(title);

  const inputName = document.createElement('input');
  inputName.className = 'input-name';
  inputName.type = 'text';
  inputName.placeholder = 'Nombre';
  inputName.value = '';
  formRegister.appendChild(inputName);

  const inputLastName = document.createElement('input');
  inputLastName.className = 'input-lastname';
  inputLastName.type = 'text';
  inputLastName.placeholder = 'Apellido';
  inputLastName.value = '';
  formRegister.appendChild(inputLastName);

  const inputEmail = document.createElement('input');
  inputEmail.className = 'input-email';
  inputEmail.type = 'text';
  inputEmail.placeholder = 'Ingresa tu correo electrónico';
  inputEmail.value = '';
  formRegister.appendChild(inputEmail);

  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.value = '';
  formRegister.appendChild(inputPassword);

  const buttonCreateAccount = document.createElement('button');
  buttonCreateAccount.className = 'button-create-account';
  buttonCreateAccount.textContent = 'Crear cuenta';
  buttonCreateAccount.type = 'submit';
  buttonCreateAccount.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('im here');
    createUser(inputEmail.value, inputPassword.value)
      .then((response) => { console.log(response) })
      .catch(console.log);
  });

  formRegister.appendChild(buttonCreateAccount);

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button-google';
  buttonGoogle.textContent = 'Continuar con Google';
  buttonGoogle.type = 'submit';
  buttonGoogle.addEventListener('click', () => onNavigate('/')); // muro red social
  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'img-google';
  imgGoogle.src = './images/google.png';
  imgGoogle.alt = 'imagen Google';
  buttonGoogle.appendChild(imgGoogle);
  formRegister.appendChild(buttonGoogle);

  const hr = document.createElement('hr');
  formRegister.appendChild(hr);

  const optionalText = document.createElement('h4');
  optionalText.textContent = '¿Ya tienes cuenta?';
  formRegister.appendChild(optionalText);

  const buttonLoginBack = document.createElement('button');
  buttonLoginBack.className = 'button-login-back';
  buttonLoginBack.textContent = 'Iniciar sesión';

  buttonLoginBack.addEventListener('click', () => onNavigate('/'));
  formRegister.appendChild(buttonLoginBack);

  return formRegister;
};
