import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function SleepLog() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sleep Log</Text>
      {/* Placeholder for your calendar component */}
      <Text style={styles.text}>Placeholder for the calendar.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', 
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20, 
  },
  text: {
    fontSize: 16,
  },
});

export default SleepLog;
