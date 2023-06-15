export const register = (onNavigate) => {
  const formRegister = document.createElement("form");
  formRegister.className = "form-register";

  const title = document.createElement('h2');
  title.textContent = "¡Regístrate!";
  formRegister.appendChild(title);

  const name = document.createElement('input');
  name.className = "input-name";
  name.type = 'text';
  name.placeholder = "Nombre";
  name.value = "";
  formRegister.appendChild(name);

  const lastName = document.createElement('input');
  lastName.className = "input-lastname";
  lastName.type = 'text';
  lastName.placeholder = "Apellido";
  lastName.value = "";
  formRegister.appendChild(lastName);

  const email = document.createElement('input');
  email.className = "input-email";
  email.type = 'text';
  email.placeholder = "Ingresa tu correo electrónico";
  email.value = "";
  formRegister.appendChild(email);

  const password = document.createElement('input');
  password.className = "input-password";
  password.type = 'password';
  password.placeholder = "Contraseña";
  password.value = "";
  formRegister.appendChild(password);

  const buttonCreateAccount = document.createElement('button');
  buttonCreateAccount.className = "button-create-account";
  buttonCreateAccount.textContent = "Crear cuenta";
  buttonCreateAccount.type = 'submit';
  formRegister.appendChild(buttonCreateAccount);

  formRegister.addEventListener('click', () => onNavigate('/')); //muro red social

  const buttonGoogle = document.createElement('button');
  buttonGoogle.className = "button-google";
  buttonGoogle.textContent = "Continuar con Google";
  buttonGoogle.type = 'submit';
  formRegister.appendChild(buttonGoogle);

  formRegister.addEventListener('click', () => onNavigate('/')); //muro red social

  const hr = document.createElement('hr');
  formRegister.appendChild(hr);

  const optionalText = document.createElement('h3');
  optionalText.textContent = "¿Ya tienes cuenta?";
  formRegister.appendChild(optionalText);

  const buttonLoginBack = document.createElement("button");
  buttonLoginBack.textContent = "Iniciar sesión";

  buttonLoginBack.addEventListener("click", () => onNavigate("/"));
  formRegister.appendChild(buttonLoginBack);

  return formRegister;
};
