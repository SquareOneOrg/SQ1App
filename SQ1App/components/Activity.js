import React, {useContext} from 'react';
import { useNavigation } from '@react-navigation/native'; 
import { StyleSheet, View, TouchableOpacity, Image, Text } from 'react-native';
import { AppContext } from '../AppContext';
import TutorialOverlay from './TutorialOverlay'
import { useTutorial } from './TutorialContext';

function Activity() {
    const { tutorialStep, setShowTutorial,setTutorialStep } = useTutorial();
    
    const {setCurrentView} = useContext(AppContext);
    function moveToSleepLog(){
        setCurrentView('sleeplog')
    };

    function moveToExerciseLog() {
        setCurrentView('exerciselog')
    }

    function moveToNutritionLog() {
        setCurrentView('nutritionlog')
    }


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Activity Hub</Text>
            <View style={styles.grid}>
                <TouchableOpacity style = {styles.gridItem}>
                    <Image source={require('../assets/workbook.png')} style={styles.image} />
                </TouchableOpacity> 
                <TouchableOpacity onPress={moveToSleepLog} style={styles.gridItem}>
                    <Image source={require('../assets/sleep_log.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            <View style={styles.grid}>
                <TouchableOpacity onPress={moveToExerciseLog} style={styles.gridItem}>
                    <Image source={require('../assets/exercise_log.png')} style={styles.image} />
                </TouchableOpacity>
                <TouchableOpacity onPress={moveToNutritionLog} style={styles.gridItem}>
                    <Image source={require('../assets/nutrition_log.png')} style={styles.image} />
                </TouchableOpacity>
            </View>
            {tutorialStep === 2 && <TutorialOverlay />}
        </View>
    );
};

export default Activity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
        alignItems: 'center',
        padding: 10,
        paddingTop: 50, // Added padding at the top
    },
    header: {
        marginTop: -20,
        fontSize: 45,
        marginBottom: 20, // Add space below the header
        fontFamily: 'Sniglet',
    },
    grid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    gridItem: {
        width: '48%', // slightly less than half the container width to fit two side by side
        height: 250, // Adjust the height as needed
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden', // This ensures the borderRadius is respected for images
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover', // Cover ensures the entire grid item area is filled
    },
});
