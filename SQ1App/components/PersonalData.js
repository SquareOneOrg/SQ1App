import { StyleSheet, View, Text, TouchableOpacity, Modal, Image } from "react-native";
import { useState } from 'react';
import WebsiteLink from '../components/WebsiteLink.js';
import FormLink from '../components/FormLink.js';

function PersonalData(){
    const [isWebModalVisible, setIsWebModalVisible] = useState(false);
    const [isFormModalVisible, setIsFormModalVisible] = useState(false);
    return(
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <Text style={styles.title}>Personal Data</Text>
            </View>
            
            <TouchableOpacity style={styles.links} onPress={()=>setIsFormModalVisible(true)}>
            <Image source={require('../assets/nutrition.png')} style={styles.image} />
                <Text style={styles.linkTitles}>
                    Nutrition
                </Text>
            </TouchableOpacity>
            <Modal visible={isFormModalVisible} animationType="slide" presentationStyle="formSheet">
                <FormLink setIsFormModalVisible={setIsFormModalVisible}/>
            </Modal>


            <TouchableOpacity style={styles.links} onPress={() => { /* Your press handler here, if any */ }}>
            <Image source={require('../assets/exercise.png')} style={styles.exercise} />
                <Text style={styles.linkTitles}>
                     Exercise
                </Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.links} onPress={()=>setIsWebModalVisible(true)}>
            <Image source={require('../assets/sleep.png')} style={styles.image} />
                <Text style={styles.linkTitles}>
                    Sleep
                </Text>
            </TouchableOpacity>
            <Modal visible={isWebModalVisible} animationType="slide" presentationStyle="formSheet">
                <WebsiteLink setIsWebModalVisible={setIsWebModalVisible}/>
            </Modal>
        </View>
    );
};

export default PersonalData

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 45,
        textAlign: "center",
        marginBottom: 40,
        fontFamily: 'Sniglet',
    },
    links: {
        borderWidth: 2,
        borderColor: '#33363F',
        margin: 20,
        paddingVertical: 25,
        paddingHorizontal: 40,
        borderRadius: 30,
        backgroundColor: '#D9D9D9',
        alignItems: 'center',
        flexDirection: 'row', 
        justifyContent: 'center',
    },
    linkTitles: {
        fontSize: 30,
        textAlign: "center",
        fontFamily: 'Sniglet',
    },
    image: {
        marginRight: 20,
    },
    exercise: {
        marginRight: 0,
        marginLeft: 0,
        marginTop: -10,
    },
    
});

