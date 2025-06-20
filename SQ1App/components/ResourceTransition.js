import React, {useContext} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

function ResourceTransition() {
    const { setCurrentView, setViewParams, viewParams } = useContext(AppContext);
    const { length, map_key } = viewParams;
    const goPrevious = () => {
        setViewParams({
            part: length - 1,
            length: length,
            map_key: map_key,
          });
        setCurrentView('librarybook');
    }
    const goNext = () => {
        setViewParams({
            questionIndex: 0,
            part: length,
            length: length,
            map_key: map_key,
            testScore: 0,
            takePreTest: false,
          });
        setCurrentView('questionnaire');
    }
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                Good job finishing Stepping Stones! We hope you liked it and learned a lot. To see how much you’ve learned we have a few questions to ask you. 
                </Text>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => goPrevious(map_key, length)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => goNext(map_key, length)}
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Next</Text>
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
        flexDirection: 'row',
        gap: 200,
        justifyContent: 'space-between',
    },
    navButton: {
        borderWidth: 2,
        borderColor: '#000000',
        borderStyle: 'solid',
        borderRadius: 10,
        backgroundColor: '#E0E0E0',
    },
    navButtonText: {
        fontSize: 20,
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
        marginTop: 80,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 60,
        borderWidth: 4,
        borderColor: '#000',
    }
});
export default ResourceTransition