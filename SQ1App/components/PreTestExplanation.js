import React, {useContext, useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AppContext } from '../AppContext';
import { useUser } from '../context/UserContext';
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useGems } from './GemContext.js';

function PreTestExplanation() {
    const { username } = useUser();
    const { setCurrentView, setViewParams, viewParams } = useContext(AppContext);
    const { steppingStone, questionIndex, part, length, map_key } = viewParams;
    const [viewTests, setViewTests] = useState(false);
    const [preTest, setPreTest] = useState(0);
    const [postTest, setPostTest] = useState(0);
    const { incrVal } = useGems();

    const goToTest = () => {
        setViewParams({
            questionIndex: 0,
            part: part,
            length: length,
            map_key: map_key,
            testScore: 0,
            takePreTest: true,
          });
        setCurrentView('questionnaire');
    }
    const goToBook = async() => {
        setViewParams({
            book: 'steppingstones',
            part: part,
            length: length,
            map_key: map_key,
        });
        setCurrentView('librarybook');
    }

    return(
        <View style={styles.container}>
             <View style={styles.textContainer}>
                <Text style={styles.text}>
                We’re excited to have you start Stepping Stones! Before you begin reading, we want to see how much you know about health by asking a few questions. We’ll give you some rewards for answering all the questions! If you would prefer not to, you can click navigate to book. 
                </Text>
            </View>
             <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => goToBook()} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Navigate to Book</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                onPress={() => goToTest()} 
                style={styles.navButton}
                >
                <Text style={styles.navButtonText}>Take Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    buttonContainer: {
        // marginTop: 20,
        flexDirection: 'column',
        width: '70%',
        // gap: 200,
        justifyContent: 'space-between',
    },
    navButton: {
        borderWidth: 2,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 40,
    },
    navButtonText: {
        fontSize: 25,
        fontFamily: 'Sniglet',
        padding: 4,
        textAlign: 'center',
    },
    text: {
        fontSize: 25,
        fontFamily: 'Sniglet',
        textAlign: 'center',
        padding: 4,
    },
    textContainer: {
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 60,
        borderWidth: 4,
        borderColor: '#000',
    },
    testText: {
        fontSize: 30,
        fontFamily: 'Sniglet',
        textAlign: 'center',
        padding: 4,
    }
})
export default PreTestExplanation