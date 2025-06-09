// components/ExerciseSummary.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function ExerciseSummary({ onClose }) {
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [avgMinutes, setAvgMinutes] = useState(0);
  const [favType, setFavType] = useState('—');
  const [goalPercent, setGoalPercent] = useState(0);

  // Your per‑day goal and weekly target:
  const goalMinutes = 30;   // 30 min per day
  const goalDays    = 5;    // 5 days a week

  useEffect(() => {
    fetchAndCompute();
  }, []);

  async function fetchAndCompute() {
    const snap = await getDocs(collection(db, 'exerciseLogs'));
    const logs = [];
    snap.forEach(doc => {
      const d = doc.data();
      logs.push({
        date: d.date,
        minutes: d.minutesExercising || 0,
        type:    d.exerciseType || 'Unknown',
      });
    });

    logs.sort((a,b)=>new Date(a.date)-new Date(b.date));

    // compute streaks & averages
    let cur = 0, best = 0, total = 0, counts = 0;
    const typeCounts = {};
    let prevDate = null;

    logs.forEach(({date, minutes, type})=>{
      total += minutes;
      counts++;
      // favorite type tally
      typeCounts[type] = (typeCounts[type]||0)+1;

      const meets = minutes >= goalMinutes;
      if (meets) {
        if (prevDate && isNextDay(prevDate,date)) cur++;
        else cur = 1;
        best = Math.max(best, cur);
        prevDate = date;
      } else {
        cur = 0;
        prevDate = null;
      }
    });

    // find mode of exercise types
    let fav = Object.keys(typeCounts).reduce((a,b)=> typeCounts[a]>typeCounts[b]?a:b,'—');

    // goal progress (% of required days)
    const metCount = logs.filter(l=>l.minutes>=goalMinutes).length;
    const weeks = logs.length/7;
    const needed = goalDays * weeks;
    const percent = needed>0 ? metCount/needed : 0;

    setCurrentStreak(cur);
    setBestStreak(best);
    setAvgMinutes(counts>0 ? total/counts : 0);
    setFavType(fav);
    setGoalPercent(percent);
  }

  return (
    <View style={styles.container}>
      <Button title="Close" onPress={onClose} />

      <Text style={styles.title}>Exercise</Text>

      <Text style={styles.message}>
        You are {Math.round(goalPercent*100)}% of the way to your goal of
        getting {goalMinutes} minutes of exercise {goalDays} days a week!
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current Exercise Streak:</Text>
        <Text style={styles.value}>{currentStreak}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Best Exercise Streak:</Text>
        <Text style={styles.value}>{bestStreak}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Average Minutes of Exercise:</Text>
        <Text style={styles.value}>{avgMinutes.toFixed(1)}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Favorite Type of Exercise:</Text>
        <Text style={styles.value}>{favType}</Text>
      </View>
    </View>
  );
}

function isNextDay(a,b){
  const dA=new Date(a), dB=new Date(b);
  return ((dB-dA)/(1000*60*60*24))===1;
}

const styles = StyleSheet.create({
  container:{ flex:1, padding:20, backgroundColor:'#8B93FF' },
  title:{ fontSize:32, fontFamily:'Sniglet', textAlign:'center', marginVertical:10 },
  message:{ fontFamily:'Sniglet', textAlign:'center', marginBottom:20 },
  card:{
    flexDirection:'row', justifyContent:'space-between',
    backgroundColor:'#D08BFA', padding:10, borderRadius:10,
    borderWidth:1, borderColor:'#33363F', marginVertical:6
  },
  label:{ fontFamily:'Sniglet' },
  value:{ fontFamily:'Sniglet', fontWeight:'bold' },
});
