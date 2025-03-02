import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyC1dWmAVCrHKH-OxNEsX_oDznQB9BTpAyg",
    authDomain: "sq1-app-a8aa7.firebaseapp.com",
    projectId: "sq1-app-a8aa7",
    storageBucket: "sq1-app-a8aa7.appspot.com",
    messagingSenderId: "462484776057",
    appId: "1:462484776057:ios:2ea789be411729ceeaa0a8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 
