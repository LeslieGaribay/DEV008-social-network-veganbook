import { createUser, signInGoogle } from '../src/lib/firebase';
import { register } from '../src/components/register';

jest.mock('../src/lib/firebase');

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
describe('createUser', () => {
  let inputEmail;
  let inputPassword;
  let buttonCreateAccount;
  let errorText;
  beforeEach(() => {
    const onNavigateMock = () => {};
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(register(onNavigateMock));
    inputEmail = document.getElementById('email');
    inputPassword = document.getElementById('password');
    buttonCreateAccount = document.getElementsByClassName('button-create-account')[0];
    errorText = document.getElementsByClassName('error-text-register')[0];
  });

  it('Debería mostrar un error si los campos de texto están vacíos', async () => {
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙈, ingresa un correo y una contraseña');
  });

  it('Debería mostrar un error si el campo de la contraseña está vacío ', async () => {
    inputEmail.value = 'hola@holamundo.com';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa una contraseña');
  });

  it('Debería mostrar un error si el campo del correo electrónico está vacío', async () => {
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico');
  });

  it('Debería mostrar un error si el correo electrónico es inválido, sin arroba', async () => {
    inputEmail.value = 'holaholamundo.com';
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico válido');
  });

  it('Debería mostrar un error si el correo electrónico es inválido, sin punto', async () => {
    inputEmail.value = 'hola@holamundocom';
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico válido');
  });

  it('Debería mostrar un error si el correo electrónico es inválido, sin arroba y sin punto', async () => {
    inputEmail.value = 'holaholamundocom';
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, ingresa un correo electrónico válido');
  });

  it('Debería mostrar un error si la contraseña es menor a 6 caracteres', async () => {
    inputEmail.value = 'hola@holamundo.com';
    inputPassword.value = 'abc';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙉, la contraseña debe tener al menos 6 caracteres');
  });

  it('Debería mostrar un error si el correo electrónico ya está registrado', async () => {
    const error = new Error();
    error.code = 'auth/email-already-exists';

    createUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmail.value = 'hola@holamundo.com';
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ El correo electrónico ya está registrado ⚡');
  });

  it('Debería mostrar un error si el correo electrónico es inválido', async () => {
    const error = new Error();
    error.code = 'auth/invalid-email';

    createUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmail.value = 'hola@holamundo.com';
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('⚡ El correo ingresado no es válido ⚡');
  });

  it('Debería mostrar un error genérico si Firebase falla', async () => {
    const error = new Error();
    error.code = 'hola/mundo';
    error.message = 'Error genérico. Firebase falló';

    createUser.mockImplementationOnce(() => Promise.reject(error));
    inputEmail.value = 'hola@holamundo.com';
    inputPassword.value = 'abcdef';
    buttonCreateAccount.click();
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
    document.body.appendChild(register(onNavigateMockGoogle));

    buttonGoogle = document.getElementsByClassName('button-google')[0];
    errorText = document.getElementsByClassName('error-text-register')[0];
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
