import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import * as Progress from 'react-native-progress';
import logo from '../assets/logo.png'

const Library = () => {
  const items = [
    {
      title: 'Stepping\nStones',
      progress: 0.1,
      completed: false,
      image: require('../assets/book1.jpg'),
    },
    {
      title: 'Mind\nMatters',
      progress: 0.3,
      completed: false,
      image: require('../assets/book2.jpg'),
    },
    {
      title: 'Beating\nCOVID-19',
      progress: 1,
      completed: true,
      image: require('../assets/book3.jpg'),
    },
  ];

  return (
    <View style={styles.container}>
      {/*<Image source={require('../assets/logo.png')} style={styles.logo}></Image>*/}
      <Text style={styles.header}>Library</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={{flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title}>{item.title}</Text>
            <Progress.Bar progress={item.progress} width={null} color='#C65FCF' height ={20} borderRadius ={10} style={styles.progress} />
            <Text style={styles.progressText}>
              {item.completed ? 'Claimed Reward' : `${Math.round(item.progress * 100)}% complete`}
            </Text>
          </View>
          <Image source={item.image} style={styles.image} />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  /*
  logo: {
    width: 125,
    height: 95, 
    resizeMode: 'contain',
  },
  */
  header: {
    marginTop: 20,
    fontSize: 45,
    marginBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
    borderRadius: 10,
    padding: 10,
    marginVertical: 20,
    width: '90%',
    height: '20%',
    shadowColor: '#000',
    borderWidth: 2,
    borderColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 120,
    resizeMode: 'contain',
    marginRight: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'black',
  },
  title: {
    fontSize: 27,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  progress: {
    backgroundColor: '#616161',
    height: '20%',
    width: '90%',
    borderRadius: 5,
    marginVertical: 5,
  },
  progressText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default Library;