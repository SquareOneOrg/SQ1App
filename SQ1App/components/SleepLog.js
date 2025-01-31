import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Calendar from './Calendar';  // Adjust the path as needed

// SleepLogHeader component defined directly in this file
const SleepLogHeader = () => {
  return (
    <View style={styles.headerGrid}>
      <Image
        source={require('../assets/sleep.png')}  // Make sure the path to your image is correct
        style={styles.headerIcon}
      />
      <Text style={styles.headerText}>Sleep Log</Text>
    </View>
  );
};

function SleepLog() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [entries, setEntries] = useState([]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setEntries([...entries, { date: date.toLocaleDateString(), data: 'New Entry' }]);
  };

  return (
    <View style={styles.container}>
      <SleepLogHeader />
      <Calendar onDateSelect={handleDateSelect} />
      {entries.map((entry, index) => (
        <View key={index} style={styles.grid}>
          <Text style={styles.gridTitle}>{entry.date}</Text>
          <Text>{entry.data}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingTop: 100,
  },
  headerGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingHorizontal: 105,
    backgroundColor: '#D08BFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33363F',
    marginHorizontal: 20,
    marginTop: -50,
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 8,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Sniglet',
  },
  grid: {
    padding: 23,
    paddingHorizontal: 90,
    backgroundColor: '#D08BFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33363F',
    margin: 10,
  },
  gridTitle: {
    fontSize: 18,
    fontFamily: 'Sniglet',
  },
});

export default SleepLog;
