import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBvykF42jePqjD2yh-E1vXnNLCL8C3oUHY',
  authDomain: 'trello-clone-68dcf.firebaseapp.com',
  projectId: 'trello-clone-68dcf',
  storageBucket: 'trello-clone-68dcf.appspot.com',
  messagingSenderId: '935477996554',
  appId: '1:935477996554:web:dda76ce8a98bde20b843f3'
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase };
