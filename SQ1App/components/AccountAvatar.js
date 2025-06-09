import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useUser } from '../context/UserContext'; 
import { db } from '../firebase-config.js';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { AppContext } from '../AppContext';

function AccountAvatar() {
    const {setCurrentView} = useContext(AppContext);
    console.log('account avatar')
    const { username, setUsername, selectedAvatar, setSelectedAvatar } = useUser();
    console.log(useUser())
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [validationMessage, setValidationMessage] = useState('');
    const [isReady, setIsReady] = useState(false);

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
        "nutsack", "orgasim", "orgasims", "orgasm", "orgasms", "p0rn", "pawn", "pecker", 
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
    
    const avatars = [
        { id: 1, source: require('../assets/avatar1.png') },
        { id: 2, source: require('../assets/avatar2.png') },
        { id: 3, source: require('../assets/avatar3.png') },
        { id: 4, source: require('../assets/avatar4.png') },
        // { id: 5, source: require('../assets/avatar 5.png') },
        // { id: 6, source: require('../assets/avatar 6.png') },
        // { id: 7, source: require('../assets/avatar 7.png') },
        // { id: 8, source: require('../assets/avatar 8.png') },
        // { id: 9, source: require('../assets/avatar 9.png') },
        // { id: 10, source: require('../assets/avatar 10.png') },
        // { id: 11, source: require('../assets/avatar 11.png') },
        // { id: 12, source: require('../assets/avatar 12.png') },
        // { id: 13, source: require('../assets/avatar 13.png') },
        // { id: 14, source: require('../assets/avatar 14.png') },
        // { id: 15, source: require('../assets/avatar 15.png') },
        // { id: 16, source: require('../assets/avatar 16.png') },
        // { id: 17, source: require('../assets/avatar 17.png') },
        // { id: 18, source: require('../assets/avatar 18.png') }
    ];

    useEffect(() => {
        // When component mounts, initialize selectedAvatar if not set
        if (selectedAvatar === undefined || selectedAvatar === null) {
            setSelectedAvatar(0);
        } 
        else if (selectedAvatar < 0 || selectedAvatar >= avatars.length) {
            setSelectedAvatar(0);
        }
        // Mark component as ready after state is initialized
        setIsReady(true);
    }, []);

    const handlePrevious = () => {
        setSelectedAvatar((prev) => (prev === 0 ? avatars.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setSelectedAvatar((prev) => (prev === avatars.length - 1 ? 0 : prev + 1));
    };

    const handleUsernameChange = (text) => {
        setUsername(text);
        
        const lowerCaseText = text.toLowerCase();
    
        const containsBannedWord = bannedWords.some(word => lowerCaseText.includes(word));
    
        if (text.length === 0) {
            setIsUsernameValid(true);
            setValidationMessage('');
        } else if (text.length < 3) {
            setIsUsernameValid(false);
            setValidationMessage('Username must be at least 3 characters');
        } else if (text.length > 15) {
            setIsUsernameValid(false);
            setValidationMessage('Username must be less than 15 characters');
        } else if (!/^[a-zA-Z0-9_]+$/.test(text)) {
            setIsUsernameValid(false);
            setValidationMessage('Only letters, numbers, and underscores allowed');
        } else if (containsBannedWord) {
            setIsUsernameValid(false);
            setValidationMessage('Username contains inappropriate words');
        } else {
            setIsUsernameValid(true);
            setValidationMessage('');
        }
    };

    // Optional: Check if username exists in Firebase
    const checkUsernameAvailability = async () => {
      if (!username || username.trim() === '') {
          Alert.alert("Missing Information", "Please enter a username");
          return;
      }
      
      if (!isUsernameValid) {
          Alert.alert("Invalid Username", validationMessage);
          return;
      }
      
      try {
          // Check if username exists in Firebase
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("username", "==", username.trim()));
          const querySnapshot = await getDocs(q);
          
          if (!querySnapshot.empty) {
              Alert.alert("Username Taken", "This username is already in use. Please try another one.");
              return;
          }
          
          // Username is available, proceed to next screen
          moveToAccountParent();
      } catch (error) {
          console.error("Error checking username: ", error);
          Alert.alert("Error", "Could not verify username availability. Please try again.");
      }
  };

    function moveToAccountParent(){
       setCurrentView('accountparent');
    };

    // Safely get the current avatar
    const getCurrentAvatar = () => {
        if (!isReady || selectedAvatar === null || selectedAvatar === undefined) {
            return avatars[0];
        }
        
        const index = Math.max(0, Math.min(selectedAvatar, avatars.length - 1));
        return avatars[index];
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

                {isReady && (
                    <Image 
                        source={getCurrentAvatar().source}
                        style={styles.image}
                    />
                )}

                <TouchableOpacity 
                    style={styles.arrowButton} 
                    onPress={handleNext}
                >
                    <AntDesign name="right" size={24} color="#323746" />
                </TouchableOpacity>
            </View>

            <TextInput
                style={[
                    styles.usernameInput,
                    !isUsernameValid && styles.invalidInput
                ]}
                onChangeText={handleUsernameChange}
                value={username}
                placeholder="Username"
                maxLength={15}
            />
            
            {!isUsernameValid && (
                <Text style={styles.validationText}>{validationMessage}</Text>
            )}
            
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.accountButton} 
                    onPress={checkUsernameAvailability}
                >
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
        color: '#000000',
        marginTop: 30,
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

export default AccountAvatar;