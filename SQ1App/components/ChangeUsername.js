import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import logo from '../assets/logo.png'
import { useUser } from '../context/UserContext';
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { AppContext } from '../AppContext';

function ChangeUsername({ onNavChange }) {
    const { username, setUsername } = useUser();
    const { setCurrentView } = useContext(AppContext);
    const [oldUsername, setOldUsername] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [isNewUsernameValid, setIsNewUsernameValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');

    const bannedWords = [
        "4r5e", "5h1t", "5hit", "a_s_s", "a55", "anal", "anus", "ar5e", "arrse", "arse",
        "ass", "ass-fucker", "asses", "assfucker", "assfukka", "asshole", "assholes", 
        "asswhole", "auntfucker", "b!tch", "b00bs", "b17ch", "b1tch", "ballbag", "balls", 
        "ballsack", "bastard", "beastial", "beastiality", "bellend", "bestial", "bestiality", 
        "bi+ch", "biatch", "bitch", "bitcher", "bitchers", "bitches", "bitchin", "bitching", 
        "bloody", "blowjob", "blowjob", "blow jobs", "boiolas", "bollock", "bollok", "boner", 
        "boob", "boobs", "booobs", "boooobs", "booooobs", "booooooobs", "breasts", "buceta", 
        "bugger", "bum", "bunny fucker", "butt", "butthole", "buttmuch", "buttplug", "c0ck", 
        "c0cksucker", "carpet muncher", "cawk", "chink", "cipa", "cl1t", "clit", "clitoris", 
        "clits", "cnut", "cock", "cock-sucker", "cockface", "cockhead", "cockmunch", 
        "cockmuncher", "cocks", "cocksuck", "cocksucked", "cocksucker", "cocksucking", 
        "cocksucks", "cocksuka", "cocksukka", "cok", "cokmuncher", "coksucka", "coon", "cox", 
        "crap", "cum", "cummer", "cumming", "cums", "cumshot", "cunilingus", "cunillingus", 
        "cunnilingus", "cunt", "cuntlick", "cuntlicker", "cuntlicking", "cunts", "cyalis", 
        "cyberfuc", "cyberfuck", "cyberfucked", "cyberfucker", "cyberfuckers", "cyberfucking", 
        "d1ck", "damn", "dick", "dickhead", "dildo", "dildos", "dink", "dinks", "dirsa", 
        "dlck", "dog-fucker", "doggin", "dogging", "donkeyribber", "doosh", "duche", "dyke", 
        "ejaculate", "ejaculated", "ejaculates", "ejaculating", "ejaculatings", "ejaculation", 
        "ejakulate", "f u c k", "f u c k e r", "f4nny", "fag", "fagging", "faggot", "fagot", 
        "fanny", "fannyflaps", "fannyfucker", "fanyy", "fatass", "fcuk", "fcuker", "fcuking", 
        "feck", "fecker", "felching", "fellate", "fellatio", "fingerfuck", "fingerfucked", 
        "fingerfucker", "fingerfuckers", "fingerfucking", "fingerfucks", "fistfuck", 
        "fistfucked", "fistfucker", "fistfuckers", "fistfucking", "fistfuckings", "fistfucks", 
        "flange", "fook", "fooker", "fuck", "fucka", "fucked", "fucker", "fuckers", "fuckhead", 
        "fuckheads", "fuckin", "fucking", "fuckings", "fuckingshitmotherfucker", "fuckme", 
        "fucks", "fuckwhit", "fuckwit", "fudge packer", "fudgepacker", "fuk", "fuker", "fukker", 
        "fukkin", "fuks", "fukwhit", "fukwit", "fux", "fux0r", "f_u_c_k", "gangbang", 
        "gangbanged", "gangbangs", "gaylord", "gaysex", "goatse", "god", "god-dam", "god-damned", 
        "goddamn", "goddamned", "hardcoresex", "hell", "heshe", "hoar", "hoare", "hoer", 
        "homo", "hore", "hotsex", "jack-off", "jackoff", "jap", "jerk-off", "jism", "jiz", 
        "jizm", "jizz", "kawk", "knob", "knobead", "knobed", "knobend", "knobhead", "knobjocky", 
        "knobjokey", "kock", "kondum", "kondums", "kum", "kummer", "kumming", "kums", "kunilingus", 
        "l3i+ch", "l3itch", "labia", "lust", "lusting", "m0f0", "m0fo", "m45terbate", "ma5terb8", 
        "ma5terbate", "masochist", "master-bate", "masterb8", "masterbat*", "masterbat3", 
        "masterbate", "masterbation", "masterbations", "masturbate", "mo-fo", "mof0", "mofo", 
        "mothafuck", "mothafucka", "mothafuckas", "mothafuckaz", "mothafucked", "mothafucker", 
        "mothafuckers", "mothafuckin", "mothafucking", "mothafuckings", "mothafucks", 
        "mother fucker", "motherfuck", "motherfucked", "motherfucker", "motherfuckers", 
        "motherfuckin", "motherfucking", "motherfuckings", "motherfuckka", "motherfucks", 
        "muff", "mutha", "muthafecker", "muthafuckker", "muther", "mutherfucker", "n1gga", 
        "n1gger", "nazi", "nigg3r", "nigg4h", "nigga", "niggah", "niggas", "niggaz", "nigger", 
        "niggers", "nob", "nob jokey", "nobhead", "nobjocky", "nobjokey", "numbnuts", 
        "nutsack", "orgasim", "orgasms", "orgasm", "orgasms", "p0rn", "pawn", "pecker", 
        "penis", "phonesex", "phuck", "phuk", "phuked", "phuking", "phukked", "phukking", 
        "phuks", "phuq", "pigfucker", "pimpis", "piss", "pissed", "pisser", "pissers", 
        "pisses", "pissflaps", "pissin", "pissing", "pissoff", "poop", "porn", "porno", 
        "pornography", "pornos", "prick", "pricks", "pron", "pube", "pusse", "pussi", 
        "pussies", "pussy", "pussys", "rectum", "retard", "rimjaw", "rimming", "s hit", 
        "s.o.b.", "sadist", "scank", "schlong", "screwing", "scroat", "scrote", "scrotum", 
        "semen", "sex", "sh!+", "sh!t", "sh1t", "shag", "shagger", "shaggin", "shagging", 
        "shemale", "shi+", "shit", "shitdick", "shite", "shited", "shitey", "shitfuck", 
        "shitfull", "shithead", "shiting", "shitings", "shits", "shitted", "shitter", "shitting", 
        "shittings", "shitty", "skank", "slut", "sluts", "smegma", "smut", "snatch", "spunk", 
        "s_h_i_t", "t1tt1e5", "t1tties", "tit", "titfuck", "tits", "titt", "tittie5", "tittiefucker",
        "titties", "tittyfuck", "tittywank", "titwank", "tosser", "turd", "tw4t", "twat", "twathead",
        "twatty", "twunt", "twunter", "v14gra", "v1gra", "vagina", "viagra", "vulva", "w00se", "wang", 
        "wank", "wanker", "wanky", "whoar", "whore", "willies", "willy", "xrated", "xxx"
    ];

    const handleNewUsernameChange = (text) => {
        setNewUsername(text);
        
        const lowerCaseText = text.toLowerCase();
        const containsBannedWord = bannedWords.some(word => lowerCaseText.includes(word));
    
        if (text.length === 0) {
            setIsNewUsernameValid(true);
            setValidationMessage('');
        } else if (text.length < 3) {
            setIsNewUsernameValid(false);
            setValidationMessage('Username must be at least 3 characters');
        } else if (text.length > 15) {
            setIsNewUsernameValid(false);
            setValidationMessage('Username must be less than 15 characters');
        } else if (!/^[a-zA-Z0-9_]+$/.test(text)) {
            setIsNewUsernameValid(false);
            setValidationMessage('Only letters, numbers, and underscores allowed');
        } else if (containsBannedWord) {
            setIsNewUsernameValid(false);
            setValidationMessage('Username contains inappropriate words');
        } else {
            setIsNewUsernameValid(true);
            setValidationMessage('');
        }
    };

    const handleChangeUsername = async () => {
        if (!oldUsername || oldUsername.trim() === '') {
            Alert.alert("Missing Information", "Please enter your current username");
            return;
        }

        if (!newUsername || newUsername.trim() === '') {
            Alert.alert("Missing Information", "Please enter a new username");
            return;
        }

        if (oldUsername !== username) {
            Alert.alert("Error", "Current username is incorrect");
            return;
        }

        if (!isNewUsernameValid) {
            Alert.alert("Invalid Username", validationMessage);
            return;
        }

        try {
            // Check if new username exists in Firebase(if already taken)
            const usersRef = collection(db, "users");
            const q = query(usersRef, where("username", "==", newUsername.trim()));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                Alert.alert("Username Taken", "This username is already in use. Please try another one.");
                return;
            }

            // Get the current user document through current username
            const userQuery = query(usersRef, where("username", "==", username));
            const userSnapshot = await getDocs(userQuery);
            
            if (userSnapshot.empty) {
                Alert.alert("Error", "User not found");
                return;
            }

            // Update the username with newUsername
            const userDoc = userSnapshot.docs[0];
            await updateDoc(doc(db, "users", userDoc.id), {
                username: newUsername.trim()
            });

            // Update user for the user Context to update UI
            setUsername(newUsername.trim());
            
            Alert.alert("Success", "Username updated successfully", [
                {
                    text: "OK",
                    onPress: () => {
                        setCurrentView('accountparent');
                    }
                }
            ]);
        } catch (error) {
            console.error("Error updating username: ", error);
            Alert.alert("Error", "Could not update username. Please try again.");
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.textView}>
                <Text style={styles.text}>Change Username</Text>
                <Text style={styles.smalltext}>Enter the information below to</Text>
                <Text style={styles.smalltext}>change your username.</Text>
                <Text style={styles.smalltext}>Your parent will be notified of</Text>
                <Text style={styles.smalltext}>the account changes.</Text>
            </View>
            <TextInput
                style={styles.usernameInput}
                placeholder="Current Username"
                value={oldUsername}
                onChangeText={setOldUsername}
                autoCapitalize="none"
            />
            <TextInput
                style={[
                    styles.input,
                    !isNewUsernameValid && styles.invalidInput
                ]}
                placeholder="New Username"
                value={newUsername}
                onChangeText={handleNewUsernameChange}
                autoCapitalize="none"
            />
            {!isNewUsernameValid && (
                <Text style={styles.validationText}>{validationMessage}</Text>
            )}
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.accountButton} 
                    onPress={handleChangeUsername}
                >
                    <Text style={styles.accountButtonText}>Save</Text>
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
    invalidInput: {
        borderWidth: 1,
        borderColor: '#FF6B6B',
    },
    validationText: {
        color: '#FF6B6B',
        fontSize: 14,
        marginTop: 5,
        alignSelf: 'center',
        fontFamily: 'Sniglet',
    },
});

export default ChangeUsername;