import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { useUser } from '../context/UserContext'; 
import { doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../firebase-config.js';
import { AppContext } from '../AppContext';

function AccountWelcome(){
    const {setCurrentView} = useContext(AppContext);
    const { username, selectedAvatar, logout, updateAvatar } = useUser();
    const [currentAvatar, setCurrentAvatar] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Fetch the latest avatar when component mounts
    useEffect(() => {
        const fetchCurrentAvatar = async () => {
            setLoading(true);
            if (auth.currentUser) {
                try {
                    const userId = auth.currentUser.uid;
                    const userDoc = await getDoc(doc(db, "users", userId));
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        // Add 1 because array index starts at 0 but your avatar IDs start at 1
                        const avatarId = (userData.avatarIndex || 0) + 1;
                        setCurrentAvatar(avatarId);
                        
                        // Update the context if needed
                        if (updateAvatar) {
                            updateAvatar(avatarId);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching avatar:", error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        
        fetchCurrentAvatar();
    }, []);
    
    function moveToAccountAvatarChange(){
        setCurrentView('accountavatarchange')
    };
    
    async function handleLogout() {
        await logout();
        setCurrentView('account');
    }
    
    const avatars = [
        { id: 1, source: require('../assets/avatar 1.png') },
        { id: 2, source: require('../assets/avatar 2.png') },
        { id: 3, source: require('../assets/avatar 3.png') },
        { id: 4, source: require('../assets/avatar 4.png') },
        { id: 5, source: require('../assets/avatar 5.png') },
        { id: 6, source: require('../assets/avatar 6.png') },
        { id: 7, source: require('../assets/avatar 7.png') },
        { id: 8, source: require('../assets/avatar 8.png') },
        { id: 9, source: require('../assets/avatar 9.png') },
        { id: 10, source: require('../assets/avatar 10.png') },
        { id: 11, source: require('../assets/avatar 11.png') },
        { id: 12, source: require('../assets/avatar 12.png') },
        { id: 13, source: require('../assets/avatar 13.png') },
        { id: 14, source: require('../assets/avatar 14.png') },
        { id: 15, source: require('../assets/avatar 15.png') },
        { id: 16, source: require('../assets/avatar 16.png') },
        { id: 17, source: require('../assets/avatar 17.png') },
        { id: 18, source: require('../assets/avatar 18.png') }
    ];

    // Use the currentAvatar from state instead of selectedAvatar from context
    const avatarId = currentAvatar || 1;
    
    const avatarObj = avatars.find(avatar => avatar.id === avatarId);
    
    const avatarSource = avatarObj ? avatarObj.source : require('../assets/avatar 1.png');

    // Display fallback text if username is undefined
    const displayUsername = username || "Loading username...";

    return(
        <View style={styles.container}>
            <Text style={styles.text}>Account</Text>
            <View>
                <Text style={styles.smalltext}>Welcome to your</Text>
                <Text style={styles.smalltext}>Square One profile!</Text>
                <View style={{ height: 20 }} />
                {loading ? (
                    <View style={styles.image} />
                ) : (
                    <Image source={avatarSource} style={styles.image} />
                )}
                <View style={{ height: 20 }} />
                <Text style={styles.smalltext}>{displayUsername}</Text>
                <View style={{ height: 20 }} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.accountButton} onPress={moveToAccountAvatarChange}>
                    <Text style={styles.accountButtonText}>CHANGE AVATAR</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={[styles.accountButton, styles.logoutButton]} onPress={handleLogout}>
                    <Text style={styles.accountButtonText}>LOGOUT</Text>
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
    logoutButton: {
        backgroundColor: '#FF9999', // A reddish color for logout
        marginTop: 10,
    },
  });

export default AccountWelcome;