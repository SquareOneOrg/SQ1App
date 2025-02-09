import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HealthFactOfWeek = ({ textStyle }) => {
  const [randomFact, setRandomFact] = useState('Loading fact...');
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [factInitialized, setFactInitialized] = useState(false);

  async function requestPermissions() {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Notification permissions not granted');
      }
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
    }
  }

  async function sendNotification(fact) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "New Health Fact! 🎉",
          body: fact,
        },
        trigger: null, 
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  const updateFact = async (factsList) => {
    if (!factsList || factsList.length === 0) {
      console.error("Facts list is undefined or empty.");
      return;
    }

    const today = new Date();
    const isMonday = today.getDay() === 1;
    
    if (!factInitialized) {
      const randomIndex = Math.floor(Math.random() * factsList.length);
      const newFact = factsList[randomIndex];
      setRandomFact(newFact);
      setFactInitialized(true);
      setLastUpdated(today);
      await AsyncStorage.setItem('currentFact', newFact);
      await AsyncStorage.setItem('lastUpdated', today.toISOString());
      await sendNotification(newFact);
    } else if (isMonday && lastUpdated.getDay() !== 1) {
      const randomIndex = Math.floor(Math.random() * factsList.length);
      const newFact = factsList[randomIndex];
      setRandomFact(newFact);
      setLastUpdated(today);
      await AsyncStorage.setItem('currentFact', newFact);
      await AsyncStorage.setItem('lastUpdated', today.toISOString());
      await sendNotification(newFact);
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    const fetchFacts = async () => {
      try {
        const factsCollection = collection(db, 'healthFacts');
        const factsSnapshot = await getDocs(factsCollection);
        const factsList = factsSnapshot.docs.map(doc => doc.data().fact);
        console.log("Fetched facts:", factsList);
        if (factsList.length > 0) {
          updateFact(factsList);
        } else {
          console.error("No facts found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching facts: ", error);
      }
    };

    const loadStoredFact = async () => {
      const storedFact = await AsyncStorage.getItem('currentFact');
      const storedDate = await AsyncStorage.getItem('lastUpdated');
      
      if (storedFact && storedDate) {
        const lastUpdatedDate = new Date(storedDate);
        const today = new Date();
        const isSameWeek = lastUpdatedDate.getFullYear() === today.getFullYear() &&
          lastUpdatedDate.getMonth() === today.getMonth() &&
          lastUpdatedDate.getDate() >= today.getDate() - lastUpdatedDate.getDay();
        
        if (isSameWeek) {
          setRandomFact(storedFact);
          setLastUpdated(lastUpdatedDate);
          setFactInitialized(true);
        } else {
          fetchFacts();
        }
      } else {
        fetchFacts();
      }
    };

    loadStoredFact();
  }, []);

  return (
    <View>
      <Text style={textStyle}>{randomFact}</Text>
    </View>
  );
};

export default HealthFactOfWeek;