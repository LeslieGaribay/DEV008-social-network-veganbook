import { addDoc, serverTimestamp } from 'firebase/firestore';
import { savePost } from '../src/lib/firebase';
// import { getinfoPosts, timeline } from '../src/components/timeline';

const postContent = 'test values';
const email = 'test values';
const displayName = 'test values';
const photoURL = 'test values';
const timestamp = 12345;
jest.mock('firebase/auth', () => ({
  ...(jest.requireActual('firebase/auth')),
  getAuth: () => ({
    currentUser: {
      displayName,
      photoURL,
      email,
    },
  }),
}));
jest.mock('firebase/firestore');

// function tick() {
//   return new Promise((resolve) => {
//     setTimeout(resolve, 0);
//   });
// }
describe('savePost', () => {
  it('El usuario no es nulo', () => {
    addDoc.mockImplementationOnce(() => { });
    serverTimestamp.mockImplementationOnce(() => timestamp);

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
      },
    );
  });
});

/*
describe('savePost', () => {
  let emailPost;
  let displayName;
  let photoURL;
  beforeEach(() => {
    const onNavigateMockTimeline = () => { };
    while (document.body.firstChild) {
      document.body.removeChild(document.body.firstChild);
    }
    document.body.appendChild(timeline(onNavigateMockTimeline));

  });
});
*/
