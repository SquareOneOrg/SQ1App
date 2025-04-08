import React, {useContext} from 'react';
import { steppingStonesQuiz } from './QuestionData.js';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';
import { doc, setDoc } from 'firebase/firestore';
import { useUser } from '../context/UserContext';


function Questionnaire() {
    // set preTest or postTest in viewParams
    const { username } = useUser();
    const { setCurrentView, setViewParams, viewParams } = useContext(AppContext);
    const { questionIndex, part, length, map_key, testScore, takePreTest } = viewParams;
    const questionLength = steppingStonesQuiz.length

    const recordTest = async(recordPre, score) => {
        console.log('score', score)
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', username));
        const querySnapshot = await getDocs(q);
        const userDoc = querySnapshot.docs[0];
        const userRef = doc(db, 'users', userDoc.id);
        // change this into a trycatch
        if (recordPre) {
            await updateDoc(userRef, {
                [preTest]: score,
            });
        }
        else {
            await updateDoc(userRef, {
                [postTest]: score,
            });
        }
    }
    const fillAnswer = (questionIndex, index) => {
        if (questionIndex + 1 < questionLength) {
            setViewParams({
                questionIndex: questionIndex + 1,
                part: part,
                length: length,
                map_key: map_key,
                testScore: index == steppingStonesQuiz[questionIndex].correctAnswer ? testScore + 1 : testScore,
                takePreTest: takePreTest,
                });
            setCurrentView('questionnaire');
        }
        else {
            recordTest(takePreTest, testScore);
            if (takePreTest) {
                setViewParams({
                    part: part,
                    length: length,
                    map_key: map_key,
                });
                setCurrentView('librarybook');
            }
            else {
                setCurrentView('endpage');
            }
        }
    }
    const goPrevious = () => {
        if (questionIndex  - 1 > 0){
            setViewParams({
                questionIndex: questionIndex - 1,
                part: part,
                length: length,
                map_key: map_key,
              });
            setCurrentView('Questionnaire');
        }
    }
    const goNext = () => {
        if (questionIndex + 1 < questionLength) {
            setViewParams({
                questionIndex: questionIndex + 1,
                part: part,
                length: length,
                map_key: map_key,
              });
            setCurrentView('questionnaire');
        }
        else {
            if (part < length) {
                setViewParams({
                    part: part,
                    length: length,
                    map_key: map_key,
                  });
                setCurrentView('librarybook');
            }
            else {
                setCurrentView('endpage');
            }
        }
    }
    return (
        //need to add user data storage later
        <View style={styles.container}>
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>{steppingStonesQuiz[questionIndex].question}</Text>
            </View>
            <View style={styles.answersContainer}>
                {steppingStonesQuiz[questionIndex].options.map((option, index) => (
                    <View key={index} style={styles.answerSpace}> 
                        <TouchableOpacity 
                            onPress={() => fillAnswer(questionIndex, index)} 
                            style={styles.answerButton}
                        >
                            <Text style={styles.navButtonText}>{option}</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => goPrevious(questionIndex)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => goNext(questionIndex)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Skip</Text>
                </TouchableOpacity>
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightblue',
      },
    header: {
        marginTop: 20,
        fontSize: 45,
        marginBottom: 20,
        backgroundColor: 'darkblue',
        fontFamily: 'Sniglet',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 200,
        justifyContent: 'space-between',
    },
    answerButton: {
        padding: 4,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        borderWidth: 2,
        
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

export default Questionnaire;