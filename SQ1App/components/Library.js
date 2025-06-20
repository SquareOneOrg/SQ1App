import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from '../AppContext';
import { useUser } from '../context/UserContext';
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import TutorialOverlay from './TutorialOverlay';
import { useTutorial } from './TutorialContext';
import { useGems } from './GemContext.js';

const images = {
  'Final Stepping Stones Cover': require('../assets/books/stepping-stones/Final Stepping Stones Digital-part-1.jpg'),
  'Covid Curriculum Cover': require('../assets/books/covid-resources/Covid Curriculum, For Kindle-1.jpg'),
};

function Library() {
  const { username } = useUser();
  const { setCurrentView, setViewParams } = useContext(AppContext);
  const { incrVal } = useGems();
  const { tutorialStep, setShowTutorial, setTutorialStep } = useTutorial();

  const [bookProgress, setBookProgress] = useState([0, 0]);
  const [lifeCount, setLifeCount] = useState(0);
  const [gemCount, setGemCount] = useState(0);
  const [noLives, setNoLives] = useState(false);
  const [hasGems, setHasGems] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        const life = userData.heartNumber;
        const gems = userData.gemNumber;

        setLifeCount(life);
        setGemCount(gems);
        setBookProgress([
          Number(userData.steppingStonesProgress),
          Number(userData.covidProgress),
        ]);

        setNoLives(life === 0);
        setHasGems(gems >= 50);
      } catch (error) {
        console.error("Firestore update error:", error);
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    };

    fetchUserData();
  }, [username]);

  const incrementLife = () => {
    incrVal(1, "heart", true);
    incrVal(50, "gem", false); // Spend 50 gems
  };

  const handlePress = (item) => {
    if (noLives) return;

    if (item.title === 'Stepping\nStones') {
      setViewParams({
        questionIndex: 0,
        part: item.part,
        length: item.length,
        map_key: item.map_key,
      });
      setCurrentView('pretestexplanation');
    } else {
      setViewParams({
        book: 'covid',
        part: item.part,
        length: item.length,
        map_key: item.map_key,
      });
      setCurrentView('librarybook');
    }
  };

  const items = [
    {
      ind: 0,
      title: 'Stepping\nStones',
      map_key: 'step-',
      completed: false,
      part: 1,
      length: 44,
      image: images['Final Stepping Stones Cover'],
    },
    {
      ind: 1,
      title: 'Beating\nCOVID-19',
      map_key: 'covid-',
      completed: false,
      part: 1,
      length: 16,
      image: images['Covid Curriculum Cover'],
    },
  ];

  return (
    <View style={styles.container}>
      {noLives &&
        <View style={styles.ansContainer}>
          <Text style={styles.questionText}>You Are Out of Lives</Text>
          {hasGems &&
            <TouchableOpacity onPress={incrementLife} style={styles.navButton}>
              <Text>Buy More Lives (50 Gems)</Text>
            </TouchableOpacity>
          }
          <TouchableOpacity onPress={() => setNoLives(false)} style={styles.navButton}>
            <Text>Exit</Text>
          </TouchableOpacity>
        </View>
      }

      <Text style={styles.header}>Library</Text>
      {items.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.card}
          onPress={() => handlePress(item)}
        >
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text style={styles.title}>{item.title}</Text>
            <Progress.Bar
              progress={bookProgress[item.ind]}
              width={null}
              color="#C65FCF"
              height={20}
              borderRadius={10}
              style={styles.progress}
            />
            <Text style={styles.progressText}>
              {bookProgress[item.ind] === 1 ? 'Claimed Reward' : `${Math.round(bookProgress[item.ind] * 100)}% complete`}
            </Text>
          </View>
          <Image source={item.image} style={styles.image} />
        </TouchableOpacity>
      ))}

      {selectedImage && (
        <Image source={selectedImage} style={styles.fullImage} />
      )}

      {tutorialStep === 1 && <TutorialOverlay />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
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
    shadowOffset: { width: 0, height: 2 },
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
  ansContainer: {
    padding: 20,
    backgroundColor: '#fdd',
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#900',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: 'Sniglet',
  },
  navButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  fullImage: {
    width: 300,
    height: 700,
    marginTop: 20,
    resizeMode: 'contain',
  },
});

export default Library;
