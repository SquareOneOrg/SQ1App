import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { useState } from 'react';
import WebsiteLink from './WebsiteLink.js';
import FormLink from './FormLink.js';
import { useTutorial } from './TutorialContext';

function HelpPage({ onNavChange }){
    const { setShowTutorial, setTutorialStep } = useTutorial();

    function movetoAppFeatures(){
        onNavChange('appfeatures')
    };
   
    function movetoContactUs(){
        onNavChange('contactus')
    };

    function replayTutorial() {
        setTutorialStep(0);
        setShowTutorial(true);
        onNavChange('home'); 
    }

    return(
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>Help Page</Text>
            </View>

            <TouchableOpacity  style={styles.links}>
                <Text style={styles.linkTitles}>
                    FAQs
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={replayTutorial} style={styles.links}>
                <Text style={styles.linkTitles}>
                    Replay Tutorial
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={movetoAppFeatures} style={styles.links}>
                <Text style={styles.linkTitles}>
                    App features
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={movetoContactUs} style={styles.links}>
                <Text style={styles.linkTitles}>
                    Contact Us
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default HelpPage

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
    },
    title: {
        fontSize: 40,
        textAlign: "center",
        marginTop: 30,
        marginBottom: 20,
        fontFamily: 'Sniglet',
    },
    links: {
        borderWidth: 2,
        borderColor: '#33363F',
        margin: 15,
        paddingVertical: 25,
        paddingHorizontal: 110,
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
    },
    linkTitles: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: 'Sniglet',
    },
    
});