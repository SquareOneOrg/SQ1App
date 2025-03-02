// PersonalDataSleep.js (sleep summary modal or screen)

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { db } from '../firebase-config'; 
import { collection, getDocs } from 'firebase/firestore';

export default function PersonalDataSleep({ onClose }) {
  // State for the computed stats
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [averageHours, setAverageHours] = useState(0);
  const [averageQuality, setAverageQuality] = useState(''); 
  const [goalProgress, setGoalProgress] = useState(0); 

  // For demonstration, these can be changed or fetched from user settings
  const goalHours = 8; // e.g. 8 hours per night
  const goalNights = 5; // e.g. 5 nights a week

  useEffect(() => {
    fetchAndComputeStats();
  }, []);

  // Fetch all "sleepLogs" from Firestore, then compute stats
  async function fetchAndComputeStats() {
    try {
      const colRef = collection(db, 'sleepLogs');
      const snapshot = await getDocs(colRef);

      // Build an array of logs
      const logs = [];
      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        logs.push({
          date: data.date,
          hoursSleep: data.hoursSleep || 0,
          quality: data.quality || null, // optional if you have a "quality" field
        });
      });

      // Sort logs by date ascending if needed
      logs.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Compute stats
      const {
        bestStreakValue,
        currentStreakValue,
        avgHours,
        avgQualityText,
        goalPercent
      } = computeSleepStats(logs, goalHours, goalNights);

      // Update state
      setBestStreak(bestStreakValue);
      setCurrentStreak(currentStreakValue);
      setAverageHours(avgHours);
      setAverageQuality(avgQualityText);
      setGoalProgress(goalPercent);
    } catch (error) {
      console.error('Error fetching sleep logs:', error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryContainer}>
        {/* A "Close" button that calls onClose (passed in from the parent) */}
        <Button title="Close" onPress={onClose} />

        <Text style={styles.title}>Sleep Summary</Text>
        
        <Text style={styles.message}>
          You are {Math.round(goalProgress * 100)}% of the way to your goal of
          getting {goalHours} hours of sleep {goalNights} nights a week!
        </Text>

        {/* Stats Cards */}
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Current Goal Streak:</Text>
          <Text style={styles.statValue}>{currentStreak}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Best Sleep Streak:</Text>
          <Text style={styles.statValue}>{bestStreak}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Hours of Sleep:</Text>
          <Text style={styles.statValue}>{averageHours.toFixed(1)}</Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Average Quality of Sleep:</Text>
          <Text style={styles.statValue}>{averageQuality}</Text>
        </View>
      </View>
    </View>
  );
}

/**
 * Computes multiple metrics like average hours, streaks, and goal progress.
 *
 * @param {Array} logs - e.g. [{ date: "2025-01-10", hoursSleep: 7.5, quality: "Good" }, ...]
 * @param {number} goalHours - e.g. 8
 * @param {number} goalNights - e.g. 5
 * @returns {Object} - { bestStreakValue, currentStreakValue, avgHours, avgQualityText, goalPercent }
 */
function computeSleepStats(logs, goalHours, goalNights) {
  let totalHours = 0;
  let sumQuality = 0; 
  let count = logs.length;

  let currentStreak = 0;
  let bestStreak = 0;
  let prevDate = null;

  logs.forEach((entry) => {
    totalHours += entry.hoursSleep;

    // Optional "quality" logic (mapping "Poor"/"Ok"/"Good"/"Great" to 1..4)
    let qualityScore = 3; // default "Ok"
    switch (entry.quality) {
      case 'Poor': qualityScore = 1; break;
      case 'Ok': qualityScore = 2; break;
      case 'Good': qualityScore = 3; break;
      case 'Great': qualityScore = 4; break;
      default: qualityScore = 3; // if null or missing
    }
    sumQuality += qualityScore;

    // Streak: if hoursSleep >= goalHours => continuing or reset streak
    const meetsGoal = entry.hoursSleep >= goalHours;
    if (meetsGoal) {
      if (prevDate && isNextDay(prevDate, entry.date)) {
        currentStreak++;
      } else {
        currentStreak = 1;
      }
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
      prevDate = entry.date;
    } else {
      currentStreak = 0;
      prevDate = null;
    }
  });

  let avgHours = count > 0 ? totalHours / count : 0;
  let avgQualityScore = count > 0 ? sumQuality / count : 0;

  // Convert the average quality back to text
  let avgQualityText = 'Ok';
  if (avgQualityScore >= 3.5) avgQualityText = 'Great';
  else if (avgQualityScore >= 2.5) avgQualityText = 'Good';
  else if (avgQualityScore >= 1.5) avgQualityText = 'Ok';
  else avgQualityText = 'Poor';

  // Example "goalPercent" calculation:
  // how many logs had >= 8 hours? Out of how many needed for '5 nights a week'?
  const nightsMeetingGoal = logs.filter(e => e.hoursSleep >= goalHours).length;
  // Approx # of weeks in the logs => logs.length / 7
  // Then total needed => goalNights * weeks
  const totalNeeded = goalNights * (logs.length / 7);
  const goalPercent = totalNeeded > 0 ? nightsMeetingGoal / totalNeeded : 0;

  return {
    bestStreakValue: bestStreak,
    currentStreakValue: currentStreak,
    avgHours,
    avgQualityText,
    goalPercent
  };
}

// Helper to check if dateB is the day after dateA
function isNextDay(dateA, dateB) {
  const dA = new Date(dateA);
  const dB = new Date(dateB);
  const diff = (dB - dA) / (1000 * 60 * 60 * 24);
  return diff === 1;
}

// ---------- Styles ----------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3C9F7',
    paddingTop: 50,
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: '#8B93FF',
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
    padding: 20,
    borderWidth: 1,
    borderColor: '#33363F',
  },
  title: {
    fontSize: 32,
    fontFamily: 'Sniglet',
    marginBottom: 10,
    color: '#000',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Sniglet',
  },
  statCard: {
    width: '90%',
    backgroundColor: '#D08BFA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#33363F',
    padding: 10,
    marginVertical: 6,
  },
  statLabel: {
    fontSize: 16,
    fontFamily: 'Sniglet',
    color: '#000',
  },
  statValue: {
    fontSize: 16,
    fontFamily: 'Sniglet',
    color: '#000',
    marginTop: 4,
  },
});
