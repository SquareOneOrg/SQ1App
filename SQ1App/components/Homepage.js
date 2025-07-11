import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png';
import HealthFactOfWeek from './HealthFactOfWeek';
import TutorialOverlay from './TutorialOverlay';
import { useTutorial } from './TutorialContext';
import { useGems } from './GemContext.js';
import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { useUser } from '../context/UserContext';
import React, { useEffect } from 'react';




function Homepage(){
    const { setShowTutorial, setTutorialStep, tutorialStep } = useTutorial();
    const { incrVal } = useGems();
    const {username} = useUser();

    if (tutorialStep == 9) {
        incrVal(10, 'gem', true);
    }
 
    
    return(
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.text}>Welcome to the</Text>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.text}>App!</Text>
            </View>
            <View style={styles.factSection}>
                <Text style={styles.factTitle}>Health Fact of the Week</Text>
                <HealthFactOfWeek textStyle={styles.fact} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.instructionButton} onPress={() => {   setTutorialStep(0); setShowTutorial(true);    }}>
                    <Text style={styles.instructionButtonText}>How to use the app</Text>
                </TouchableOpacity>
            </View>
            {[0, 6, 7, 8, 9].includes(tutorialStep) && <TutorialOverlay />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    welcome: {
        alignItems: 'center',
    },
    factSection: {
        alignItems: 'center',
        paddingBottom: 25,
        paddingTop: 15,
        paddingHorizontal: 10,
        marginVertical: 20,
        marginHorizontal: 10,
        backgroundColor: '#D08BFA',
        borderRadius: 10,
        borderColor: '#33363F',
        borderWidth: 3,
    },
    factTitle: {
        fontSize: 25,
        textDecorationLine: 'underline',
        fontFamily: 'Sniglet',
    },
    fact: {
        fontSize: 18,
        textAlign: 'center',
        maxWidth: '90%',
        paddingVertical: 10,
        fontFamily: 'Sniglet',
    },
    text: {
        fontSize: 40,
        margin: 10,
        fontFamily: 'Sniglet',
    },
    logo: {
        width: 250,
        height: 190,
    },
    buttonContainer:{
        alignItems: 'center',
        margin: 20,
    },
    instructionButton:{
        backgroundColor: '#50BE65',
        alignItems: 'center',
        width: 250,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#33363F',
        padding: 8,
    },
    instructionButtonText:{
        fontSize: 22,
        textAlign: 'center',
        fontFamily: 'Sniglet',
    },
});

export default Homepage