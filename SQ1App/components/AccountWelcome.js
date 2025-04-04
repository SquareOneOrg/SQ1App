import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import puzzle from '../assets/puzzlepiece.png';
import { AppContext } from '../AppContext';

function AccountWelcome(){
  const { setCurrentView } = useContext(AppContext);
    function moveToAccountAvatarChange(){
      setCurrentView('accountavatarchange')
        // onNavChange('accountavatarchange')
    };
    return(
        <View style={styles.container}>
            <Text style={styles.text}>Account</Text>
            <View>
                <Text style={styles.smalltext}>Welcome to your</Text>
                <Text style={styles.smalltext}>Square One profile!</Text>
                <View style={{ height: 20 }} />
                <Image source={puzzle} style={styles.image}></Image>
                <View style={{ height: 20 }} />
                <Text style={styles.smalltext}>USERNAME</Text>
                <View style={{ height: 20 }} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton} onPress={moveToAccountAvatarChange}>
                <Text style={styles.accountButtonText}>CHANGE AVATAR</Text>
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

export default AccountWelcome;