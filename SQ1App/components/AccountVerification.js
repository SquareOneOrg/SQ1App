import React, { useState, useRef, useContext } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { AppContext } from '../AppContext';

function AccountVerification(){
    const { setCurrentView } = useContext(AppContext);
    function moveToAccountCreate(){
        setCurrentView('accountcreate')
        // onNavChange('accountcreate')
    };

    const VerificationCodeInput = ({ onCodeComplete }) => {
        const [code, setCode] = useState('');
        const inputRef = useRef(null);

        const handleCodeChange = (text) => {
            const cleanText = text.replace(/[^0-9]/g, '').slice(0, 4);
            setCode(cleanText);
            
            if (cleanText.length === 4) {
            onCodeComplete?.(cleanText);
            Keyboard.dismiss();
            }
        };

        const handleSubmitEditing = () => {
            Keyboard.dismiss();
        };

        const codeArray = code.split('').concat(Array(4 - code.length).fill(''));

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Parent Verification</Text>  
                <View style={{ height: 30 }} />
                <Text style={styles.smalltext}>Enter the four digit code sent</Text>
                <Text style={styles.smalltext}>to your parent!</Text>
                <View style={{ height: 30 }} />
            <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={4}
            style={[styles.hiddenInput]}
            returnKeyType="done"
            onSubmitEditing={handleSubmitEditing}
            blurOnSubmit={true}
            />
            
            <View style={styles.boxesContainer}>
                {codeArray.map((digit, index) => (
                <View
                    key={index}
                    style={[styles.box]}
                    onTouchEnd={() => inputRef.current?.focus()}
                >
                    <TextInput
                    value={digit}
                    editable={false}
                    style={styles.digit}
                    />
                </View>
                ))}
            </View>
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton} onPress = {moveToAccountCreate}>
                    <Text style={styles.accountButtonText}>SUBMIT</Text>
                </TouchableOpacity>
            </View>
            </View>
    );
    };
    return <VerificationCodeInput onCodeComplete={(code) => {
        console.log('Code entered:', code);
    }} />;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#708BDC',
        width: 390,
      },
    hiddenInput: {
        position: 'absolute',
        opacity: 0,
        height: 0,
        width: 0,
    },
    boxesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        alignSelf: 'center',
        height: 53,
        width: 80, // Adjusted from 340 to be suitable for individual boxes
        margin: 5,
        borderWidth: 0,
        borderRadius: 27,
        padding: 10,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
    },
    digit: {
        fontSize: 20,
        color: '#A9A9A9',
        textAlign: 'center',
    },
    text: {
        fontSize: 35,
        margin: 10,
        color: '#323746',
        fontFamily: 'Sniglet',
        alignSelf: 'center',
    },
    smalltext: {
        fontSize: 25,
        color: '#323746',
        fontFamily: 'Sniglet',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    smalltextlink: {
        fontSize: 25,
        color: '#323746',
        fontFamily: 'Sniglet',
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textDecorationLine: 'underline',
    },
    image: {
        width: 250,
        height: 250,
        alignSelf: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        margin: 20,
        marginTop: 5,
        marginBottom: 5,
    },
    accountButton: {
        backgroundColor: '#99B7DE',
        alignItems: 'center',
        width: 340,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#323746',
        padding: 20,
        marginTop: 15,
    },
    accountButtonText: {
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
        borderWidth: 0,
        borderRadius: 27,
        padding: 10,
        fontSize: 20,
        backgroundColor: '#D9D9D9',
        color: '#A9A9A9',
        marginTop: 30,
    },
});

export default AccountVerification;