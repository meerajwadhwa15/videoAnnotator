import Firebase from 'firebase/app';
import 'firebase/storage';

const FirebaseCredentials = {
  apiKey: 'AIzaSyDNvOy8GdtOQZSlYcIItVRdK5LTulbRK3U',
  authDomain: 'video-annotator-6bbca.firebaseapp.com',
  projectId: 'video-annotator-6bbca',
  storageBucket: 'video-annotator-6bbca.appspot.com',
  appId: '1:308814567358:web:1e6c918882ec7a32c98bef',
};

// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(FirebaseCredentials);
}

export const storage = Firebase.storage();
export default Firebase;
