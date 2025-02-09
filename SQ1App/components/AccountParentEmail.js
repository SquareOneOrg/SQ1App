import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking } from 'react-native';

function AccountParentEmail(){
    const [email, onChangeEmail] = React.useState('');

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Parent Verification</Text>
            <View style={{ height: 30 }} />
            <View>
                <Text style={styles.smalltext}>Submit your email to receive</Text>
                <Text style={styles.smalltext}>our parent consent form.</Text>
            <View style={{ height: 30 }} />
                <Text style={styles.smalltext}>This step is required before a</Text>
                <Text style={styles.smalltext}>student profile can be created.</Text>
            </View>
            <View style={{ height: 30 }} />

            <TouchableOpacity style={styles.links} onPress={() => Linking.openURL('https://google.com')}>
                <Text style={styles.smalltextlink}>
                    Why?
                </Text>
            </TouchableOpacity>
            <View style={{ height: 30 }} />

            <TextInput
                style = {styles.input}
                onChangeText={onChangeEmail}
                value={email}
                placeholder="Email"
                keyboardType="email-address"
            />

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton}>
                    <Text style={styles.accountButtonText}>SUBMIT</Text>
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
      fontSize: 40,
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

export default AccountParentEmail