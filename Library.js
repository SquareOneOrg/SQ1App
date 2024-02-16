import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';

const Library = () => {
  // make sure to include images later
  const items = [
    {
      title: 'Stepping Stones',
      progress: 0.1,
      completed: false,
    },
    {
      title: 'Mind Matters',
      progress: 0.1,
      completed: false,
    },
    {
      title: 'Beating COVID-19',
      progress: 1,
      completed: true,
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Library</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.card}>
          {/*<Image source={item.image} style={styles.image} />*/}
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title}>{item.title}</Text>
            <Progress.Bar progress={item.progress} width={null} style={styles.progress} />
            {/* math computed to store the completed percentage */}
             {/** TEST AND CHANGE AS NEEDED */}
            <Text style={styles.progressText}>
              {item.completed ? 'Completed' : `${Math.round(item.progress * 100)}% complete`}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  progress: {
    backgroundColor: 'pink',
    borderRadius: 5,
    marginVertical: 5,
  },
  progressText: {
    fontSize: 14,
  },
});

export default Library;