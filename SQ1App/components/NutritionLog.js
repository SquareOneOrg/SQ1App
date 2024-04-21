import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const NutritionLogHeader = () => {
  return (
    <View style={styles.headerGrid}>
      <Image
        source={require('../assets/nutrition.png')}
        style={styles.headerIcon}
      />
      <Text style={styles.headerText}>Nutrition Log</Text>
    </View>
  );
};

function NutritionLog() {
  return (
    <View style={styles.container}>
      <NutritionLogHeader />
      <View style={styles.gridsContainer}></View>
      <View style={styles.contentWrapper}>
        <Image source={require('../assets/calendar.png')} style={styles.calendarImage} />
        <View style={styles.gridsContainer}>
          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Nutrition Goal:</Text>
          </View>

          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Ounces of water:</Text>
          </View>

          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Servings of fruit:</Text>
          </View>
          <View style={styles.grid}>
            <Text style={styles.gridTitle}>Servings of vegetables:</Text>
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
    paddingTop: 70,
    paddingHorizontal: 0,
  },
  contentWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  calendarImage: {
    width: '110%',
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: 'contain',
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
  },
  gridsContainer: {
    marginTop: 10,
  },
  grid: {
    padding: 18,
    paddingHorizontal: 110,
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
  },
});

export default NutritionLog;
