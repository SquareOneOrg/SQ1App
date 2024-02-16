import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ActivitiesPage() {
  // Define your activities here
  const activities = [
    {
      title: 'Student Exercise Log',
      icon: 'flash-outline',
      color: 'yellow',
    },
    {
      title: 'Student Sleep Log',
      icon: 'bed-outline',
      color: 'purple',
    },
    {
      title: 'Student Nutrition Log',
      icon: 'fast-food-outline',
      color: 'orange',
    },
  ];

  return (
    <View style={styles.container}>
      {/* statusbar*/}
      <Text style={styles.header}>Activity Hub</Text>
      {activities.map((activity, index) => (
        <TouchableOpacity key={index} style={[styles.card, { backgroundColor: activity.color }]}>
          <Ionicons name={activity.icon} size={30} color="white" />
          <Text style={styles.title}>{activity.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f7', // Adjusted to match the ActivitiesPage's background color
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    color: 'black',
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },
});
