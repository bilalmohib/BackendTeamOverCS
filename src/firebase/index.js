import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/database'
import 'firebase/auth'
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDrA7W6ktKShzVNQ9z5NSTkXPMF-sEDY_o",
    authDomain: "teamovercsarchitect.firebaseapp.com",
    projectId: "teamovercsarchitect",
    storageBucket: "teamovercsarchitect.appspot.com",
    messagingSenderId: "655901470112",
    appId: "1:655901470112:web:808f81ecd47d4f204d88c5",
    measurementId: "G-15LD304GVS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


const storage = firebase.storage();

export {
    storage,
    firebase as default
}
