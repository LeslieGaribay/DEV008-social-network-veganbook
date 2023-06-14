import { onNavigate } from "../main.js";
export const register = () => {
  const loginDiv = document.createElement('div');
  loginDiv.textContent = "Bienvenida al Registro";
  const buttonHome = document.createElement('button');

  buttonHome.textContent = 'Regresar a Login';

  buttonHome.addEventListener('click', () => onNavigate('/'));
  loginDiv.appendChild(buttonHome);

  return loginDiv;
}