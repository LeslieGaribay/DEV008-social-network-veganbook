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

  return divTimeline;
};
