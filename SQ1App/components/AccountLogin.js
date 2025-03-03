import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase-config.js'; // Ensure you import your Firebase setup
import logo from '../assets/logo.png';
import { useUser } from '../context/UserContext'; // Import the useUser hook

function AccountLogin({ onNavChange }) {
    const [username, setUsername] = useState('');
    const [pswd, setPswd] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useUser(); // Get login function from context

    async function handleLogin() {
        if (!username || !pswd) {
            Alert.alert("Error", "Please enter both username and password");
            return;
        }
        
        setIsLoading(true);
        try {
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", username));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                Alert.alert("Error", "Username not found");
            } else {
                let userData = null;
                querySnapshot.forEach((doc) => {
                    userData = doc.data();
                });

                if (userData && userData.password === pswd) {
                    // Use the login function from context
                    await login(userData);
                    
                    onNavChange('accountwelcome');
                } else {
                    Alert.alert("Error", "Incorrect password");
                }
            }
        } catch (error) {
            console.error("Login error:", error);
            Alert.alert("Error", "Something went wrong. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Image source={logo} style={styles.logo} />
                <Text style={styles.text}>Account Login</Text>
            </View>
            <View>
                <Text style={styles.smalltext}>Enter your username and</Text>
                <Text style={styles.smalltext}>password to login!</Text>
            </View>
            <TextInput
                style={styles.usernameInput}
                onChangeText={setUsername}
                value={username}
                placeholder="Username"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                onChangeText={setPswd}
                value={pswd}
                placeholder="Password"
                secureTextEntry
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton} onPress={handleLogin} disabled={isLoading}>
                    <Text style={styles.accountButtonText}>{isLoading ? "Logging in..." : "LOGIN"}</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.smalltextlink} onPress={() => onNavChange('accountloginforgot')}>
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