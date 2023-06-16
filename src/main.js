import { register } from './components/register.js';
import { login } from './components/login.js';
//import { initializeFirebase } from "./firebase.js"; 


const rootDiv = document.getElementById('root');

const routes = {
  '/': login,
  '/register': register,
};
export const onNavigate = (pathname) => {
  window.history.pushState(
    {}, //estado
    pathname, // titulo
    window.location.origin + pathname// ruta
  );

  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }
  rootDiv.appendChild(routes[pathname](onNavigate));
};

const component = routes[window.location.pathname];

window.onpopstate = () => {
  rootDiv.appendChild(component(onNavigate));
};

rootDiv.appendChild(component(onNavigate));

//initializeFirebase();
