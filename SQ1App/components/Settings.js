import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { Svg, Path } from "react-native-svg";

function Settings({setIsModalVisible}){
    return(
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <TouchableOpacity style={styles.closeIcon} onPress={()=>setIsModalVisible(false)}>
                    <Svg width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <Path
                            d="M22.5 7.5L7.5 22.5" 
                            stroke="#33363F" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                        <Path
                            d="M7.5 7.5L22.5 22.5" 
                            stroke="#33363F" 
                            strokeWidth="3" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </Svg>
                </TouchableOpacity>
                <Text style={styles.title}>Settings</Text>
            </View>
            <View style={styles.contentSection}>
                <View>
                    <View style={styles.subtitlesContainer}>
                        <Text style={styles.subtitles}>Account</Text>
                    </View>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Change username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Change password</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.subtitlesContainer}>
                        <Text style={styles.subtitles}>Notifications</Text>
                    </View>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Reminders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Daily reminder time</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Health fact of the day</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={styles.subtitlesContainer}>
                        <Text style={styles.subtitles}>Support</Text>
                    </View>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Terms and conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Privacy policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Help</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.logoutContainer}>
                    <TouchableOpacity style={styles.logoutButton}>
                        <Text style={styles.logout}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleSection:{
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingVertical: 20,
        backgroundColor: "#C0C0C0",
    },
    title: {
        textAlign: "center",
        fontSize: 35,
        width: "100%",
    },
    closeIcon:{
        paddingHorizontal: 15,
    },
    contentSection: {
        flex: 1,
    },
    subtitles: {
        fontSize: 20,
    },
    subtitlesContainer:{
        borderTopWidth: 2,
        borderColor: "#33363F",
        backgroundColor: "#707070",
        padding: 15,
    },
    buttons: {
        backgroundColor: "#D9D9D9",
        padding: 15,
        borderTopWidth: 2,
        borderColor: "#33363F",
    },
    buttonTitles: {
        fontSize: 15,
    },
    logoutContainer: {
        backgroundColor: "#707070",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        borderTopWidth: 2,
        borderColor: "#33363F",
    },
    logoutButton: {
        borderWidth: 2,
        borderRadius: 30,
        borderColor: "#33363F",
        backgroundColor: "#D9D9D9",
        paddingVertical: 20,
        paddingHorizontal: 100,
    },
    logout: {
        fontSize: 20,
    },
});


export default Settings;