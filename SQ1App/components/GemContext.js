import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { useUser
 } from '../context/UserContext';
const GemContext = createContext();

export function GemProvider({ children }) {
  const { username } = useUser();
  const [gems, setGems] = useState([0, 0, 0]);

  const refreshGems = async () => {
    if (!username) return;
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      setGems([
        Number(userData.fireNumber),
        Number(userData.heartNumber),
        Number(userData.gemNumber),
      ]);
    } catch (error) {
      console.error('Error loading gems:', error);
    }
  };

  const incrVal = async (amount, incrType, incr = true) => {
    if (!username) return;
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      let updatedField;
      if (incr) {
        updatedField = incrType === "fire"
          ? { fireNumber: userData.fireNumber + amount }
          : incrType === "heart"
          ? { heartNumber: userData.heartNumber + amount }
          : { gemNumber: userData.gemNumber + amount };
      } else {
        updatedField = incrType === "fire"
          ? { fireNumber: Math.max(userData.fireNumber - amount, 0) }
          : incrType === "heart"
          ? { heartNumber: Math.max(userData.heartNumber - amount, 0) }
          : { gemNumber: Math.max(userData.gemNumber - amount, 0) };
      }

      await setDoc(doc(db, "users", userDoc.id), updatedField, { merge: true });

      // Refresh gems after update
      await refreshGems();

    } catch (error) {
      console.error('Error incrementing value:', error);
    }
  };

  return (
    <GemContext.Provider value={{ gems, refreshGems, incrVal }}>
      {children}
    </GemContext.Provider>
  );
}

export function useGems() {
  return useContext(GemContext);
}