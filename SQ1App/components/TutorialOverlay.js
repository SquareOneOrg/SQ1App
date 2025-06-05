import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useTutorial } from './TutorialContext';
import { AppContext } from '../AppContext';
import { useContext } from 'react';



export default function TutorialOverlay(){
    const {
        showTutorial,
        setShowTutorial,
        tutorialStep,
        setTutorialStep,
        tutorialSteps,
      } = useTutorial();

    const { currentView, setCurrentView } = useContext(AppContext);


    const current = tutorialSteps[tutorialStep];
    const isFirstStep = tutorialStep === 0;
    const isLastStep = tutorialStep === tutorialSteps.length - 1;
   

    if (!showTutorial || tutorialSteps.length === 0 || !current) return null;

    const stepToViewMap = {
        0: 'home',
        1: 'library',
        2: 'activity',
        3: 'linkCenter',
        4: 'account',
        5: 'personalData',
      };
      
    const getViewByStep = (step) => stepToViewMap[step] || 'home';
      
    const handlePrev = () => {
        if (!isFirstStep) {
          const prev = tutorialStep - 1;
          setTutorialStep(prev);
          setCurrentView(getViewByStep(prev));
        }
      };

    const handleNext = () => {
        if (isLastStep) {
          setTutorialStep(0);//done
          setShowTutorial(false);
        } else {
          const next = tutorialStep + 1;
          setTutorialStep(next);
          setCurrentView(getViewByStep(next));
        }
    };

    const dismissTutorial = () => {
        setTutorialStep(0);
        setShowTutorial(false);
    }

    return (
        <Pressable style = {styles.overlay} onPress={dismissTutorial}>
            <View 
                style = {[ styles.parentcontainer, tutorialStep >= 6 && { justifyContent : 'flex-start'},]}>
                <Pressable onPress={() => {}} style = {styles.tutorialcontainer} >
                <Text style = {styles.text}>{current.title}</Text>
                <Text style = {styles.subtext}>{current.description}</Text>

                <View style={styles.buttonRow}>

                {!isFirstStep && (<TouchableOpacity onPress={handlePrev} style = {styles.button}>
                    <Text style = {styles.buttontext}>Back</Text>
                </TouchableOpacity>)}

                <TouchableOpacity onPress={handleNext} style = {styles.button}>
                    <Text style = {styles.buttontext}>
                        {isLastStep ? 'Done!' : 'Next'}
                    </Text>
                </TouchableOpacity>

                </View>

                </Pressable>
            </View>
        </Pressable>


// <View style = {styles.overlay}>
// <View style = {[
//     styles.parentcontainer,
//     tutorialStep >= 6 && { justifyContent : 'flex-start'},
//     ]}>
//     <View style = {styles.tutorialcontainer} >
//     <Text style = {styles.text}>{current.title}</Text>
//     <Text style = {styles.subtext}>{current.description}</Text>

//     <View style={styles.buttonRow}>

//     {!isFirstStep && (<TouchableOpacity onPress={handlePrev} style = {styles.button}>
//         <Text style = {styles.buttontext}>Back</Text>
//     </TouchableOpacity>)}

//     <TouchableOpacity onPress={handleNext} style = {styles.button}>
//         <Text style = {styles.buttontext}>
//             {isLastStep ? 'Done!' : 'Next'}
//         </Text>
//     </TouchableOpacity>

//     </View>

//     </View>
// </View>
// </View>
    );
};



const styles = StyleSheet.create({
    
    overlay: {
        position: 'absolute', 
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.4)', 
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },

    parentcontainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },

    tutorialcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#99B7DE',
        borderRadius: 50,
        height: 150,
        marginBottom: 10,
    },

    text: {
        fontSize: 30,
        fontFamily: 'Sniglet',
    },

    subtext: {
        fontSize: 20,
        margin: 10,
        fontFamily: 'Sniglet',
        textAlign: 'center',
    },

    button:{
        backgroundColor: '#273B4A',
        alignItems: 'center',
        width: '30%',
        borderRadius: 40,
        borderColor: '#33363F',
    },

    buttontext:{
        fontSize: 18,
        fontFamily: 'Sniglet',
        color: '#ffff',
    },

    buttonRow:{
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 70,
    }
});
