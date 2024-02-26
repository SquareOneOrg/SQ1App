import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import logo from '../assets/logo.png'

function Account(){
    const [name, onChangeName] = React.useState('');
    const [email, onChangeEmail] = React.useState('');
    const [pswd, onChangePswd] = React.useState('');
    const [age, onChangeAge] = React.useState('');
    return(
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
                <Text style={styles.text}>Create Account</Text>
            </View>
            <TextInput
              style = {styles.input}
              onChangeText={onChangeName}
              value={name}
              placeholder="Full Name"
            />
            <TextInput
              style = {styles.input}
              onChangeText={onChangeAge}
              value={age}
              placeholder="Age"
              keyboardType="numeric"
            />
            <TextInput
              style = {styles.input}
              onChangeText={onChangeEmail}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style = {styles.input}
              onChangeText={onChangePswd}
              value={pswd}
              secureTextEntry = {true}
              placeholder="Password"
              keyboardType="visible-password"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.avatarButton}>
                    <Text style={styles.avatarButtonText}>Choose Avatar</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton}>
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
        backgroundColor: '#708BDC',
    },
    welcome: {
        alignSelf: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderColor: '#323746',
        borderWidth: 5,
        width: 300,
        borderRadius: 25,
        height: 230,
        marginBottom: 15,
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
        color: '#323746'
    },
    logo: {
        marginTop: 20,
        width: 175,
        height: 130,
    },
    buttonContainer:{
        alignItems: 'center',
        margin: 20,
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
    },
    avatarButtonText:{
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#323746',
    },
    accountButtonText:{
        fontSize: 22,
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#484856',
    },
    input: {
      alignSelf: 'center',
      height: 53,
      width: 340,
      margin: 12,
      borderWidth:0,
      borderRadius: 27,
      padding: 10,
      fontSize: 20,
      backgroundColor: '#D9D9D9',
      color: '#A9A9A9',
    },
});

export default Account
