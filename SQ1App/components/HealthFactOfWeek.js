import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { db } from '../firebase-config';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { auth } from '../firebase-config';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HealthFactOfWeek = ({ textStyle }) => {
  const [randomFact, setRandomFact] = useState('Loading fact...');
  const [factSource, setFactSource] = useState('');
  const [showSource, setShowSource] = useState(false);
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
          sound: true, 
        },
        trigger: null, 
      });
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  }

  const toggleSource = () => {
    setShowSource(!showSource);
  };

  const updateFact = async (factsData) => {
    if (!factsData || factsData.length === 0) {
      console.error("Facts list is undefined or empty.");
      return;
    }

    const today = new Date();
    const isMonday = today.getDay() === 1;
    
    if (!factInitialized) {
      const randomIndex = Math.floor(Math.random() * factsData.length);
      const newFactData = factsData[randomIndex];
      setRandomFact(newFactData.fact);
      setFactSource(newFactData.source || "Source not available");
      setFactInitialized(true);
      setLastUpdated(today);
      await AsyncStorage.setItem('currentFact', newFactData.fact);
      await AsyncStorage.setItem('currentSource', newFactData.source || "Source not available");
      await AsyncStorage.setItem('lastUpdated', today.toISOString());
      const savedPreference = await AsyncStorage.getItem('healthFactNotifications');
      let allowNotifications = true;
      if (savedPreference !== null) {
        allowNotifications = JSON.parse(savedPreference);
      }
      if (allowNotifications) {
        await sendNotification(newFactData.fact);
      }
    } else if (isMonday && lastUpdated.getDay() !== 1) {
      const randomIndex = Math.floor(Math.random() * factsData.length);
      const newFactData = factsData[randomIndex];
      setRandomFact(newFactData.fact);
      setFactSource(newFactData.source || "Source not available");
      setLastUpdated(today);
      await AsyncStorage.setItem('currentFact', newFactData.fact);
      await AsyncStorage.setItem('currentSource', newFactData.source || "Source not available");
      await AsyncStorage.setItem('lastUpdated', today.toISOString());
      const savedPreference2 = await AsyncStorage.getItem('healthFactNotifications');
      let allowNotifications2 = true;
      if (savedPreference2 !== null) {
        allowNotifications2 = JSON.parse(savedPreference2);
      }
      if (allowNotifications2) {
        await sendNotification(newFactData.fact);
      }
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
        const factsData = factsSnapshot.docs.map(doc => ({
          fact: doc.data().fact,
          source: doc.data().source || "Source not available"
        }));
        console.log("Fetched facts:", factsData);
        if (factsData.length > 0) {
          updateFact(factsData);
        } else {
          console.error("No facts found in Firestore.");
        }
      } catch (error) {
        console.error("Error fetching facts: ", error);
      }
    };

    const loadStoredFact = async () => {
      const storedFact = await AsyncStorage.getItem('currentFact');
      const storedSource = await AsyncStorage.getItem('currentSource');
      const storedDate = await AsyncStorage.getItem('lastUpdated');
      
      if (storedFact && storedDate) {
        const lastUpdatedDate = new Date(storedDate);
        const today = new Date();
        const isSameWeek = lastUpdatedDate.getFullYear() === today.getFullYear() &&
          lastUpdatedDate.getMonth() === today.getMonth() &&
          lastUpdatedDate.getDate() >= today.getDate() - lastUpdatedDate.getDay();
        
        if (isSameWeek) {
          setRandomFact(storedFact);
          setFactSource(storedSource || "Source not available");
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
    <View style={styles.container}>
      <Text style={textStyle}>{showSource ? factSource : randomFact}</Text>
      <TouchableOpacity 
        style={styles.sourceButton} 
        onPress={toggleSource}
      >
        <Text style={styles.sourceButtonText}>
          {showSource ? "Show Fact" : "Source"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 20,
  },
  sourceButton: {
    position: 'absolute',
    bottom: -5,
    right: 0,
    backgroundColor: '#9966CC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#33363F',
    marginTop: 10,
  },
  sourceButtonText: {
    color: 'white',
    fontFamily: 'Sniglet',
    fontSize: 14,
  }
});

export default HealthFactOfWeek;