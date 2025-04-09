import React, {useContext, useState} from 'react';
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { AppContext } from '../AppContext';
import { useUser } from '../context/UserContext';
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';


function EndPage() {
    const { username } = useUser();
    const { setCurrentView } = useContext(AppContext);
    const [viewTests, setViewTests] = useState(false);
    const [preTest, setPreTest] = useState(0);
    const [postTest, setPostTest] = useState(0);
    const goToMenu = () => {
        setCurrentView('library')
    }
    const viewScores = async() => {
        try {
            const usersRef = collection(db, 'users');
            const q = query(usersRef, where('username', '==', username));
            const querySnapshot = await getDocs(q);
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setPreTest(userData.preTest)
            setPostTest(userData.postTest)
            setViewTests(true);
            console.log('successfully posted', userData);
        } catch {
            console.error("Firestore update error:", error);
            Alert.alert("Error", "Something went wrong. Please try again later.");
        }
    }

    return(
        <View style={styles.container}>
             <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Great job on finishing the end of the book!
                </Text>
            </View>
                {viewTests && 
                <View style={styles.textContainer}>
                <Text style={styles.testText}>
                    Pre Comprehension Quiz: {preTest} / 24
                </Text>
                <Text style={styles.testText}>
                    Post Comprehension Quiz: {postTest} / 24
                </Text>
                </View>}

             <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => goToMenu()} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Navigate to Main Menu</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => viewScores()} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>View your Pre Quiz and Post Quiz Scores</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'lightblue',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: 'column',
        width: '70%',
        // gap: 200,
        justifyContent: 'space-between',
    },
    navButton: {
        borderWidth: 2,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
        marginBottom: 40,
    },
    navButtonText: {
        fontSize: 25,
        fontFamily: 'Sniglet',
        padding: 4,
    },
    text: {
        fontSize: 35,
        fontFamily: 'Sniglet',
        textAlign: 'center',
        padding: 4,
    },
    textContainer: {
        marginTop: 10,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 60,
        borderWidth: 4,
        borderColor: '#000',
    },
    testText: {
        fontSize: 30,
        fontFamily: 'Sniglet',
        textAlign: 'center',
        padding: 4,
    }
})
export default EndPage