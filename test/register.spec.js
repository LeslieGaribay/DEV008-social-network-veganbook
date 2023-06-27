import { createUser } from '../src/lib/firebase';
import { register } from '../src/components/register';

jest.mock('../src/lib/firebase');

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}
describe('createUser', () => {
  // let divRegister;
  // let formRegister;
  // let inputEmail;
  // let inputPassword;
  let buttonCreateAccount;
  let errorText;
  beforeEach(() => {
    const onNavigateMock = () => {};
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(register(onNavigateMock));
    // divRegister = document.getElementsByClassName('div-register')[0];
    // formRegister = document.getElementsByClassName('form-register')[0];
    // inputEmail = document.getElementById('email');
    // inputPassword = document.getElementById('password');
    buttonCreateAccount = document.getElementsByClassName('button-create-account')[0];
    errorText = document.getElementsByClassName('error-text-register')[0];
  });

  it('Debería mostrar un error si los campos de texto están vacíos', async () => {
    const error = new Error();
    error.code = 'auth/email-already-exists';

    createUser.mockImplementationOnce(() => Promise.reject(error));
    buttonCreateAccount.click();
    await tick();
    expect(errorText.innerHTML).toBe('Ups 🙈, ingresa un correo y una contraseña');
  });
});
