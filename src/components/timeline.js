import {
  getAuth,

} from 'firebase/auth';
import { createUser, signInGoogle } from '../firebase';

export const timeline = (onNavigate) => {
  const currentUser = getAuth().currentUser;
  const divTimeline = document.createElement('div');
  divTimeline.className = 'div-timeline';

  const divNavTimeline = document.createElement('div');
  divNavTimeline.className = 'div-navegation';
  divTimeline.appendChild(divNavTimeline);

  const imgLogoVB = document.createElement('img');
  imgLogoVB.className = 'img-logo-VB';
  imgLogoVB.src = './images/LogoVB.png';
  imgLogoVB.alt = 'VeganBook Logo';
  divNavTimeline.appendChild(imgLogoVB);

  const logoTimeline = document.createElement('img');
  logoTimeline.className = 'img-logo-timeline-desktop';
  logoTimeline.src = './images/LogoVBB.png';
  logoTimeline.alt = 'logo de Vegan Book';
  divNavTimeline.appendChild(logoTimeline);

  const divProfileUser = document.createElement('div');
  divProfileUser.className = 'div-Profile-User';
  divNavTimeline.appendChild(divProfileUser);

  const imgUser = document.createElement('img');
  imgUser.className = 'img-user';
  imgUser.src = currentUser.photoURL;
  imgUser.alt = 'Imagen User';
  divProfileUser.appendChild(imgUser);

  const userName = document.createElement('h3');
  userName.className = 'user-Name';
  userName.textContent = currentUser.displayName;
  divProfileUser.appendChild(userName);

  const imgLogOut = document.createElement('img');
  imgLogOut.className = 'img-logout';
  imgLogOut.src = './images/logout.png';
  imgLogOut.alt = 'Imagen Logout';
  divNavTimeline.appendChild(imgLogOut);

  const hrTimeline = document.createElement('hr');
  hrTimeline.className = 'hr-timeline';
  divTimeline.appendChild(hrTimeline);

  const divPostContainer = document.createElement('div');
  divPostContainer.className = 'div-post';
  divTimeline.appendChild(divPostContainer);

  const textPost = document.createElement('textarea');
  textPost.className = 'input-post';
  divPostContainer.appendChild(textPost);
  textPost.placeholder = '¿Qué estás pensando?';

  const divPostActions = document.createElement('div');
  divPostActions.className = 'div-post-actions';
  divPostContainer.appendChild(divPostActions);

  const buttonPost = document.createElement('button');
  buttonPost.className = 'button-post';
  divPostActions.appendChild(buttonPost);
  buttonPost.type = 'submit';
  buttonPost.textContent = 'Publicar';

  const actions = document.createElement('img');
  actions.className = 'img-actions';
  actions.src = './images/actions.png';
  divPostActions.appendChild(actions);

  const hrTimeline2 = document.createElement('hr');
  hrTimeline2.className = 'hr-timeline-post';
  divPostContainer.appendChild(hrTimeline2);

  return divTimeline;
};
