import firebase from '@firebase/app'; 

import '@firebase/firestore'; 
import '@firebase/auth';

const app = firebase.initializeApp({ 
    apiKey: "AIzaSyBAfppBWvCoydzzWbRw3M-ROO6K9-4E9LA",
    authDomain: "invitation-chat.firebaseapp.com",
    projectId: "invitation-chat",
    storageBucket: "invitation-chat.appspot.com",
    messagingSenderId: "73215913571",
    appId: "1:73215913571:web:f110fe78a49ad124b4d256",
    measurementId: "G-08NPD1PLJW"
}) 
const db = firebase.firestore(); 
const auth = firebase.auth();

export { db, auth }