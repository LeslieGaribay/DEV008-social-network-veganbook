import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyAnGqUN7btBK8WWW9uzxMt3HZrxuaj6SP0',
  authDomain: 'veganbook-dev.firebaseapp.com',
  projectId: 'veganbook-dev',
  storageBucket: 'veganbook-dev.appspot.com',
  messagingSenderId: '727951856811',
  appId: '1:727951856811:web:97b69cb179790d913e53ee',
  measurementId: 'G-SCVJPF1654'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);



export function createUser(email, password)
{
  return createUserWithEmailAndPassword(auth, email, password);
}


/*
createUserWithEmailAndPassword(auth, inputEmail.value, inputPassword.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    // muro red social
    onNavigate('/timeline');
    alert(user.email);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage);
    // ..
  });
  */
