import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore';

// https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js

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
const provider = new GoogleAuthProvider();
// Firestore
const db = getFirestore();

// try {
//   const docRef = await addDoc(collection(db, "Usuarios"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const querySnapshot = await getDocs(collection(db, "Usuarios"));
// querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data()}`);
// });

export function createUser(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInGoogle() {
  return signInWithPopup(auth, provider); // retorna el resultado de la ejecución de una función
}

export const savePost = (postContent) => {
  const user = auth.currentUser;
  let emailPost = '';
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    emailPost = user.email;
  } else {
    // No user is signed in.
    emailPost = undefined;
  }

  return addDoc(collection(db, 'Posts'), { postContent, emailPost });
};

export const getPosts = () => getDocs(collection(db, 'Posts'));

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
