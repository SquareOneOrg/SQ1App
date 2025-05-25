import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import puzzle from '../assets/puzzlepiece.png';
import { AppContext } from '../AppContext';

function AccountParent(){
  const {setCurrentView} = useContext(AppContext);
    function moveToAccountParentEmail(){
        setCurrentView('accountparentemail')
    };
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Create Account</Text>
            <View>
                <Text style={styles.smalltext}>Grab a parent to help you</Text>
                <Text style={styles.smalltext}>finish setting up your account!</Text>
                <Image source={puzzle} style={styles.image}></Image>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton} onPress={moveToAccountParentEmail}>
                <Text style={styles.accountButtonText}>I AM THE PARENT</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#708BDC',
      width: 390,
    },
    text: {
      fontSize: 35,
      margin: 10,
      color: '#323746',
      fontFamily: 'Sniglet',
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    smalltext: {
      fontSize: 25,
      color: '#323746',
      fontFamily: 'Sniglet',
      alignSelf: 'center',
      alignItems: 'center',
      alignContent: 'center',
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
    usernameInput: {
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

export default AccountParent