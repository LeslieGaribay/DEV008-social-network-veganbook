export const login = (onNavigate) => {
  const divLogin = document.createElement('div');
  divLogin.className = 'div-login';

  const divPink = document.createElement('div');
  divPink.className = 'div-pink';
  divLogin.appendChild(divPink);

  const formLogin = document.createElement('div');
  divLogin.className = 'form-login';
  divLogin.appendChild(formLogin);

  const imageLogin = document.createElement('img');
  imageLogin.className = 'img-logo';
  imageLogin.src = './images/LogoVBB.png';
  imageLogin.alt = 'logo de Vegan Book';
  formLogin.appendChild(imageLogin);

  const title = document.createElement('h2');
  title.textContent = 'Ingrese a su cuenta';
  formLogin.appendChild(title);

  const inputEmail = document.createElement('input');
  inputEmail.className = 'input-email';
  inputEmail.type = 'text';
  inputEmail.placeholder = 'Ingresa tu email';
  inputEmail.value = '';
  formLogin.appendChild(inputEmail);

  const inputPassword = document.createElement('input');
  inputPassword.className = 'input-password';
  inputPassword.type = 'password';
  inputPassword.placeholder = 'Contraseña';
  inputPassword.value = '';
  formLogin.appendChild(inputPassword);

  const divRemember = document.createElement('div');
  divRemember.className = 'div-remember';
  formLogin.appendChild(divRemember);

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
  formLogin.appendChild(buttonLogin);

  buttonLogin.addEventListener('click', () => onNavigate('/timeline')); // muro red social

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = 'button-google';
  buttonGoogle.textContent = 'Iniciar sesión con Google';
  buttonGoogle.type = 'submit';
  formLogin.appendChild(buttonGoogle);

  const imgGoogle = document.createElement('img');
  imgGoogle.className = 'img-google';
  imgGoogle.src = './images/google.png';
  imgGoogle.alt = 'imagen Google';
  buttonGoogle.appendChild(imgGoogle);

  buttonLogin.addEventListener('click', () => onNavigate('/')); // autentificación con google

  const hr = document.createElement('hr');
  formLogin.appendChild(hr);

  const optionalText = document.createElement('h4');
  optionalText.textContent = '¿Eres nuevo en VeganBook?';
  formLogin.appendChild(optionalText);

  const buttonRegister = document.createElement('button');
  buttonRegister.className = 'button-register';
  buttonRegister.textContent = '¡Registrate!';
  buttonRegister.type = 'submit';
  formLogin.appendChild(buttonRegister);

  buttonRegister.addEventListener('click', () => onNavigate('/register'));

  return divLogin;
};
