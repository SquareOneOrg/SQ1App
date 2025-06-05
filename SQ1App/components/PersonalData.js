// PersonalData.js
import TutorialOverlay from './TutorialOverlay'
import { useTutorial } from './TutorialContext';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image
} from 'react-native';

import NutritionSummary from '../components/NutritionSummary';
import ExerciseSummary  from '../components/ExerciseSummary';
import SleepSummary     from '../components/SleepSummary';

export default function PersonalData() {
  const [isNutritionVisible, setNutritionVisible] = useState(false);
  const [isExerciseVisible,  setExerciseVisible]  = useState(false);
  const [isSleepVisible,     setSleepVisible]     = useState(false);

  const {  tutorialStep, setShowTutorial, setTutorialStep } = useTutorial();


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Data</Text>

      {/* Nutrition */}
      <TouchableOpacity
        style={styles.links}
        onPress={() => setNutritionVisible(true)}
      >
        <Image
          source={require('../assets/nutrition.png')}
          style={styles.image}
        />
        <Text style={styles.linkTitles}>Nutrition</Text>
      </TouchableOpacity>
      <Modal
        visible={isNutritionVisible}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <NutritionSummary onClose={() => setNutritionVisible(false)} />
      </Modal>

      {/* Exercise */}
      <TouchableOpacity
        style={styles.links}
        onPress={() => setExerciseVisible(true)}
      >
        <Image
          source={require('../assets/exercise.png')}
          style={styles.exercise}
        />
        <Text style={styles.linkTitles}>Exercise</Text>
      </TouchableOpacity>
      <Modal
        visible={isExerciseVisible}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <ExerciseSummary onClose={() => setExerciseVisible(false)} />
      </Modal>

      {/* Sleep */}
      <TouchableOpacity
        style={styles.links}
        onPress={() => setSleepVisible(true)}
      >
        <Image
          source={require('../assets/sleep.png')}
          style={styles.image}
        />
        <Text style={styles.linkTitles}>Sleep</Text>
      </TouchableOpacity>
      <Modal
        visible={isSleepVisible}
        animationType="slide"
        presentationStyle="formSheet"
      >
        <SleepSummary onClose={() => setSleepVisible(false)} />
      </Modal>
      {tutorialStep === 5 && <TutorialOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 45,
    textAlign: 'center',
    marginBottom: 40,
    fontFamily: 'Sniglet',
  },
  links: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    paddingVertical: 25,
    paddingHorizontal: 40,
    backgroundColor: '#D9D9D9',
    borderWidth: 2,
    borderColor: '#33363F',
    borderRadius: 30,
  },
  linkTitles: {
    fontSize: 30,
    fontFamily: 'Sniglet',
  },
  image: {
    marginRight: 20,
  },
  exercise: {
    marginRight: 0,
    marginLeft: 0,
    marginTop: -10,
  },
});
