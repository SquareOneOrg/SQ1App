import React, { useState, useRef, useContext } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { AppContext } from '../AppContext';

function AccountVerification(){
    const {setCurrentView} = useContext(AppContext);
    function moveToAccountCreate(){
        setCurrentView('accountcreate')
    };
    
    const VerificationCodeInput = ({ onCodeComplete }) => {
        const [code, setCode] = useState(['', '', '', '']);
        const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

        const handleCodeChange = (text, index) => {
            const cleanText = text.replace(/[^0-9]/g, '');
            
            // Update the code array
            const newCode = [...code];
            newCode[index] = cleanText.slice(-1); // Only take the last digit
            setCode(newCode);
            
            // Auto-focus next input if current input has a digit
            if (cleanText.length === 1 && index < 3) {
                inputRefs[index + 1].current?.focus();
            }
            
            // Check if all 4 digits are entered
            const fullCode = newCode.join('');
            if (fullCode.length === 4) {
                onCodeComplete?.(fullCode);
                Keyboard.dismiss();
            }
        };

        const handleKeyPress = (e, index) => {
            // Handle backspace to go to previous input
            if (e.nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
                inputRefs[index - 1].current?.focus();
            }
        };

        const handleSubmitEditing = () => {
            Keyboard.dismiss();
        };

        return (
            <View style={styles.container}>
                <Text style={styles.text}>Parent Verification</Text>  
                <View style={{ height: 30 }} />
                <Text style={styles.smalltext}>Enter the four digit code sent</Text>
                <Text style={styles.smalltext}>to your parent!</Text>
                <View style={{ height: 30 }} />
            
                <View style={styles.boxesContainer}>
                    {code.map((digit, index) => (
                        <View key={index} style={styles.box}>
                            <TextInput
                                ref={inputRefs[index]}
                                value={digit}
                                onChangeText={(text) => handleCodeChange(text, index)}
                                onKeyPress={(e) => handleKeyPress(e, index)}
                                keyboardType="number-pad"
                                maxLength={1}
                                style={styles.digit}
                                returnKeyType={index === 3 ? "done" : "next"}
                                onSubmitEditing={index === 3 ? handleSubmitEditing : () => inputRefs[index + 1].current?.focus()}
                                blurOnSubmit={index === 3}
                                selectTextOnFocus={true}
                            />
                        </View>
                    ))}
                </View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.accountButton} onPress={moveToAccountCreate}>
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
    boxesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        height: 53,
        width: 53,
        margin: 8,
        borderRadius: 27,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    digit: {
        fontSize: 20,
        color: '#323746',
        textAlign: 'center',
        textAlignVertical: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent',
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