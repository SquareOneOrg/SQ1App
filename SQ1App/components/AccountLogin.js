import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import logo from '../assets/logo.png'

function AccountLogin({ onNavChange }){
    function moveToAccountLoginForgot(){
        onNavChange('accountloginforgot')
    };

    const [username, onChangeUsername] = React.useState('');
    const [pswd, onChangePswd] = React.useState('');

    return(
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.text}>Account Login</Text>
            </View>
            <View>
                <Text style={styles.smalltext}>Enter your username and</Text>
                <Text style={styles.smalltext}>password to login!</Text>
            </View>
            <TextInput
              style = {styles.usernameInput}
              onChangeText={onChangeUsername}
              value={username}
              placeholder="Username"
            />
            <TextInput
              style = {styles.input}
              onChangeText={onChangePswd}
              value={pswd}
              placeholder="Password"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton}>
                    <Text style={styles.accountButtonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.smalltextlink} onPress={moveToAccountLoginForgot}>
                    Forgot username or password?
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        backgroundColor: '#708BDC',
        width: 390,
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
});

export default AccountLogin;