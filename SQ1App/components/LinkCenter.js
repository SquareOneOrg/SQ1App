import { StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import { useState, useContext } from 'react';
import WebsiteLink from '../components/WebsiteLink.js';
import FormLink from '../components/FormLink.js';
import FAQLink from "./FAQLink.js";
import { AppContext } from "../AppContext.js";
import TutorialOverlay from './TutorialOverlay'
import { useTutorial } from './TutorialContext';



function LinkCenter(){
    const {  tutorialStep, setShowTutorial, setTutorialStep } = useTutorial();

    const {setCurrentView} = useContext(AppContext);
    function moveToExtraResources(){
        setCurrentView('extraresources')
    };

    const [isWebModalVisible, setIsWebModalVisible] = useState(false);
    const [isFormModalVisible, setIsFormModalVisible] = useState(false);
    const [isFAQModalVisible, setIsFAQModalVisible] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>Link Center</Text>
            </View>
            
            <TouchableOpacity style={styles.links} onPress={()=>setIsFormModalVisible(true)}>
                <Text style={styles.linkTitles}>
                    Feedback Form
                </Text>
            </TouchableOpacity>
            <Modal visible={isFormModalVisible} animationType="slide" presentationStyle="formSheet">
                <FormLink setIsFormModalVisible={setIsFormModalVisible}/>
            </Modal>

            <TouchableOpacity onPress={moveToExtraResources} style={styles.links}>
                <Text style={styles.linkTitles}>
                    Extra Resources
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.links} onPress={()=>setIsWebModalVisible(true)}>
                <Text style={styles.linkTitles}>
                    SQ1 Website
                </Text>
            </TouchableOpacity>
            <Modal visible={isWebModalVisible} animationType="slide" presentationStyle="formSheet">
                <WebsiteLink setIsWebModalVisible={setIsWebModalVisible}/>
            </Modal>

            <TouchableOpacity style={styles.links} onPress={()=>setIsFAQModalVisible(true)}>
                <Text style={styles.linkTitles}>
                    FAQs
                </Text>
            </TouchableOpacity>
            <Modal visible={isFAQModalVisible} animationType="slide" presentationStyle="formSheet">
                <FAQLink setIsFAQModalVisible={setIsFAQModalVisible}/>
            </Modal>

            {tutorialStep === 3 && <TutorialOverlay />}
        </View>
    );
};

export default LinkCenter

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