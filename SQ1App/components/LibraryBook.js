import React, {useContext} from 'react';
import imageMap from './ImageMap';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AppContext } from '../AppContext';

function LibraryBook() {
    const { setCurrentView, setViewParams, viewParams } = useContext(AppContext);
    const { part, length, map_key } = viewParams;
    const image = `${map_key}${part}`;
    const goPrevious = () => {
        if (part - 1 > 0){
            setViewParams({
                part: part - 1,
                length: length,
                map_key: map_key,
              });
            setCurrentView('librarybook');
            // return navigation.navigate( 'LibraryBook', {map_key: map_key, part: part - 1, length: length})
        }
    }
    const goNext = () => {
        if (part + 1 <= length) {
            setViewParams({
                part: part + 1,
                length: length,
                map_key: map_key,
              });
            setCurrentView('librarybook');
            // return navigation.navigate( 'LibraryBook', {map_key: map_key, part: part + 1, length: length})
        }
        else if (part == length) {
            setViewParams({
                length: length,
                map_key: map_key,
              });
            setCurrentView('resourcetransition');
            // return navigation.navigate( 'ResourceTransition', {map_key: map_key, length: length})
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.imageWrapper}>
                <Image 
                    source={imageMap[image]}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    onPress={() => goPrevious(map_key, part, length)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => goNext(map_key, part, length)} 
                    style={styles.navButton}
                >
                    <Text style={styles.navButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'lightblue',
      },
    imageWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    image: {
        width: '100%',
        height: '82%',
        aspectRatio: 82 / 100,   
        borderWidth: 4,
        borderColor: '#000',
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
});


export default LibraryBook;