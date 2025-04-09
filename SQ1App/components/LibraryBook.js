import React, {useState, useContext, useEffect} from 'react';
import imageMap from './ImageMap';
import { View, Image, Text, StyleSheet, TouchableOpacity, } from 'react-native';
import { AppContext } from '../AppContext';
import { doc, setDoc } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import {pageNumbers} from './PopupQuestions';


function LibraryBook() {
    const {username} = useUser();
    const { setCurrentView, setViewParams, viewParams } = useContext(AppContext);
    const [popupQuestion, setPopupQuestion] = useState(false);
    const { part, length, map_key } = viewParams;
    const image = `${map_key}${part}`;
    const [firstBook, setFirstBook] = useState(false);
    const result = (part / length).toFixed(2);
    // setFirstBook(map_key === 'step-');
      useEffect(() => {
        setFirstBook(map_key === 'step-');
      }, [map_key]); // runs when map_key changes
      
      useEffect(() => {
        updateProgress(result);
        findPopUp();
      }, [result, map_key]);

    const findPopUp = () => {
        if (map_key === 'step-' && pageNumbers.has(part)) {
            setPopupQuestion(true);
        }
    }

    console.log('popUpQuestion', popupQuestion)

    const updateProgress = async(progress) => {
        // console.log("progress", progress);
        try {
            // console.log('result', result)
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);
            const userDoc = querySnapshot.docs[0];
            const fieldToUpdate = firstBook ? { steppingStonesProgress: progress } : { covidProgress: progress };
            await setDoc(doc(db, "users", userDoc.id), fieldToUpdate, { merge: true });
            // console.log('progress correctly updated')
        }
        catch {
            console.error("Firestore update error:", error);
            Alert.alert("Error", "Something went wrong. Please try again later.");
        }
    }
    // updateProgress(result);
    // findPopUp();
    console.log('popup', popupQuestion)

    const goPrevious = () => {
        if (part - 1 > 0){
            setViewParams({
                part: part - 1,
                length: length,
                map_key: map_key,
              });
            setCurrentView('librarybook');
        }
    }
    const goNext = () => {
        if (popupQuestion) {
            setViewParams({
                part: part,
                part_ind: 0,
                length: length,
                map_key: map_key,
              });
            setCurrentView('questionpopup');
        }
        else {
            if (part + 1 <= length) {
                setViewParams({
                    part: part + 1,
                    length: length,
                    map_key: map_key,
                  });
                setCurrentView('librarybook');
            }
            else if (part + 1 == length + 1) {
                setViewParams({
                    length: length,
                    map_key: map_key,
                  });
                setCurrentView('resourcetransition');
            }
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image 
                    source={imageMap[image]}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.buttonContainer}>
            <TouchableOpacity 
                    onPress={() => goPrevious(map_key, part, length)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => goNext(map_key, part, length)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      },
      imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 0,
      },
    image: {
        width: '100%',
        height: '82%',
        aspectRatio: 82 / 100,   
        borderWidth: 4,
        borderColor: '#000',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'row',
        gap: 200,
        justifyContent: 'space-between',
    },
    navButton: {
        borderWidth: 2,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
    },
    navButtonText: {
        fontSize: 20,
        fontFamily: 'Sniglet',
        padding: 4,
    },
    answerButton: {
        padding: 4,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 2,
        
    },
    answerSpace: {
        marginVertical: 10,
    },
    answersContainer: {
        width: '60%',
        marginBottom: 20,
    },
    questionContainer: {
        padding: 10,
        borderWidth: 2,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
    },
    questionText: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Sniglet',
    },
});


export default LibraryBook;