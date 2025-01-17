import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import logo from '../assets/logo.png'
import HealthFactOfWeek from './HealthFactOfWeek'

function Homepage(){
    return(
        <View style={styles.container}>
            <View style={styles.welcome}>
                <Text style={styles.text}>Welcome to the</Text>
                <Image source={logo} style={styles.logo}></Image>
                <Text style={styles.text}>App!</Text>
            </View>
            <View style={styles.factSection}>
                <Text style={styles.factTitle}>Health Fact of the Week</Text>
                <HealthFactOfWeek textStyle={styles.fact} />
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.instructionButton}>
                    <Text style={styles.instructionButtonText}>How to use the app</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    welcome: {
        alignItems: 'center',
    },
    factSection: {
        alignItems: 'center',
        paddingBottom: 25,
        paddingTop: 15,
        paddingHorizontal: 10,
        marginVertical: 20,
        backgroundColor: '#D08BFA',
        borderRadius: 10,
        borderColor: '#33363F',
        borderWidth: 3,
    },
    factTitle: {
        fontSize: 25,
        textDecorationLine: 'underline',
    },
    fact: {
        fontSize: 18,
        textAlign: 'center',
        maxWidth: '90%',
        paddingVertical: 10,
    },
    text: {
        fontSize: 45,
        margin: 10,
    },
    logo: {
        width: 250,
        height: 190,
    },
    buttonContainer:{
        alignItems: 'center',
        margin: 20,
    },
    instructionButton:{
        backgroundColor: '#50BE65',
        alignItems: 'center',
        width: 250,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#33363F',
        padding: 20,
    },
    instructionButtonText:{
        fontSize: 22,
        textAlign: 'center',
    },
});

export default Homepage