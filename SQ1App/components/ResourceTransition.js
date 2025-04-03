import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
function ResourceTransition({ route, navigation }) {
    const { map_key, length } = route.params;
    const goPrevious = () => {
        return navigation.navigate( 'LibraryBook', {map_key: map_key, part: length - 1, length: length})
    }
    const goNext = () => {
       return navigation.navigate( 'Questionnaire', {questionIndex: 0,
        part: length,
        length: length, map_key: map_key})
    }
    return(
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>
                    Great job on reading the book! Now let's take a comprehension quiz
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