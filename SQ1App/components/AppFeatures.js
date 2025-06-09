import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default function AppFeatures() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>App Features</Text>
                <View style={styles.textView}>
                    <Text style={styles.smalltext}>Library: Access all the books published by Square One</Text>
                    <Text style={styles.smalltext}>Activities: Here you can find interactive activities to complete while reading our books to apply what you’ve learned!</Text>
                    <Text style={styles.smalltext}>Personal Data: Track your health and look at the progress you’ve made towards your weekly goals</Text>
                    <Text style={styles.smalltext}>Link Center: Find answers to any questions you have while using the app and get access to additional content</Text>
                    <Text style={styles.smalltext}>Account: Access your profile information and personalize your avatar!</Text>
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
        marginBottom: 10,
    },
    textView: {
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop:40
    },
    smalltext: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        margin: 15,
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