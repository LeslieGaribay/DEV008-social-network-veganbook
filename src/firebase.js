import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js

const firebaseConfig = {
  apiKey: 'AIzaSyAnGqUN7btBK8WWW9uzxMt3HZrxuaj6SP0',
  authDomain: 'veganbook-dev.firebaseapp.com',
  projectId: 'veganbook-dev',
  storageBucket: 'veganbook-dev.appspot.com',
  messagingSenderId: '727951856811',
  appId: '1:727951856811:web:97b69cb179790d913e53ee',
  measurementId: 'G-SCVJPF1654',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInGoogle(provider) {
  return signInWithPopup(auth, provider);
}
// Configura un observador de estado de autenticación y obtén datos del usuario //opcional

// function observator() {
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       console.log('existe usuario activo');
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/v8/firebase.User
//       var uid = user.uid;
//       // ...
//     } else {
//       // User is signed out
//       console.log('no existe usuario activo');
//       // ...
//     }
//   });
// }
// observator();
