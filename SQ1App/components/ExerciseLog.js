import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Calendar from './Calendar'; // The same Calendar component you used before
import { db } from '../firebase-config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';
import { useGems } from './GemContext.js';

export default function ExerciseLog() {
  // Logs keyed by date => logs[dateString] = { date, exerciseGoal, minutesExercise, typesOfExercise }
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const { incrVal } = useGems();

  // Load existing documents from Firestore ("exerciseLogs" collection)
  useEffect(() => {
    const colRef = collection(db, 'exerciseLogs');
    getDocs(colRef)
      .then((snapshot) => {
        const loaded = {};
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          loaded[docSnap.id] = {
            date: data.date || docSnap.id,
            exerciseGoal: data.exerciseGoal || '',
            minutesExercise: data.minutesExercise
              ? String(data.minutesExercise)
              : '',
            typesOfExercise: data.typesOfExercise || '',
          };
        });
        setLogs(loaded);
      })
      .catch((error) => {
        console.error('Error fetching exercise logs:', error);
      });
  }, []);

  // When user taps a day on the calendar
  const handleDateSelect = (dateObj) => {
    const dateKey = dateObj.toISOString().split('T')[0];
    setSelectedDate(dateKey);

    // If no entry for this date, create a blank one in local state
    if (!logs[dateKey]) {
      setLogs((prev) => ({
        ...prev,
        [dateKey]: {
          date: dateKey,
          exerciseGoal: '',
          minutesExercise: '',
          typesOfExercise: '',
        },
      }));
    }
  };

  // Called whenever a text field changes
  const handleChange = (field, value) => {
    if (!selectedDate) return;
    setLogs((prev) => ({
      ...prev,
      [selectedDate]: {
        ...prev[selectedDate],
        [field]: value,
      },
    }));
    saveToFirestore(selectedDate);
  };

  // Save (or update) the doc in Firestore
  const saveToFirestore = async (dateKey) => {
    incrVal(1, "fire", true);
    incrVal(1, "gem", true);
    const entry = logs[dateKey];
    if (!entry) return;

    const docRef = doc(db, 'exerciseLogs', dateKey);
    try {
      await setDoc(docRef, {
        date: entry.date,
        exerciseGoal: entry.exerciseGoal,
        minutesExercise: parseFloat(entry.minutesExercise) || 0,
        typesOfExercise: entry.typesOfExercise,
      });
      console.log(`Saved exercise log for ${dateKey}`);
    } catch (error) {
      console.error('Error saving exercise log:', error);
    }
  };

  const currentEntry = selectedDate ? logs[selectedDate] : null;

  return (
    <View style={styles.container}>
      {/* Purple Header - match your design */}
      <Text style={styles.title}>Exercise Log </Text>
      {/* Calendar */}
      {!selectedDate &&(
        <Calendar onDateSelect={handleDateSelect} />
      )
      }

      {/* Fields */}
      {selectedDate && currentEntry && (
        <ScrollView style={styles.formContainer}>
          <TouchableOpacity 
              onPress={() => {setSelectedDate(null)}} 
              style={styles.answerButton}
          >
              <Text style={styles.navText}>Go Back To Calendar</Text>
          </TouchableOpacity>
          <Text style={styles.dateText}>Date: {selectedDate}</Text>

          <Text style={styles.label}>Exercise Goal:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.exerciseGoal}
            onChangeText={(val) => handleChange('exerciseGoal', val)}
            placeholder="e.g. 30 minutes daily"
          />

          <Text style={styles.label}>Minutes Exercising:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.minutesExercise}
            onChangeText={(val) => handleChange('minutesExercise', val)}
            placeholder="e.g. 45"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Types of Exercise:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.typesOfExercise}
            onChangeText={(val) => handleChange('typesOfExercise', val)}
            placeholder="e.g. Running, Yoga"
          />
           <TouchableOpacity 
              onPress={() => {setSelectedDate(null)}} 
              style={styles.answerButton}
          >
              <Text style={styles.navButtonText}>Submit Goals</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </View>
  );
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3C9F7',
    // alignItems: 'center',
    paddingTop: 40,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Sniglet',
    color: '#000',
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
    fontFamily: 'Sniglet',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    fontFamily: 'Sniglet',
    color: '#000',
  },
  title: {
    fontSize: 28,
    marginBottom: 10,
    // Use your custom font here
    fontFamily: 'Sniglet',
  },
  inputBox: {
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
