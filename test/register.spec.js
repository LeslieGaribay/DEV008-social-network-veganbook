import { createUser } from '../src/lib/firebase';
// import register from '../src/components/register';

jest.mock('../src/lib/firebase');

// function tick() {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 0);
//   });
// }
describe('createUser', () => {
  it('registro de usuario', async () => {
    const registroEjemplo = createUser('john@gmail.com', '123456');
    await expect(registroEjemplo).resolves.toBeTruthy();
  });
  //   //   let divRegister;
  //   //   let formRegister;
  //   let inputEmail;
  //   let inputPassword;
  //   let buttonCreateAccount;
  //   let errorText;
  //   beforeEach(() => {
  //     // document.body.appendChild(register());
  //     // divRegister = document.getElementByClassName('div-register');
  //     // formRegister = document.getElementByClassName('form-register');
  //     inputEmail = document.getElementById('email');
  //     inputPassword = document.getElementById('password');
  //     buttonCreateAccount = document.getElementByClassName(
  //       'button-create-account'
  //     );
  //     errorText = document.getElementByClassName('error-text-register');
  //   });
  //   it('Debería mostrar un error si el correo de usuario ya está registrado', async () => {
  //     register.mockImplementationOnce((email, password) => {
  //       return Promise.reject(
  //         new Error('Firebase: Error (auth/email-already-in-use).')
  //       );
  //     });
  //     buttonCreateAccount.click();
  //     await tick();
  //     expect(errorText.innerHTML).toBe(
  //       'Firebase: Error (auth/email-already-in-use).'
  //     );
  //   });
  //   it('Debería mostrar exito', async () => {
  //     register.mockImplementationOnce((email, password) => {
  //       return Promise.resolve({
  //         user: { userCredential: 12345, email: email },
  //       });
  //     });
  //     inputEmail.value = 'email@verify.com';
  //     inputPassword.value = '123456';
  //     buttonCreateAccount.click();
  //     await tick();
  //     expect(createUser).toReturn(true);
  //   });
});
