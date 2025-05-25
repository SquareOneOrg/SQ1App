import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase-config';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved user data when app starts
  useEffect(() => {
    const loadUserData = async () => {
      try {
        
        const savedUsername = await AsyncStorage.getItem('username');
        if (savedUsername) {
          setUsername(savedUsername);
          
          // Fetch user data from Firebase to get the avatar
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", savedUsername));
          const querySnapshot = await getDocs(q);
          console.log("users")
          console.log(usersRef)
          
          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              const userData = doc.data();
              setSelectedAvatar(userData.avatarId || 1);
            });
          }
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, []);

  // Function to handle login
  const login = async (userData) => {
    console.log("ENTERED")
    console.log(userData);
    try {
      setUsername(userData.username);
      setSelectedAvatar(userData.avatarId || 1);
      
      // Save username to AsyncStorage
      await AsyncStorage.setItem('username', userData.username);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  // Function to handle logout
  const logout = async () => {
    try {
      setUsername(null);
      setSelectedAvatar(null);
      
      // Remove username from AsyncStorage
      await AsyncStorage.removeItem('username');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        username, 
        setUsername, 
        selectedAvatar, 
        setSelectedAvatar,
        loading,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);