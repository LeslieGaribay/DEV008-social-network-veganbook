import { savePost, getPosts, deletePost, editPost } from '../src/lib/firebase';
import { getinfoPosts, timeline } from '../src/components/timeline';

jest.mock('../src/lib/firebase');

function tick() {
    return new Promise((resolve) => {
        setTimeout(resolve, 0);
    });
}

// describe('savePost', () => {
//     let emailPost;
//     let displayName;
//     let photoURL;
//     beforeEach(() => {
//         const onNavigateMockTimeline = () => { };
//         while (document.body.firstChild) {
//             document.body.removeChild(document.body.firstChild);
//           }
//           document.body.appendChild(timeline(onNavigateMockTimeline));

//     });
// });