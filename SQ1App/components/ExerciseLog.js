import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ExerciseLogHeader = () => {
  return (
    <View style={styles.headerGrid}>
      <Image
        source={require('../assets/exercise.png')}
        style={styles.headerIcon}
      />
      <Text style={styles.headerText}>Exercise Log</Text>
    </View>
  );
};

function ExerciseLog() {
  return (
    <View style={styles.container}>
      <ExerciseLogHeader />
      <View style={styles.gridsContainer}></View>
      <View style={styles.contentWrapper}>
        <Image source={require('../assets/calendar.png')} style={styles.calendarImage} />
        <View style={styles.gridsContainer}>
          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Exercise Goal:</Text>
          </View>

          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Minutes Exercising:</Text>
          </View>

          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Types of Exercise:</Text>
          </View>
        </View>
      </View>
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
    paddingHorizontal: 0,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  calendarImage: {
    width: '105%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  headerGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
    paddingHorizontal: 90,
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
  gridsContainer: {
    marginTop: 10,
  },
  grid: {
    padding: 23,
    paddingHorizontal: 120,
    marginHorizontal: 0,
    marginTop: 10,
    backgroundColor: '#D08BFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33363F',
  },
  gridTitle: {
    fontSize: 18,
    marginLeft: -70,
    fontFamily: 'Sniglet',
  },
});

export default ExerciseLog;
