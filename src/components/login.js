import { onNavigate } from "../main.js";


// export const home = () => {
//   // const homeDiv = document.createElement('div');
//   const buttonRegister = document.createElement('button');
//   const buttonLogin = document.createElement('button');

//   buttonRegister.textContent = 'Registrate';
//   buttonLogin.textContent = 'Inicia sesión';

//   buttonRegister.addEventListener('click', () => onNavigate('/register'));
//   buttonLogin.addEventListener('click', () => onNavigate('/login'));
//   homeDiv.appendChild(buttonRegister);
//   homeDiv.appendChild(buttonLogin);

//   return homeDiv;

// }

export const login = () => {
  const loginDiv = document.createElement('div');
  loginDiv.textContent = "Bienvenida a VeganBook";
  const buttonLogin = document.createElement('button');
  const buttonRegister = document.createElement('button');

  buttonLogin.textContent = 'Iniciar sesión';
  buttonRegister.textContent = 'Crear cuenta';

  buttonLogin.addEventListener('click', () => onNavigate('/')); //muro red social
  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  loginDiv.appendChild(buttonLogin);
  loginDiv.appendChild(buttonRegister);

  return loginDiv;
};
