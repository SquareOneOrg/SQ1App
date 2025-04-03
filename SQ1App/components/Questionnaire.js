import React from 'react';
import { steppingStonesQuiz } from './QuestionData.js';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
function Questionnaire({route, navigation}) {
    const {questionIndex, part, length, map_key} = route.params
    // const { question, options, correctAnswer} = steppingStonesQuiz[questionIndex];
    // console.log({options})
    const questionLength = steppingStonesQuiz.length
    const goPrevious = () => {
        if (questionIndex  - 1 > 0){
            return navigation.navigate( 'Questionnaire', {questionIndex: questionIndex - 1,
                part: part,
                length: length, map_key: map_key})
        }
    }
    const goNext = () => {
        if (questionIndex + 1 < questionLength) {
            return navigation.navigate( 'Questionnaire', {questionIndex: questionIndex + 1,
                part: part,
                length: length, map_key: map_key})
        }
        else {
            if (part < length) {
                return navigation.navigate( 'LibraryBook', {map_key: map_key, part: part, length: length})
            }
            else {
                return navigation.navigate('EndPage')
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
                            onPress={() => goNext(index)} 
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
                    <Text style={styles.navButtonText}>Next</Text>
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