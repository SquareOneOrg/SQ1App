import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, WebView, Linking } from 'react-native';
import Svg, { Circle,Rect,Line, Path } from 'react-native-svg';

export default function ContactUs() {
    

    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.text}>Contact Us</Text>
                <View style={styles.textView}>
                    <Text style={styles.smalltext}>If you are having issues with</Text>
                    <Text style={styles.smalltext}>our app or have questions</Text>
                    <Text style={styles.smalltext}>about Square One content,</Text>
                    <Text style={styles.smalltext}>contact us via email!</Text>
                </View>
                <View style= {styles.textView}>
                <Text style={styles.smalltext}>info@SQ1.org</Text>
                </View>
                <View style={styles.textView}>
                    <Text style={styles.smalltext}>You can also check out our website and social media pages!</Text>
                </View>
                <View style={styles.linksView}>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.sq1.org/')}><Text style={styles.smalltext}>www.SQ1.org</Text></TouchableOpacity>
                    <View style = {styles.logos}>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.instagram.com/squareone_org/')}><Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram-icon lucide-instagram"><Rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><Path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><Line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></Svg></TouchableOpacity>
                        <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/company/square-one-1/')}><Svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-linkedin-icon lucide-linkedin"><Path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><Rect width="4" height="12" x="2" y="9"/><Circle cx="4" cy="4" r="2"/></Svg></TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#708BDC',
        width: '100%',
        alignItems: 'center',
    },
    logos: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        },
    icon:{
        marginHorizontal: 5,
    },
    text: {
        fontSize: 45,
        color: 'black',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    textView: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop:10,
        margin: 10,
    },
    linksView: {
        alignItems: 'center',
        paddingBottom: 10,
        paddingTop:10,
        margin: 10,
    },
    smalltext: {
        fontSize: 20,
        color: 'black',
        fontFamily: 'Sniglet',
        textAlign: 'center',
    },
    buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    accountButton: {
        backgroundColor: '#99B7DE',
        alignItems: 'center',
        width: 340,
        borderRadius: 40,
        borderWidth: 3,
        borderColor: '#323746',
        padding: 20,
    },
    accountButtonText: {
        fontSize: 22,
        textAlign: 'center',
        color: 'black',
        fontFamily: 'Sniglet',
    },
});