// scripts/updateUsers.js
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, doc, updateDoc, Timestamp } = require('firebase/firestore');

// 🔑 Your Firebase config goes here
const firebaseConfig = {
    apiKey: "AIzaSyC1dWmAVCrHKH-OxNEsX_oDznQB9BTpAyg",
    authDomain: "sq1-app-a8aa7.firebaseapp.com",
    projectId: "sq1-app-a8aa7",
    storageBucket: "sq1-app-a8aa7.appspot.com",
    messagingSenderId: "462484776057",
    appId: "1:462484776057:ios:2ea789be411729ceeaa0a8"
};

// 🔌 Initialize Firebase just for this script
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addFieldToAllUsers = async () => {
  const usersRef = collection(db, 'users');
  const snapshot = await getDocs(usersRef);

  for (const userDoc of snapshot.docs) {
    const userRef = doc(db, 'users', userDoc.id);
    await updateDoc(userRef, { streakAdded: false,
        lastStreakDate: Timestamp.now() });
    console.log(`Updated ${userDoc.id}`);
  }

  console.log('All users updated!');
};

addFieldToAllUsers();
