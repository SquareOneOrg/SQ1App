// SleepLog.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Calendar from './Calendar'; 
import { db } from '../firebase-config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { useGems } from './GemContext.js';

export default function SleepLog() {
  // logs[dateString] = { id, date, sleepGoal, hoursSleep, deviceTime }
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const { incrVal } = useGems();


  // Load all Firestore logs once on mount
  useEffect(() => {
    const colRef = collection(db, 'sleepLogs');
    getDocs(colRef)
      .then((snapshot) => {
        const loadedLogs = {};
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          loadedLogs[docSnap.id] = {
            id: docSnap.id, 
            date: data.date || docSnap.id,
            sleepGoal: data.sleepGoal || '',
            hoursSleep: data.hoursSleep ? String(data.hoursSleep) : '',
            deviceTime: data.deviceTime || '',
          };
        });
        setLogs(loadedLogs);
      })
      .catch((err) => console.error('Error loading logs from Firestore:', err));
  }, []);

  // Called when user taps a day in the calendar
  const handleDateSelect = (dateObj) => {
    const dateKey = dateObj.toISOString().split('T')[0]; 
    setSelectedDate(dateKey);

    // If no entry for this date, create a blank one in local state
    if (!logs[dateKey]) {
      setLogs((prev) => ({
        ...prev,
        [dateKey]: {
          id: dateKey,
          date: dateKey,
          sleepGoal: '',
          hoursSleep: '',
          deviceTime: '',
        },
      }));
    }
  };

  // Update local state on text change, then write to Firestore
  const handleChange = (field, value) => {
    if (!selectedDate) return;
    setLogs((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [field]: value,
      },
    }));
    saveOrUpdate(selectedDate);
  };

  // Write to Firestore
  const saveOrUpdate = async (dateKey) => {
    incrVal(1, "fire", true);
    incrVal(1, "gem", true);
    const entry = logs[dateKey];
    if (!entry) return;

    const docRef = doc(db, 'sleepLogs', dateKey);
    try {
      await setDoc(docRef, {
        date: entry.date,
        sleepGoal: entry.sleepGoal,
        hoursSleep: parseFloat(entry.hoursSleep) || 0,
        deviceTime: entry.deviceTime,
      });
      console.log(`Saved doc for ${dateKey} to Firestore`);
    } catch (error) {
      console.error('Error saving to Firestore:', error);
    }
  };

  // If user has selected a date, show the form
  const currentEntry = selectedDate ? logs[selectedDate] : null;
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sleep Log </Text>
      {!selectedDate &&(
        <Calendar onDateSelect={handleDateSelect} />
      )
      }
      {selectedDate && currentEntry && (
        <View style={{ flex: 1, width: '100%' }}>
          <ScrollView contentContainerStyle={styles.formContainer}>
          <TouchableOpacity 
              onPress={() => {setSelectedDate(null)}} 
              style={styles.answerButton}
          >
              <Text style={styles.navText}>Go Back To Calendar</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>Date: {selectedDate}</Text>

          <Text style={styles.label}>Sleep Goal:</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.sleepGoal}
            onChangeText={(txt) => handleChange('sleepGoal', txt)}
            placeholder="e.g. 8 hours"
            placeholderTextColor="#999"
          />

          <Text style={styles.label}>Hours of Sleep:</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.hoursSleep}
            onChangeText={(txt) => handleChange('hoursSleep', txt)}
            placeholder="e.g. 7.5"
            placeholderTextColor="#999"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Time on device before bed:</Text>
          <TextInput
            style={styles.input}
            value={currentEntry.deviceTime}
            onChangeText={(txt) => handleChange('deviceTime', txt)}
            placeholder="e.g. 1 hour"
            placeholderTextColor="#999"
          />
           <TouchableOpacity 
              onPress={() => {setSelectedDate(null)}} 
              style={styles.answerButton}
          >
              <Text style={styles.navButtonText}>Submit Goals</Text>
          </TouchableOpacity>
        </ScrollView>
        </View>
      )}
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B3D6FC',
    // alignItems: 'center',
    paddingTop: 0,
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    // Use your custom font here
    fontFamily: 'Sniglet',
  },
  formContainer: {
    width: '100%', 
    maxWidth: 500,
    paddingHorizontal: 100,
    // paddingVertical: 20,
    backgroundColor: '#F0F5FF',
    borderRadius: 10,
  },
  dateText: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
    color: '#333',
    fontFamily: 'Sniglet',
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginVertical: 4,
    color: '#333',
    fontFamily: 'Sniglet',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 6,
    fontFamily: 'Sniglet',
  },
  navText: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Sniglet',
    padding: 4,
  },
  navButtonText: {
    fontSize: 16,
    textAlign: 'left',
    fontFamily: 'Sniglet',
    padding: 4,
},
answerButton: {
  padding: 4,
  borderColor: '#000000',
  borderStyle: 'solid',
  borderRadius: 10,
  borderWidth: 2,
  backgroundColor: '#4AB2F4',
  
},
});
