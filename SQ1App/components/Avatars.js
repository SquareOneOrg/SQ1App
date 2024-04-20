import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button} from 'react-native';

function Avatars(){
    return(
        <div style={{ height: '600px', width: '310px', overflow: 'scroll', textAlign: 'center', backgroundColor: '#708BDC' }}>
            <Image source={require('../assets/puzzlepiece.png')} style={styles.logo}></Image>
            <Text style={styles.text}>Choose your Avatar</Text>
            <View style={{flexDirection:"row"}}>
            <View style={styles.avatarContainerLeft}>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 1.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 2.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 3.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 4.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 5.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 6.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.avatarContainerMiddle}>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 7.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 8.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 9.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 10.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 11.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 12.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
            </View>
            <View style={styles.avatarContainerRight}>
            <TouchableOpacity>
                    <Image source={require('../assets/avatar 13.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 14.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 15.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 16.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 17.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/avatar 18.png')} style={styles.avatar}></Image>
                </TouchableOpacity>
            </View>  
        </View>
        <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.avatarButton}>
                    <Text style={styles.avatarButtonText}>Select</Text>
                </TouchableOpacity>
            </View>
        </div>
        
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
        borderWidth: 0,
        width: 300,
        borderRadius: 25,
        height: 100,
        marginBottom: 15,
    },
    text: {
        fontSize: 30,
        margin: 10,
        color: '#000435',
        alignSelf: 'center',
        alignItems: 'center',
    },
    logo: {
        marginTop: 10,
        width: 75,
        height: 75,
        marginLeft: 100,
        marginRight: 100,
    },
    buttonContainer:{
        alignItems: 'center',
        margin: 20,
    },
    avatarContainerLeft: {
        alignSelf: 'left',
        width: 100,
    },
    avatarContainerMiddle: {
        alignSelf: 'center',
        width: 100,
    },
    avatarContainerRight: {
        alignSelf: 'right',
        width: 90,
    },
    avatar: {
        alignSelf: 'center',
        width: 75,
        height: 75,
        marginTop: 10,
        marginBottom: 10,
        borderColor: 'white',
        borderWidth: 5,
        borderRadius: 37.5,
    },
    avatarButton:{
        alignSelf: 'center',
        height: 55,
        width: 250,
        borderWidth:5,
        borderRadius: 20,
        padding: 10,
        backgroundColor: '#ADD8E6',
        color: '#A9A9A9',
        borderColor: 'white',
        textAlignVertical: 'center',
      },
      avatarButtonText:{
          fontSize: 18,
          textAlign: 'center',
          color: '#000435',
      },
});

export default Avatars
