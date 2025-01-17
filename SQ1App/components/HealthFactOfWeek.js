import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HealthFactOfWeek = ({ textStyle }) => {
    const [randomFact, setRandomFact] = useState('Loading fact...');
    const [lastUpdated, setLastUpdated] = useState(new Date());
    const [factInitialized, setFactInitialized] = useState(false);

    const updateFact = (factsList) => {
        if (!factsList || factsList.length === 0) {
            console.error("Facts list is undefined or empty.");
            return;
        }
        
        const today = new Date();
        const isMonday = today.getDay() === 1; // Check for Monday

        // If the fact hasn't been initialized yet, set a random fact
        if (!factInitialized) {
            const randomIndex = Math.floor(Math.random() * factsList.length);
            setRandomFact(factsList[randomIndex]);
            setFactInitialized(true); // Mark fact as initialized
            setLastUpdated(today); // Update the last updated date
            AsyncStorage.setItem('currentFact', factsList[randomIndex]); // Store the fact
            AsyncStorage.setItem('lastUpdated', today.toISOString()); // Store the last updated date
        } else if (isMonday && lastUpdated.getDay() !== 1) {
            // If it's Monday and last updated day is not Monday, update the fact
            const randomIndex = Math.floor(Math.random() * factsList.length);
            setRandomFact(factsList[randomIndex]);
            setLastUpdated(today); // Update the last updated date
            AsyncStorage.setItem('currentFact', factsList[randomIndex]); // Store the new fact
            AsyncStorage.setItem('lastUpdated', today.toISOString()); // Store the new last updated date
        }
    };

    useEffect(() => {
        const fetchFacts = async () => {
            try {
                const factsCollection = collection(db, 'healthFacts');
                const factsSnapshot = await getDocs(factsCollection);
                const factsList = factsSnapshot.docs.map(doc => doc.data().fact); // Assuming each document has a 'fact' field
                
                console.log("Fetched facts:", factsList); // Log the fetched facts
                
                if (factsList.length > 0) {
                    updateFact(factsList); // Pass the factsList to updateFact
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
                    fetchFacts(); // Fetch new facts if the stored fact is from a previous week
                }
            } else {
                fetchFacts(); // Fetch new facts if no stored fact exists
            }
        };

        loadStoredFact();
    }, []); // Empty dependency array to run only on mount

    return (
        <View>
            <Text style={textStyle}>{randomFact}</Text>
        </View>
    );
};

export default HealthFactOfWeek; 