import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: import.meta.env.REACT_APP_FIREBASE_APIKEY,
    authDomain: import.meta.env.REACT_APP_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.REACT_APP_FIREBASE_PROJECTID,
    storageBucket: "ts-gallery.appspot.com",
    messagingSenderId: import.meta.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
    appId: import.meta.env.REACT_APP_FIREBASE_APPID
  };

const firebaseApp = initializeApp(firebaseConfig);
export const storage = getStorage(firebaseApp);