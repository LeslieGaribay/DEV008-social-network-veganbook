import { getAuth } from "firebase/auth";
import { initializeApp } from 'firebase/app';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

export function initializeFirebase() {
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

}
