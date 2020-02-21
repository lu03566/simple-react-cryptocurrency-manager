// src/firebase.js
import firebase from 'firebase'
const config = {
apiKey: "AIzaSyA6voPulgGcWPChbuoFjO9LVbrmVXmNXxU",
    authDomain: "react-assesment.firebaseapp.com",
    databaseURL: "https://react-assesment.firebaseio.com",
    projectId: "react-assesment",
    storageBucket: "react-assesment.appspot.com",
    messagingSenderId: "408484562261"
};
firebase.initializeApp(config);
export default firebase;