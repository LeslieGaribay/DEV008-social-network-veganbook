/* eslint-disable no-shadow */
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
  getDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  query,
  orderBy,
  arrayUnion,
  doc,
  arrayRemove,
} from 'firebase/firestore';
// import { async } from 'regenerator-runtime';

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
let app = null;
let auth = null;
let provider = null;
let db = null;
export function initializeFirebase() {
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  provider = new GoogleAuthProvider();
  // Firestore
  db = getFirestore();
}
initializeFirebase();

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
  let displayName = '';
  let photoURL = '';
  let likes = '';

  if (user !== null) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    // ...
    displayName = user.displayName;
    photoURL = user.photoURL;
    emailPost = user.email;
  } else {
    // No user is signed in.
    emailPost = undefined;
  }

  return addDoc(collection(db, 'Posts'), {
    postContent,
    emailPost,
    displayName,
    photoURL,
    createAt: serverTimestamp(),
    likes,
  });
};

export const getPosts = () => getDocs(query(collection(db, 'Posts'), orderBy('createAt', 'desc')));

export const deletePost = async (Posts) => {
  try {
    const user = auth.currentUser;
    if (Posts.data().emailPost === user.email) {
      await deleteDoc(Posts.ref);
      console.log('Post eliminado exitosamente');
    }
    getPosts();
  } catch (error) {
    console.error('Error al eliminar el post:', error);
  }
};

export const editPost = async (doc, newContent) => {
  try {
    const user = auth.currentUser;
    if (doc.data().emailPost === user.email) {
      await updateDoc(doc.ref, {
        postContent: newContent,
      });
      console.log('Post editado exitosamente');
    }
  } catch (error) {
    console.error('Error al editar el post', error);
  }
};

export const like = (emailUser, idPost) => {
  const postRef = doc(db, 'Posts', idPost);
  updateDoc(postRef, {
    likes: arrayUnion(emailUser),
  });
};

export const disLike = (emailUser, idPost) => {
  const postRef = doc(db, 'Posts', idPost);
  updateDoc(postRef, {
    likes: arrayRemove(emailUser),
  });
};

//Método para obtener el Post apartir de Id

export const getPostData = (id) => {
  const docRef = doc(db, 'Posts', id);
  return getDoc(docRef);
}

// METODO PARA ACTUALIZAR LOS CORAZONES DE LOS POSTS
// export const updateLikes = (emailPost, likes) => {
//   const updatePostById = firebase.firestore().collection('Posts').doc(emailPost)
//     .update(
//       { likes },
//     );
//   return updatePostById;
// };

// function getCount(ref) {
//   // Sum the count of each shard in the subcollection
//   return ref.collection('Posts').get().then((snapshot) => {
//       let total_count = 0;
//       snapshot.forEach((doc) => {
//           total_count += doc.data().count;
//       });

//       return total_count;
//   });
// }