import { signInUser, signInGoogle } from '../src/lib/firebase';
import { login } from '../src/components/login';

jest.mock('../src/lib/firebase');

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('signInUser', () => {
  let inputEmailLogin;
  let inputPasswordLogin;
  let buttonLogin;
  let errorText;

  beforeEach(() => {
    const onNavigateMockLogin = () => {};
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(login(onNavigateMockLogin));
    inputEmailLogin = document.getElementById('user-email');
    inputPasswordLogin = document.getElementById('user-password');
    buttonLogin = document.getElementsByClassName('button-login')[0];
    errorText = document.getElementsByClassName('error-text')[0];
  });

  it('Debería mostrar un error si los campos de texto están vacíos', async () => {
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙈, ingresa un correo y una contraseña');
  });

  it('Debería mostrar un error si el campo de la contraseña está vacío ', async () => {
    inputEmailLogin.value = 'hola@holamundo.com';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa una contraseña');
  });

  it('Debería mostrar un error si el campo del correo electrónico está vacío', async () => {
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico');
  });

  it('Debería mostrar un error si el correo electrónico es inválido, sin arroba', async () => {
    inputEmailLogin.value = 'holaholamundo.com';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico válido');
  });

  it('Debería mostrar un error si el correo electrónico es inválido, sin punto', async () => {
    inputEmailLogin.value = 'hola@holamundocom';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico válido');
  });

  it('Debería mostrar un error si el correo electrónico es inválido, sin arroba y sin punto', async () => {
    inputEmailLogin.value = 'holaholamundocom';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico válido');
  });

  it('Debería mostrar un error si la contraseña es menor a 6 caracteres', async () => {
    inputEmailLogin.value = 'hola@holamundo.com';
    inputPasswordLogin.value = 'abc';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, la contraseña debe tener al menos 6 caracteres');
  });

  it('Debería mostrar un error si la contraseña está incorrecta', async () => {
    const error = new Error();
    error.code = 'auth/wrong-password';

    signInUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmailLogin.value = 'hola@holamundo.com';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ La contraseña es incorrecta ⚡');
  });

  it('Debería mostrar un error si el correo es invalido', async () => {
    const error = new Error();
    error.code = 'auth/invalid-email';

    signInUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmailLogin.value = 'hola@holamundo.com';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ El correo ingresado no es válido ⚡');
  });

  it('Debería mostrar un error si el correo y/o contraseña es incorrecta', async () => {
    const error = new Error();
    error.code = 'auth/user-not-found';

    signInUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmailLogin.value = 'hola@holamundo.com';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ Usuario y/o contraseña incorrecta ⚡');
  });

  it('Debería mostrar un error si supera el limite de intentos', async () => {
    const error = new Error();
    error.code = 'auth/too-many-requests';

    signInUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmailLogin.value = 'hola@holamundo.com';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ Superaste el número de intentos permitidos, vuelve a intentarlo luego ⚡');
  });
  it('Debería mostrar un error genérico si Firebase falla', async () => {
    const error = new Error();
    error.code = 'hola/mundo';
    error.message = 'Error genérico. Firebase falló';

    signInUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmailLogin.value = 'hola@holamundo.com';
    inputPasswordLogin.value = 'abcdef';
    buttonLogin.click();
    await tick();
    expect(errorText.innerHTML).toBe('Error genérico. Firebase falló');
  });
});

describe('signInGoogle', () => {
  let buttonGoogle;
  let errorText;

  beforeEach(() => {
    const onNavigateMockGoogle = () => {};
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(login(onNavigateMockGoogle));

    buttonGoogle = document.getElementsByClassName('button-google')[0];
    errorText = document.getElementsByClassName('error-text')[0];
  });

  it('Debería dar un error interno', async () => {
    const error = new Error();
    error.code = 'auth/internal-error';
    error.message = '';

    signInGoogle.mockImplementationOnce(() => Promise.reject(error));
    buttonGoogle.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ Error interno ⚡');
  });
});
