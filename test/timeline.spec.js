import { addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { savePost, initializeFirebase } from '../src/lib/firebase';
import * as libFirebaseModule from '../src/lib/firebase';
import { timeline } from '../src/components/timeline';
import * as libTimelineModule from '../src/components/timeline';
import { myGetItem } from '../src/lib/utils';

const displayName = 'test values';
const photoURL = 'test values';
const email = 'test values';

jest.mock('firebase/auth');
jest.mock('firebase/firestore');
jest.mock('../src/lib/utils');

describe('savePost', () => {
  beforeEach(() => {
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('El usuario no es nulo', () => {
    const postContent = 'test el usuario no es nulo';
    const timestamp = 12345;

    addDoc.mockImplementationOnce(() => { });
    serverTimestamp.mockImplementationOnce(() => timestamp);
    getAuth.mockImplementationOnce(() => ({
      currentUser: {
        displayName,
        photoURL,
        email,
      },
    }));

    initializeFirebase();
    savePost(postContent);
    expect(addDoc.mock.calls).toHaveLength(1);
    expect(addDoc).toBeCalledWith(
      undefined,
      {
        postContent,
        emailPost: email,
        displayName,
        photoURL,
        createAt: timestamp,
        likes: '',
      },
    );
  });

  it('El usuario es nulo', () => {
    const postContent = 'test el usuario es nulo';
    const timestamp = 12345;

    addDoc.mockImplementationOnce(() => { });
    serverTimestamp.mockImplementationOnce(() => timestamp);
    getAuth.mockImplementationOnce(() => ({
      currentUser: null,
    }));

    initializeFirebase();
    savePost(postContent);
    expect(addDoc.mock.calls).toHaveLength(1);
    expect(addDoc).toBeCalledWith( // que se haya llamado con los siguientes parámetros
      undefined,
      {
        postContent,
        emailPost: undefined,
        displayName: '',
        photoURL: '',
        createAt: timestamp,
        likes: '',
      },
    );
  });
});

function tick() {
  return new Promise((resolve) => {
    setTimeout(resolve, 0);
  });
}

describe('getinfoPosts', () => {
  // let publicationsContainer;
  // let divUserPost;
  let buttonPost;
  let textPost;

  beforeEach(() => {
    const onNavigateMockTimeline = () => {};
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }

    getAuth.mockImplementationOnce(() => ({
      currentUser: {
        displayName,
        photoURL,
        email,
      },
    }));
    myGetItem.mockImplementationOnce(() => '{"photoURL":"https://www.google.com/", "displayName":"MockTest"}');
    initializeFirebase();

    jest.spyOn(libFirebaseModule, 'getPosts').mockImplementation(() => Promise.resolve([]));
    document.body.appendChild(timeline(onNavigateMockTimeline));

    // publicationsContainer = document.getElementById('publications-container');
    // divUserPost = document.getElementsByClassName('div-user-post');
    buttonPost = document.getElementsByClassName('button-post')[0];
    textPost = document.getElementById('inputpostid');
    jest.resetAllMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Debería mostrar una alerta si el input está vacío al momento de publicar', async () => {
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
    const getPostsMock = jest.spyOn(libFirebaseModule, 'getPosts').mockImplementation(() => Promise.resolve([]));

    textPost.value = '';
    buttonPost.click();
    await tick();
    expect(alertSpy).toBeCalledTimes(1);
    expect(alertSpy).toHaveBeenCalledWith('Ups! No has escrito tu post!');
    expect(getPostsMock).toBeCalledTimes(0);
  });

  it('Debería publicar un post', async () => {
    const savePostMock = jest.spyOn(libFirebaseModule, 'savePost');
    const getinfoPostsMock = jest.spyOn(libTimelineModule, 'getinfoPosts').mockImplementation(() => {});
    // const getPostsMock = jest.spyOn(libFirebaseModule, 'getPosts')
    //   .mockImplementation(() => Promise.resolve([]));

    textPost.value = 'Test Post';
    buttonPost.click();
    await tick();
    expect(getinfoPostsMock).toBeCalledTimes(1);
    expect(savePostMock).toBeCalledTimes(1);
    // expect(getPostsMock).toBeCalledTimes(1);
  });
});
