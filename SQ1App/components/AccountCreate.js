import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Modal, ScrollView} from 'react-native';

function AccountCreate({ onNavChange }) {
    function moveToAccountThanks(){
        onNavChange('accountthanks')
    };
    const [name, onChangeName] = useState('');
    const [pswd, onChangePswd] = useState('');
    const [showAgeModal, setShowAgeModal] = useState(false);
    const [showGradeModal, setShowGradeModal] = useState(false);
    const [selectedAge, setSelectedAge] = useState(null);
    const [selectedGrade, setSelectedGrade] = useState(null);

    const ages = Array.from({ length: 16 }, (_, i) => i + 3);
    
    const grades = [
        'Pre-K',
        'Kindergarten',
        '1st Grade',
        '2nd Grade',
        '3rd Grade',
        '4th Grade',
        '5th Grade',
        '6th Grade',
        '7th Grade',
        '8th Grade',
        '9th Grade',
        '10th Grade',
        '11th Grade',
        '12th Grade'
    ];

    const handleAgeSelect = (age) => {
        setSelectedAge(age);
        setShowAgeModal(false);
    };
    
    const handleGradeSelect = (grade) => {
        setSelectedGrade(grade);
        setShowGradeModal(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Create Account</Text>
            <View>
                <Text style={styles.smalltext}>Parent verification is complete!</Text>
                <Text style={styles.smalltext}>Fill in the following information</Text>
                <Text style={styles.smalltext}>to finish creating your account.</Text>
            </View>
            <View style={{ height: 15 }} />
            <TextInput
                style={styles.usernameInput}
                onChangeText={onChangeName}
                value={name}
                placeholder="Full Name"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangePswd}
                value={pswd}
                placeholder="Password"
                secureTextEntry={true}
            />
            
            <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowAgeModal(true)}
            >
                <Text style={[styles.dropdownText, !selectedAge && styles.placeholder]}>
                    {selectedAge ? `Age: ${selectedAge}` : 'Select Age'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={styles.input} 
                onPress={() => setShowGradeModal(true)}
            >
                <Text style={[styles.dropdownText, !selectedGrade && styles.placeholder]}>
                    {selectedGrade ? `Grade: ${selectedGrade}` : 'Select Grade'}
                </Text>
            </TouchableOpacity>

            <Modal visible={showAgeModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Age</Text>
                        <ScrollView>
                            {ages.map((age) => (
                                <TouchableOpacity
                                    key={age}
                                    style={styles.optionButton}
                                    onPress={() => handleAgeSelect(age)}
                                >
                                    <Text style={styles.optionText}>{age}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowAgeModal(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <Modal visible={showGradeModal} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Grade</Text>
                        <ScrollView>
                            {grades.map((grade) => (
                                <TouchableOpacity
                                    key={grade}
                                    style={styles.optionButton}
                                    onPress={() => handleGradeSelect(grade)}
                                >
                                    <Text style={styles.optionText}>{grade}</Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                        <TouchableOpacity
                            style={styles.cancelButton}
                            onPress={() => setShowGradeModal(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton} onPress = {moveToAccountThanks}>
                    <Text style={styles.accountButtonText}>CREATE ACCOUNT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  // Add this
        backgroundColor: '#708BDC',
        width: '100%',  // Change from 390 to 100%
        padding: 20,    // Add this
    },
    welcome: {
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderColor: '#323746',
        borderWidth: 5,
        width: 315,
        borderRadius: 25,
        height: 200,
        marginBottom: 30,
        marginTop: 10,
    },
    factSection: {
        alignItems: 'center',
        paddingBottom: 25,
        paddingTop: 15,
        paddingHorizontal: 10,
        marginVertical: 20,
        backgroundColor: '#D08BFA',
        borderRadius: 10,
        borderColor: '#33363F',
        borderWidth: 3,
    },
    text: {
        fontSize: 35,
        margin: 10,
        color: '#323746',
        fontFamily: 'Sniglet',
    },
    smalltext: {
        fontSize: 25,
        //margin: 10,
        color: '#323746',
        fontFamily: 'Sniglet',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    smalltextlink: {
        fontSize: 20,
        color: '#323746',
        fontFamily: 'Sniglet',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textDecorationLine: 'underline',
      },
    logo: {
        marginTop: 20,
        width: 140,
        height: 104,
    },
    buttonContainer:{
        alignItems: 'center',
        margin: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    avatarButton:{
      alignSelf: 'center',
      height: 55,
      width: 340,
      borderWidth:3,
      borderRadius: 27,
      padding: 10,
      backgroundColor: '#D9D9D9',
      color: '#A9A9A9',
      borderColor: '#323746',
    },
    accountButton:{
      backgroundColor: '#99B7DE',
      alignItems: 'center',
      width: 340,
      borderRadius: 40,
      borderWidth: 3,
      borderColor: '#323746',
      padding: 20,
      marginTop: 15,
    },
    avatarButtonText:{
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#323746',
        fontFamily: 'Sniglet',
    },
    accountButtonText:{
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#484856',
        fontFamily: 'Sniglet',
    },
    input: {
      alignSelf: 'center',
      height: 53,
      width: 340,
      margin: 5,
      borderWidth:0,
      borderRadius: 27,
      padding: 10,
      fontSize: 20,
      backgroundColor: '#D9D9D9',
      color: '#A9A9A9',
    },
    usernameInput: {
        alignSelf: 'center',
        height: 53,
        width: 340,
        margin: 5,
        borderWidth:0,
        borderRadius: 27,
        padding: 10,
        fontSize: 20,
        backgroundColor: '#D9D9D9',
        color: '#A9A9A9',
        marginTop: 30,
    },
    dropdownText: {
        fontSize: 20,
        color: '#000000',
    },
    placeholder: {
        color: '#A9A9A9',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    optionButton: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    optionText: {
        fontSize: 18,
        textAlign: 'center',
    },
    cancelButton: {
        marginTop: 15,
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
    },
    cancelText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});

export default AccountCreate;