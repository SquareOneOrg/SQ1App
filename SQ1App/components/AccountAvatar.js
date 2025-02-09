import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

function AccountAvatar({ onNavChange }) {
    function moveToAccountParent(){
        onNavChange('accountparent')
    };
    const [username, onChangeUsername] = React.useState('');
    const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
    
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

    const handlePrevious = () => {
        setCurrentAvatarIndex((prev) => (prev === 0 ? avatars.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentAvatarIndex((prev) => (prev === avatars.length - 1 ? 0 : prev + 1));
    };

    return (
        <View style={styles.container}>
        <Text style={styles.text}>Create Account</Text>
        <View>
            <Text style={styles.smalltext}>Choose an avatar and</Text>
            <Text style={styles.smalltext}>username for your profile!</Text>
        </View>
        
        <View style={styles.avatarSelector}>
            <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={handlePrevious}
            >
            <AntDesign name="left" size={24} color="#323746" />
            </TouchableOpacity>

            <Image 
            source={avatars[currentAvatarIndex].source}
            style={styles.image}
            />

            <TouchableOpacity 
            style={styles.arrowButton} 
            onPress={handleNext}
            >
            <AntDesign name="right" size={24} color="#323746" />
            </TouchableOpacity>
        </View>

        <TextInput
            style={styles.usernameInput}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Username"
        />
        
        <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.accountButton} onPress={moveToAccountParent}>
            <Text style={styles.accountButtonText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#708BDC',
    width: 390,
  },
  avatarSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  arrowButton: {
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 45,
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
    width: 200,
    height: 200,
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

export default AccountAvatar;