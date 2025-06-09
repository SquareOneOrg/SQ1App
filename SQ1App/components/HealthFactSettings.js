import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Svg, Path } from "react-native-svg";
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HealthFactSettings({ onNavChange, setIsModalVisible }) {
    const [allowNotifications, setAllowNotifications] = useState(true);

    useEffect(() => {
        const loadNotificationPreference = async () => {
            try {
                const savedPreference = await AsyncStorage.getItem('healthFactNotifications');
                if (savedPreference !== null) {
                    setAllowNotifications(JSON.parse(savedPreference));
                }
            } catch (error) {
                console.error('Error loading notification preference:', error);
            }
        };
        loadNotificationPreference();
    }, []);



    async function handleSave() {
        try {
            await AsyncStorage.setItem('healthFactNotifications', JSON.stringify(allowNotifications));
           
        } catch (error) {
            console.error('Error saving notification preference');
        }
    }

    return (
        <View style={styles.container}>
           
            <Text style={styles.title}>Health Fact of{"\n"}the Week</Text>
            <Text style={styles.subtitle}>
                Our Health Fact of the Week helps students stay engaged with the app and continue to learn beyond our resources.
            </Text>
            <View style={styles.pillRow}>
                <Text style={styles.pillText}>Allow Notifications</Text>
                <Switch
                    value={allowNotifications}
                    onValueChange={setAllowNotifications}
                    trackColor={{ false: "#767577", true: "#7ED957" }}
                    thumbColor={allowNotifications ? "#fff" : "#f4f3f4"}
                />
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveText}>SAVE</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>
                Hint: If you're curious about one of our facts, click the source button on the home page to find out where we got the fact!
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B9EEB',
        alignItems: 'center',
        paddingTop: 40,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2,
    },
    title: {
        fontSize: 45,
        fontFamily: 'Sniglet',
        color: '#222',
        marginBottom: 10,
        textAlign: 'center',
        marginTop: 10,
    },
    subtitle: {
        fontSize: 22,
        color: '#222',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginBottom: 40,
        marginHorizontal: 10,
    },
    pillRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#D9D9D9',
        borderRadius: 40,
        paddingVertical: 18,
        paddingHorizontal: 30,
        width: '90%',
        marginBottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    pillText: {
        fontSize: 26,
        color: '#A3A3A3',
        fontFamily: 'Sniglet',
    },
    saveButton: {
        backgroundColor: '#B6D0F7',
        borderRadius: 40,
        width: '90%',
        alignItems: 'center',
        paddingVertical: 18,
        borderWidth: 3,
        borderColor: '#222',
        marginBottom: 30,
    },
    saveText: {
        fontSize: 32,
        color: '#222',
        fontFamily: 'Sniglet',
        letterSpacing: 2,
    },
    hint: {
        fontSize: 20,
        color: '#222',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginTop: 10,
        marginHorizontal: 10,
    },
});

export default HealthFactSettings; 