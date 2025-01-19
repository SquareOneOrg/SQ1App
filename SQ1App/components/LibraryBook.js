import React, {useState} from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
function LibraryBook({ route }) {
    const { image } = route.params;
    console.log('Received image:', image);
    return (
        <View style={styles.container}>
            <Image 
                source={{ uri: `${image}.jpg` }}
                style={styles.image}
                resizeMode="contain"
            />
            <View style={styles.navigation}>
                <Text style={styles.navButton}>Previous</Text>
                <Text style={styles.navButton}>Next</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '80%',
    },
    navigation: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        padding: 20,
    },
    navButton: {
        fontSize: 16,
        color: '#000',
    }
});


export default LibraryBook;