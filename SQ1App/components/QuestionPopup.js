import React, {useState, useContext} from 'react';
import { popupQuestions} from './PopupQuestions';
import { AppContext } from '../AppContext';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function QuestionPopup() {
    const { setCurrentView, setViewParams, viewParams } = useContext(AppContext);
    const { part, length, map_key, part_ind } = viewParams;
    const [questionAns, setQuestionAns] = useState("");
    const [filledOut, setFilledOut] = useState(false);
    const fillAnswer = (ans_index) => {
        console.log(ans_index, part, part_ind)
        if (ans_index == popupQuestions[part][part_ind].ans) {
            setQuestionAns(popupQuestions[part][part_ind].correct);
        }
        else {
            setQuestionAns(popupQuestions[part][part_ind].incorrect);
        }
        setFilledOut(true);
    }
    const goPrevious = () => {
        if (part_ind - 1 >= 0){
            setViewParams({
                part: part,
                part_ind: part_ind - 1,
                length: length,
                map_key: map_key,
              });
            setCurrentView('questionpopup');
        }
        else {
            setViewParams({
                part: part,
                length: length,
                map_key: map_key,
              });
            setCurrentView('librarybook');
        }
    }
    console.log("question answer", questionAns)
    const goNext = () => {
        console.log("length", popupQuestions[part].length)
        if (part_ind + 1 < popupQuestions[part].length) {
            console.log("part and length", part, part_ind, length)
            setViewParams({
                part: part,
                part_ind: part_ind + 1,
                length: length,
                map_key: map_key,
              });
            setCurrentView('questionpopup');
        }
        else {
            console.log("part and length", part + 1, length)
            if (part + 1 < length) {
                setViewParams({
                    part: part + 1,
                    length: length,
                    map_key: map_key,
                  });
                setCurrentView('librarybook');
            }
            else {
                setViewParams({
                    steppingStone: true,
                  });
                setCurrentView('endpage');
            }
        }
    }

    return(
    <View style={styles.container}>
        {filledOut &&
        <View style={styles.ansContainer}>
            <Text style={styles.questionText}>{questionAns}</Text>
        </View>
        }
        <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{popupQuestions[part][part_ind].question}</Text>
        </View>
        <View style={styles.answersContainer}>
            {popupQuestions[part][part_ind].options.map((option, index) => (
                <View key={index} style={styles.answerSpace}> 
                    <TouchableOpacity 
                        onPress={() => fillAnswer(index)} 
                        style={styles.answerButton}
                    >
                        <Text style={styles.navButtonText}>{option}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
        <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => goPrevious()} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => goNext()} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
        </View>
    </View>
    )
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
        width: '80%',
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
    ansContainer: {
        padding: 5,
        borderWidth: 4,
        borderColor: '#8B0000',
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

export default QuestionPopup