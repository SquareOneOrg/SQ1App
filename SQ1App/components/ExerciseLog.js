import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Calendar from './Calendar'; // The same Calendar component you used before
import { db } from '../firebase-config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

export default function ExerciseLog() {
  // Logs keyed by date => logs[dateString] = { date, exerciseGoal, minutesExercise, typesOfExercise }
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

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
      <View style={styles.headerBar}>
        <Text style={styles.headerText}>⚡ Exercise Log</Text>
      </View>

      {/* Calendar */}
      <Calendar onDateSelect={handleDateSelect} />

      {/* Fields */}
      {selectedDate && currentEntry && (
        <ScrollView style={styles.formContainer}>
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
    alignItems: 'center',
    paddingTop: 70,
  },
  headerBar: {
    backgroundColor: '#D08BFA',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33363F',
    marginBottom: 10,
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Sniglet',
    color: '#000',
  },
  formContainer: {
    width: '90%',
    backgroundColor: '#D08BFA',
    borderRadius: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#33363F',
    marginTop: 10,
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
  inputBox: {
    backgroundColor: '#F0F5FF',
    borderWidth: 1,
    borderColor: '#33363F',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontFamily: 'Sniglet',
    color: '#000',
  },
});
