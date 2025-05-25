import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Svg, Path } from "react-native-svg";
import { useState } from 'react';


function Reminders({ onNavChange, setIsModalVisible }) {
    const [reminders, setReminders] = useState({
        weekly: true,
        reset: true,
        streak: true
    });
    
    function handleClose() {
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false);
        }
    }

    const toggleReminder = (type) => {
        setReminders(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    

    return (
        <View style={styles.container}>
            <View style={styles.titleSection}>
                <TouchableOpacity style={styles.closeIcon} onPress={handleClose}>
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
                <Text style={styles.title}>Reminders</Text>
                <Text style={styles.subtitle}>Change your notification{"\n"}settings here</Text>
            </View>

            <View style={styles.contentSection}>
                <View style={styles.pillRow}>
                    <Text style={styles.pillText}>Weekly Reminders</Text>
                    <Switch
                        value={reminders.weekly}
                        onValueChange={() => toggleReminder('weekly')}
                        trackColor={{ false: "#767577", true: "#7ED957" }}
                        thumbColor={reminders.weekly ? "#fff" : "#f4f3f4"}
                    />
                </View>
                <View style={styles.pillRow}>
                    <Text style={styles.pillText}>Reset Health</Text>
                    <Switch
                        value={reminders.reset}
                        onValueChange={() => toggleReminder('reset')}
                        trackColor={{ false: "#767577", true: "#7ED957" }}
                        thumbColor={reminders.reset ? "#fff" : "#f4f3f4"}
                    />
                </View>
                <View style={styles.pillRow}>
                    <Text style={styles.pillText}>Streak Ending</Text>
                    <Switch
                        value={reminders.streak}
                        onValueChange={() => toggleReminder('streak')}
                        trackColor={{ false: "#767577", true: "#7ED957" }}
                        thumbColor={reminders.streak ? "#fff" : "#f4f3f4"}
                    />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7B9EEB',
    },
    titleSection: {
        alignItems: 'center',
        paddingTop: 40,
        paddingBottom: 10,
    },
    title: {
        fontSize: 45,
        fontFamily: 'Sniglet',
        color: '#222',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 22,
        color: '#222',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginBottom: 30,
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2,
    },
    contentSection: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
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
        marginBottom: 25,
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
        marginTop: 40,
        backgroundColor: '#B6D0F7',
        borderRadius: 40,
        width: '90%',
        alignItems: 'center',
        paddingVertical: 18,
        borderWidth: 3,
        borderColor: '#222',
    },
    saveText: {
        fontSize: 32,
        color: '#222',
        fontFamily: 'Sniglet',
        letterSpacing: 2,
    },
});

export default Reminders; 