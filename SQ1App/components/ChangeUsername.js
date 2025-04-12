import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from 'react-native';
import logo from '../assets/logo.png'

function ChangeUsername({ onNavChange }){
    function ConfirmUsername(){
        onNavChange('usernameconfirm')
      };

    return(
        <View style={styles.container}>
                    <View style = {styles.textView}>
                        <Text style={styles.text}>Change Username</Text>
                        <Text style={styles.smalltext}>Enter the information below to</Text>
                        <Text style={styles.smalltext}>change your username.</Text>
                        <Text style={styles.smalltext}>Your parent will be notified of</Text>
                        <Text style={styles.smalltext}>the account changes.</Text>

                    </View>
                    <TextInput
                        style={styles.usernameInput}
                        placeholder="Old Username"
                        autoCapitalize="none"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Username"
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.accountButton} onPress={ConfirmUsername}>
                            <Text style={styles.accountButtonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                       
                    </View>
                </View>
            );
        };
        
        const styles = StyleSheet.create({
            container: {
                flex: 1,
                backgroundColor: '#708BDC',
                width: 390,
            },
            textView: {
                paddingBottom: 50,
                paddingTop:30,
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
            buttonContainer:{
                alignItems: 'center',
                margin: 20,
                marginTop: 5,
                marginBottom: 5,
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
            a0000000vatarButtonText:{
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
              fontFamily: 'Sniglet',
              color: 'black'

            },
            usernameInput: {
                marginVertical:10,
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
                fontFamily: 'Sniglet',
                color:'black'

              },
        });
        

export default ChangeUsername;