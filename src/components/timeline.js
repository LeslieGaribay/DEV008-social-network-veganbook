import { getAuth } from 'firebase/auth';
import { savePost, getPosts } from '../lib/firebase';

const getinfoPosts = async () => {
  const currentUser = getAuth().currentUser;
  const divPostContainer = document.getElementById('div-post');
  if (divPostContainer != null) {
    divPostContainer.reset();
  }

  const publicationsContainer1 = document.getElementById(
    'publications-container',
  );
  if (publicationsContainer1 != null) {
    while (publicationsContainer1.firstChild) {
      publicationsContainer1.removeChild(publicationsContainer1.firstChild);
    }
  }
  const querySnapshot = await getPosts();

  querySnapshot.forEach((doc) => {
    // console.log(doc.data());
    const publicationsContainer = document.getElementById(
      'publications-container',
    );
    const divUserPost = document.createElement('div');
    divUserPost.className = 'div-user-post';
    publicationsContainer.appendChild(divUserPost);

    const divUserImageAndUsernameEmail = document.createElement('div');
    divUserImageAndUsernameEmail.className = 'div-user-image-and-username';
    divUserPost.appendChild(divUserImageAndUsernameEmail);

    const imgUserPosts = document.createElement('img');
    imgUserPosts.className = 'img-user-post';
    imgUserPosts.src = doc.data().photoURL;
    imgUserPosts.alt = 'Imagen User';
    divUserImageAndUsernameEmail.appendChild(imgUserPosts);

    const divNameEmail = document.createElement('div');
    divNameEmail.className = 'div-name-email';
    divUserImageAndUsernameEmail.appendChild(divNameEmail);

    const userNamePosts = document.createElement('h3');
    userNamePosts.className = 'user-Name-post';
    userNamePosts.textContent = doc.data().displayName;
    divNameEmail.appendChild(userNamePosts);

    const emailUser = document.createElement('p');
    emailUser.textContent = doc.data().emailPost;
    emailUser.className = 'email-user';
    divNameEmail.appendChild(emailUser);

    const messagePost = document.createElement('p');
    messagePost.className = 'message-posts';
    messagePost.textContent = doc.data().postContent;

    divUserPost.append(messagePost);
  });
};

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
  imgLogOut.addEventListener('click', () => onNavigate('/'));
  divNavTimeline.appendChild(imgLogOut);

  const hrTimeline = document.createElement('hr');
  hrTimeline.className = 'hr-timeline';
  divTimeline.appendChild(hrTimeline);

  const divGreenInputPink = document.createElement('div');
  divGreenInputPink.className = 'div-green-input-pink';
  divTimeline.appendChild(divGreenInputPink);

  const divGreen = document.createElement('div');
  divGreen.className = 'div-green';
  divGreenInputPink.appendChild(divGreen);

  const imgUserGreen = document.createElement('img');
  imgUserGreen.className = 'img-user-green';
  imgUserGreen.src = currentUser.photoURL;
  imgUserGreen.alt = 'Imagen User';
  divGreen.appendChild(imgUserGreen);

  const userNameGreen = document.createElement('h3');
  userNameGreen.className = 'user-Name-green';
  userNameGreen.textContent = currentUser.displayName;
  divGreen.appendChild(userNameGreen);

  const messagePostGreen = document.createElement('p');
  messagePostGreen.className = 'message-posts-green';
  messagePostGreen.textContent = '"El respeto hacia todos los seres vivos es la base de una verdadera armonía en el mundo."';
  divGreen.appendChild(messagePostGreen);

  const divInputandPost = document.createElement('div');
  divInputandPost.className = 'div-input-post';
  divGreenInputPink.appendChild(divInputandPost);

  const divPostContainer = document.createElement('form');
  divPostContainer.className = 'div-post';
  divPostContainer.id = 'div-post';
  divInputandPost.appendChild(divPostContainer);

  const textPost = document.createElement('textarea');
  textPost.className = 'input-post';
  textPost.id = 'inputpostid';
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

  const publicationsContainer = document.createElement('div');
  publicationsContainer.className = 'publications-container-class';
  publicationsContainer.id = 'publications-container';
  divInputandPost.appendChild(publicationsContainer);

  // const divPost = document.getElementById('div-post');
  const postsContainer = document.getElementById('publications-container');
  console.log(postsContainer);
  // postsContainer.innerHTML = 'hola';

  // const querySnapshot = await getDocs(collection(db, "users"));
  // querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${doc.data()}`);
  // });
  getinfoPosts();
  buttonPost.addEventListener('click', async (e) => {
    e.preventDefault();

    const postContent = document.getElementById('inputpostid');
    savePost(postContent.value);
    getinfoPosts();
  });

  const divPinkTimeline = document.createElement('div');
  divPinkTimeline.className = 'div-pink-timeline';
  divGreenInputPink.appendChild(divPinkTimeline);

  const titlePink = document.createElement('h3');
  titlePink.className = 'title-pink';
  titlePink.textContent = 'Personas que quizás conozcas';
  divPinkTimeline.appendChild(titlePink);

  const divFriends = document.createElement('div');
  divFriends.className = 'div-friends';
  divPinkTimeline.appendChild(divFriends);

  const divFriend1 = document.createElement('div');
  divFriend1.className = 'div-friend-profile';
  divFriends.appendChild(divFriend1);

  const imgFriend1 = document.createElement('img');
  imgFriend1.className = 'img-friend';
  imgFriend1.src = './images/manvegan.png';
  imgFriend1.alt = 'Man User';
  divFriend1.appendChild(imgFriend1);

  const divFriendsInfo1 = document.createElement('div');
  divFriendsInfo1.className = 'div-friends-info';
  divFriend1.appendChild(divFriendsInfo1);

  const nameFriend1 = document.createElement('h4');
  nameFriend1.className = 'name-friend';
  nameFriend1.textContent = 'Nicolas Hernández';
  divFriendsInfo1.appendChild(nameFriend1);

  const descriptionFriend1 = document.createElement('p');
  descriptionFriend1.className = 'description-friend';
  descriptionFriend1.textContent = 'Vegano desde el 2010, me encanta comer saludable y enseñarle a otro mis dietas veganas';
  divFriendsInfo1.appendChild(descriptionFriend1);

  const buttonFollow1 = document.createElement('button');
  buttonFollow1.className = 'button-follow';
  buttonFollow1.textContent = ' ➕ Seguir';
  divFriendsInfo1.appendChild(buttonFollow1);
  // buttonPost.type = 'submit';

  const divFriend2 = document.createElement('div');
  divFriend2.className = 'div-friend-profile';
  divFriends.appendChild(divFriend2);

  const imgFriend2 = document.createElement('img');
  imgFriend2.className = 'img-friend';
  imgFriend2.src = './images/womanvegan.png';
  imgFriend2.alt = ' User Woman';
  divFriend2.appendChild(imgFriend2);

  const divFriendsInfo2 = document.createElement('div');
  divFriendsInfo2.className = 'div-friends-info';
  divFriend2.appendChild(divFriendsInfo2);

  const nameFriend2 = document.createElement('h4');
  nameFriend2.className = 'name-friend';
  nameFriend2.textContent = 'Isidora Lagos';
  divFriendsInfo2.appendChild(nameFriend2);

  const descriptionFriend2 = document.createElement('p');
  descriptionFriend2.className = 'description-friend';
  descriptionFriend2.textContent = 'Soy vegana porque todos los animales son mis amigos y yo no me como a mis amigos';
  divFriendsInfo2.appendChild(descriptionFriend2);

  const buttonFollow2 = document.createElement('button');
  buttonFollow2.className = 'button-follow';
  buttonFollow2.textContent = ' ➕ Seguir';
  divFriendsInfo2.appendChild(buttonFollow2);
  // buttonPost.type = 'submit';

  const divFriend3 = document.createElement('div');
  divFriend3.className = 'div-friend-profile';
  divFriends.appendChild(divFriend3);

  const imgFriend3 = document.createElement('img');
  imgFriend3.className = 'img-friend';
  imgFriend3.src = './images/veganwoman.jpeg';
  imgFriend3.alt = ' User Woman';
  divFriend3.appendChild(imgFriend3);

  const divFriendsInfo3 = document.createElement('div');
  divFriendsInfo3.className = 'div-friends-info';
  divFriend3.appendChild(divFriendsInfo3);

  const nameFriend3 = document.createElement('h4');
  nameFriend3.className = 'name-friend';
  nameFriend3.textContent = 'Luisa Garay';
  divFriendsInfo3.appendChild(nameFriend3);

  const descriptionFriend3 = document.createElement('p');
  descriptionFriend3.className = 'description-friend';
  descriptionFriend3.textContent = 'No soy vegana, pero amo comer vegano | soy flexitariana | Intolerante a la leche animal.';
  divFriendsInfo3.appendChild(descriptionFriend3);

  const buttonFollow3 = document.createElement('button');
  buttonFollow3.className = 'button-follow';
  buttonFollow3.textContent = ' ➕ Seguir';
  divFriendsInfo3.appendChild(buttonFollow3);

  return divTimeline;
};
