import React, {useState} from 'react';
import { View, Image, Text, StyleSheet, Button } from 'react-native';
function LibraryBook({ route, navigation }) {
    const { title, part, length } = route.params;
    console.log('title')
    console.log(title)
    console.log('end')
    const image = `${title}${part}`;
    const imageUri = `${image}.jpg`;
    console.log('Image URI:', imageUri);
    const goPrevious = () => {
        if (part - 1 > 0){
            return navigation.navigate( 'LibraryBook', {title: title, part: part - 1, length: length})
        }
    }
    const goNext = () => {
        if (part + 1 <= length) {
            return navigation.navigate( 'LibraryBook', {title: title, part: part + 1, length: length})
        }
        else if (part + 1 == length + 1) {
            return navigation.navigate( 'ResourceTransition', {title: title, part: part + 1, length: length})
        }
    }

    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: `${image}.jpg` }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.buttonContainer}>
                <Button onPress={() => goPrevious(title, part, length)} style={styles.navButton} title="Previous"/>
                <Button onPress={() => goNext(title, part, length)} style={styles.navButton} title="Next"/>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'lightblue',
      },
    header: {
        marginTop: 20,
        fontSize: 45,
        marginBottom: 20,
        backgroundColor: 'darkblue',
        fontFamily: 'Sniglet',
    },
    image: {
        marginTop: 20,
        width: '100%',
        height: '80%',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 340,
        justifyContent: 'space-between',
    },
    navButton: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Sniglet',
    }
});


export default LibraryBook;