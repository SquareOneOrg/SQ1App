import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import * as Progress from 'react-native-progress';
import logo from '../assets/logo.png'

const images = {
  'Final Stepping Stones Digital-part-1': require('../books/Final Stepping Stones Digital-part-1.jpg'),
  'Final Stepping Stones Digital-part-2': require('../books/Final Stepping Stones Digital-part-2.jpg'),
  // Add more as necessary
};

const Library = () => {
  const items = [
    {
      title: 'Stepping\nStones',
      jpg_title_path: '../books/Final Stepping Stones Digital-part-',
      progress: 0.1,
      completed: false,
      part: 1,
      image: images['Final Stepping Stones Digital-part-1'],
    },
    {
      title: 'Mind\nMatters',
      progress: 0.3,
      completed: false,
      part: 1,
      image: require('../assets/book2.jpg'),
    },
    {
      title: 'Beating\nCOVID-19',
      progress: 1,
      completed: true,
      part: 1,
      image: require('../assets/book3.jpg'),
    },
  ];
  const [selectedImage, setSelectedImage] = useState(null);

  const handlePress = (item) => {
    console.log(`Pressed on ${item.title}`);
    if (item.title === 'Stepping\nStones') {
      const nextPart = item.part + 1;
      const imageKey = `${item.jpg_title_path}${nextPart}`;
      if (images[imageKey]) {
        setSelectedImage(images[imageKey]);
        // Update the part in a stateful manner if needed
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Library</Text>
      {items.map((item, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.card}
          onPress={() => handlePress(item)}
        >
          <View style={{flex: 1, justifyContent: 'center'}}>
            <Text style={styles.title}>{item.title}</Text>
            <Progress.Bar progress={item.progress} width={null} color='#C65FCF' height={20} borderRadius={10} style={styles.progress} />
            <Text style={styles.progressText}>
              {item.completed ? 'Claimed Reward' : `${Math.round(item.progress * 100)}% complete`}
            </Text>
          </View>
          {/* <Image source={selectedImage} style={styles.fullImage} /> */}
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
      ))}
      {selectedImage && (
        <Image source={selectedImage} style={styles.fullImage} />
      )}
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
  fullImage: {
    width: 300, // Set width as per your layout needs
    height: 700, // Set height as per your layout needs
    marginTop: 20,
    resizeMode: 'contain',
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