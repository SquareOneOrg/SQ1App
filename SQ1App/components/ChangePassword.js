import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useUser } from '../context/UserContext';
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { AppContext } from '../AppContext';

export function ChangePassword({ onNavChange }) {
    const { username } = useUser();
    const { setCurrentView } = useContext(AppContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChangePassword = async () => {
        
        if (!oldPassword || !newPassword || !confirmPassword) {
            Alert.alert("Missing Information", "Please fill in all password fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert("Error", "New passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            // Get the user document
            const usersRef = collection(db, "users");
            const userQuery = query(usersRef, where("username", "==", username));
            const userSnapshot = await getDocs(userQuery);
            
            if (userSnapshot.empty) {
                Alert.alert("Error", "User not found");
                return;
            }

            const userDoc = userSnapshot.docs[0];
            const userData = userDoc.data();

            // Verify old password
            if (userData.password !== oldPassword) {
                Alert.alert("Error", "Current password is incorrect");
                return;
            }

            // Update password in Firestore
            await updateDoc(doc(db, "users", userDoc.id), {
                password: newPassword
            });
            
            Alert.alert("Success", "Password updated successfully", [
                {
                    text: "OK",
                    onPress: () => {
                        setCurrentView('accountparent');
                    }
                }
            ]);
        } catch (error) {
            Alert.alert("Error", "Could not update password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Change Password</Text>
                <Text style={styles.smalltext}>Enter the information below to</Text>
                <Text style={styles.smalltext}>change your password.</Text>
                <Text style={styles.smalltext}>Your parent will be notified of</Text>
                <Text style={styles.smalltext}>the account changes.</Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Old Password"
                value={oldPassword}
                onChangeText={setOldPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoCapitalize="none"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={[styles.accountButton, isLoading && styles.disabledButton]} 
                    onPress={handleChangePassword}
                    disabled={isLoading}
                >
                    <Text style={styles.accountButtonText}>
                        {isLoading ? "UPDATING..." : "SAVE"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#708BDC',
        width: 390,
    },
    textView: {
        paddingBottom: 50,
        paddingTop: 30,
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
    disabledButton: {
        opacity: 0.7,
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
        color: 'black',
        fontFamily: 'Sniglet',
    }
});
          
