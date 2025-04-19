// components/NutritionSummary.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { db } from '../firebase-config';
import { collection, getDocs } from 'firebase/firestore';

export default function NutritionSummary({ onClose }) {
  const [bestStreak, setBestStreak] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [avgWater, setAvgWater] = useState(0);
  const [goalPercent, setGoalPercent] = useState(0);

  const waterGoal = 64;  // e.g. 64 oz per day
  const goalDays  = 5;   // 5 days a week

  useEffect(() => {
    fetchAndCompute();
  }, []);

  async function fetchAndCompute() {
    const snap = await getDocs(collection(db,'nutritionLogs'));
    const logs = [];
    snap.forEach(doc=> {
      const d=doc.data();
      logs.push({
        date: d.date,
        water: d.ouncesOfWater || 0,
      });
    });

    logs.sort((a,b)=>new Date(a.date)-new Date(b.date));

    let cur=0,best=0,total=0,cnt=0,prev=null;
    logs.forEach(({date,water})=>{
      total+=water; cnt++;
      const meets = water>=waterGoal;
      if (meets){
        if (prev && isNextDay(prev,date)) cur++;
        else cur=1;
        best=Math.max(best,cur);
        prev=date;
      } else {
        cur=0; prev=null;
      }
    });

    const metCount = logs.filter(l=>l.water>=waterGoal).length;
    const weeks = logs.length/7;
    const needed = weeks*goalDays;
    const percent = needed>0 ? metCount/needed : 0;

    setCurrentStreak(cur);
    setBestStreak(best);
    setAvgWater(cnt>0? total/cnt : 0);
    setGoalPercent(percent);
  }

  return (
    <View style={styles.container}>
      <Button title="Close" onPress={onClose} />

      <Text style={styles.title}>Nutrition</Text>
      <Text style={styles.message}>
        You are {Math.round(goalPercent*100)}% toward your goal of drinking
        {waterGoal} oz of water {goalDays} days a week!
      </Text>

      <View style={styles.card}>
        <Text style={styles.label}>Current Hydration Streak:</Text>
        <Text style={styles.value}>{currentStreak}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Best Hydration Streak:</Text>
        <Text style={styles.value}>{bestStreak}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.label}>Average Ounces of Water:</Text>
        <Text style={styles.value}>{avgWater.toFixed(1)}</Text>
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
