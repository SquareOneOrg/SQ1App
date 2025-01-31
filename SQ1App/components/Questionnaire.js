import React from 'react';
import { steppingStonesQuiz } from './QuestionData.js';
import { View, Text, StyleSheet, Button } from 'react-native';
function Questionnaire({route, navigation}) {
    const {questionIndex, title, part, length} = route.params
    // const { question, options, correctAnswer} = steppingStonesQuiz[questionIndex];
    // console.log({options})
    const questionLength = steppingStonesQuiz.length
    const goPrevious = () => {
        if (questionIndex  - 1 > 0){
            return navigation.navigate( 'Questionnaire', {questionIndex: questionIndex - 1, title: title,
                part: part,
                length: length})
        }
    }
    const goNext = () => {
        if (questionIndex + 1 < questionLength) {
            return navigation.navigate( 'Questionnaire', {questionIndex: questionIndex + 1, title: title,
                part: part,
                length: length})
        }
        else {
            return navigation.navigate( 'LibraryBook', {title: title, part: part, length: length})
        }
    }
    return (
        //need to add user data storage later
        <View style={styles.container}>
        <Text style={styles.questionContainer}>{steppingStonesQuiz[questionIndex].question}</Text>
        <View style={styles.answersContainer}>
            {steppingStonesQuiz[questionIndex].options.map((option, index) => (
                 <View key={index} style={styles.answerSpace}> 
                    <Button 
                        title={option}
                        onPress={() => goNext(index)}
                        color="#2c3e50"
                    />
                 </View>
            ))}
        </View>
        <View style={styles.buttonContainer}>
            <Button onPress={() => goPrevious(questionIndex)} style={styles.navButton} title="Previous"/>
            <Button onPress={() => goNext(questionIndex)} style={styles.navButton} title="Next"/>
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
        gap: 340,
        justifyContent: 'space-between',
    },
    navButton: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Sniglet',
    },
    answerSpace: {
        marginVertical: 10,
    },
    answersContainer: {
        width: '60%',
        marginBottom: 20,
    },
    questionContainer: {
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Sniglet',
    },
});

export default Questionnaire;