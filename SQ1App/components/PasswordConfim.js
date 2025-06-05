import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function PasswordConfirm({onNavChange }) {
    const handleContinue = () => {
        if (onNavChange) {
            onNavChange('account');
        }
    };

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Change Password Confirmed</Text>
                <View style={styles.textView}>
                    <Text style={styles.smalltext}>Your changes have been</Text>
                    <Text style={styles.smalltext}>saved!</Text>
                    <Text style={styles.smalltext}>Your updated profile</Text>
                    <Text style={styles.smalltext}>information will be sent to your</Text>
                    <Text style={styles.smalltext}>parent</Text>
                </View>
                
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.accountButton} onPress={handleContinue}>
                        <Text style={styles.accountButtonText}>Continue to Account</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#708BDC',
        width: '100%',
        alignItems: 'center',
    },
    
    text: {
        fontSize: 35,
        color: 'black',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30,
        paddingTop:30
    },
    textView: {
        alignItems: 'center',
        paddingBottom: 50,
        paddingTop:50
    },
    smalltext: {
        fontSize: 25,
        color: 'black',
        fontFamily: 'Sniglet',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    accountButton: {
        backgroundColor: '#99B7DE',
        alignItems: 'center',
        width: 340,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#323746',
        padding: 20,
    },
    accountButtonText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Sniglet',
    },
});