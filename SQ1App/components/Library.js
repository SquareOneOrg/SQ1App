import React, {useState, useContext} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { AppContext } from '../AppContext';

const images = {
  'Final Stepping Stones Cover': require('../assets/books/stepping-stones/Final Stepping Stones Digital-part-1.jpg'),
  'Covid Curriculum Cover': require('../assets/books/covid-resources/Covid Curriculum, For Kindle-1.jpg'),
};

function Library() {
  // const navigation = useNavigation();
  const { setCurrentView, setViewParams } = useContext(AppContext);
  const items = [
    {
      title: 'Stepping\nStones',
      progress: 0,
      map_key: 'step-',
      completed: false,
      part: 1,
      length: 44,
      image: images['Final Stepping Stones Cover'],
    },
    {
      title: 'Beating\nCOVID-19',
      progress: 0,
      completed: false,
      map_key: 'covid-',
      length: 16,
      part: 1,
      image: images['Covid Curriculum Cover'],
    },
  ];
  const [selectedImage, setSelectedImage] = useState(null);


  const handlePress = (item) => {
    if (item.title == 'Stepping\nStones') {
      console.log('passed')
      setViewParams({
        questionIndex: 0,
        part: item.part,
        length: item.length,
        map_key: item.map_key,
      });
      console.log('params set')
      setCurrentView('questionnaire');
      // navigation.navigate( 'Questionnaire', {questionIndex: 0, part: item.part, length: item.length, map_key: item.map_key})
    }
    else {
      setViewParams({
        part: item.part,
        length: item.length,
        map_key: item.map_key,
      });
      setCurrentView('LibraryBook');
    }
    // navigation.navigate( 'Questionnaire', {questionIndex: 0, part: item.part, length: item.length, map_key: item.map_key})
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
    fontFamily: 'Sniglet',
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
    width: 300,
    height: 700,
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
    fontFamily: 'Sniglet',
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
    fontFamily: 'Sniglet',
  },
});

export default Library;