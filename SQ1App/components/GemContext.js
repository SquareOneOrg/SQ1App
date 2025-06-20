import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, query, where, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import { useUser
 } from '../context/UserContext';
const GemContext = createContext();

const toUTCDateOnly = (ts) => {
  const d = ts.toDate();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};


export function GemProvider({ children }) {
  const { username } = useUser();
  const [gems, setGems] = useState([0, 0, 0]);

  const refreshGems = async () => {
    if (!username) {
      // console.log('no username found')
      return;
    }
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', username));
      const querySnapshot = await getDocs(q);
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      // console.log('gems being set')
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

      const lastStreakDate = userData.lastStreakDate
      ? toUTCDateOnly(userData.lastStreakDate)
      : null;
      const today = toUTCDateOnly(Timestamp.now());
      const msPerDay = 1000 * 60 * 60 * 24;
      let newStreak = 1;


      let updatedField;
      if (incr) {
        if (incrType === "fire") {
          const daysDiff = Math.floor((today - lastStreakDate) / msPerDay);
          if (daysDiff === 0) {
            return;
          } else if (daysDiff === 1) {
            newStreak = userData.fireNumber + 1;
          } else {
            newStreak = 1;
          }
          updatedField = {
            fireNumber: newStreak,
            lastStreakDate: Timestamp.now()
          };
        } else if (incrType === "heart") {
          updatedField = {
            heartNumber: userData.heartNumber + amount
          };
        } else {
          updatedField = {
            gemNumber: userData.gemNumber + amount
          };
        }
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