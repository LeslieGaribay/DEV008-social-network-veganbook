export const login = (onNavigate) => {
  const divLogin = document.createElement('div');
  divLogin.className = 'div-login';

  const formLogin = document.createElement('form');
  formLogin.className = 'form-login';

  const imageLogin = document.createElement('img');
  imageLogin.className = 'img-login';
  imageLogin.src = './images/LogoVBB.png';
  imageLogin.alt = 'logo de Vegan Book';
  formLogin.appendChild(imageLogin);

  const title = document.createElement('h2');
  title.textContent = 'Ingrese a su cuenta';
  formLogin.appendChild(title);

  const email = document.createElement('input');
  email.className = 'input-email';
  email.type = 'text';
  email.placeholder = 'Ingresa tu email';
  email.value = '';
  formLogin.appendChild(email);

  const password = document.createElement('input');
  password.className = 'input-password';
  password.type = 'password';
  password.placeholder = 'Contraseña';
  password.value = '';
  formLogin.appendChild(password);

  const buttonLogin = document.createElement('button');
  buttonLogin.className = 'button-login';
  buttonLogin.textContent = 'Iniciar Sesión';
  buttonLogin.type = 'submit';
  formLogin.appendChild(buttonLogin);

  buttonLogin.addEventListener('click', () => onNavigate('/')); //muro red social

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button-google';
  buttonGoogle.textContent = 'Iniciar Sesión con Google';
  buttonGoogle.type = 'submit';
  formLogin.appendChild(buttonGoogle);

  buttonLogin.addEventListener('click', () => onNavigate('/')); //muro red social

  const hr = document.createElement('hr');
  formLogin.appendChild(hr);

  const optionalText = document.createElement('h3');
  optionalText.textContent = '¿Eres nuevo en VeganBook?';
  formLogin.appendChild(optionalText);

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-register';
  buttonRegister.textContent = '¡Registrate!';
  buttonRegister.type = 'submit';
  formLogin.appendChild(buttonRegister);

  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  return formLogin;
};
