import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDsvtCCNgpVAj68Ee0qNNN3m9RkbGuYIPk",
    authDomain: "fir-28050.firebaseapp.com",
    databaseURL: "https://fir-28050-default-rtdb.firebaseio.com",
    projectId: "fir-28050",
    storageBucket: "fir-28050.appspot.com",
    messagingSenderId: "636719450676",
    appId: "1:636719450676:web:b68ebfaa8f29805c059861",
    measurementId: "G-3CRMLEJHY7"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };