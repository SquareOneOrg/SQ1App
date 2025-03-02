import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import Calendar from './Calendar';
import { db } from '../firebase-config';
import {
  collection,
  doc,
  getDocs,
  setDoc,
} from 'firebase/firestore';

export default function NutritionLog() {
  const [logs, setLogs] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);

  // Load existing docs from Firestore => "nutritionLogs" collection
  useEffect(() => {
    const colRef = collection(db, 'nutritionLogs');
    getDocs(colRef)
      .then((snapshot) => {
        const loaded = {};
        snapshot.docs.forEach((docSnap) => {
          const data = docSnap.data();
          loaded[docSnap.id] = {
            date: data.date || docSnap.id,
            nutritionGoal: data.nutritionGoal || '',
            ouncesWater: data.ouncesWater ? String(data.ouncesWater) : '',
            servingsFruit: data.servingsFruit ? String(data.servingsFruit) : '',
            servingsVeggies: data.servingsVeggies
              ? String(data.servingsVeggies)
              : '',
          };
        });
        setLogs(loaded);
      })
      .catch((error) => {
        console.error('Error fetching nutrition logs:', error);
      });
  }, []);

  const handleDateSelect = (dateObj) => {
    const dateKey = dateObj.toISOString().split('T')[0];
    setSelectedDate(dateKey);

    if (!logs[dateKey]) {
      setLogs((prev) => ({
        ...prev,
        [dateKey]: {
          date: dateKey,
          nutritionGoal: '',
          ouncesWater: '',
          servingsFruit: '',
          servingsVeggies: '',
        },
      }));
    }
  };

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

  const saveToFirestore = async (dateKey) => {
    const entry = logs[dateKey];
    if (!entry) return;

    const docRef = doc(db, 'nutritionLogs', dateKey);
    try {
      await setDoc(docRef, {
        date: entry.date,
        nutritionGoal: entry.nutritionGoal,
        ouncesWater: parseFloat(entry.ouncesWater) || 0,
        servingsFruit: parseFloat(entry.servingsFruit) || 0,
        servingsVeggies: parseFloat(entry.servingsVeggies) || 0,
      });
      console.log(`Saved nutrition log for ${dateKey}`);
    } catch (error) {
      console.error('Error saving nutrition log:', error);
    }
  };

  const currentEntry = selectedDate ? logs[selectedDate] : null;

  return (
    <View style={styles.container}>
      {/* Purple Header */}
      <View style={styles.headerBar}>
        <Text style={styles.headerText}> Nutrition Log</Text>
      </View>

      <Calendar onDateSelect={handleDateSelect} />

      {selectedDate && currentEntry && (
        <ScrollView style={styles.formContainer}>
          <Text style={styles.dateText}>Date: {selectedDate}</Text>

          <Text style={styles.label}>Nutrition Goal:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.nutritionGoal}
            onChangeText={(val) => handleChange('nutritionGoal', val)}
            placeholder="e.g. Balanced meal"
          />

          <Text style={styles.label}>Ounces of water:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.ouncesWater}
            onChangeText={(val) => handleChange('ouncesWater', val)}
            placeholder="e.g. 64"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Servings of fruit:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.servingsFruit}
            onChangeText={(val) => handleChange('servingsFruit', val)}
            placeholder="e.g. 2"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Servings of vegetables:</Text>
          <TextInput
            style={styles.inputBox}
            value={currentEntry.servingsVeggies}
            onChangeText={(val) => handleChange('servingsVeggies', val)}
            placeholder="e.g. 3"
            keyboardType="numeric"
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
