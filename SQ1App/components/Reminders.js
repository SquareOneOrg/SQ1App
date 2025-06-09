import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Svg, Path } from "react-native-svg";
import { useState } from 'react';


function Reminders({ onNavChange, setIsModalVisible }) {
    const [reminders, setReminders] = useState({
        weekly: true,
        reset: true,
        streak: true
    });
    


    const toggleReminder = (type) => {
        setReminders(prev => ({
            ...prev,
            [type]: !prev[type]
        }));
    };

    

    return (
        <View style={styles.container}>
            <View style={styles.titleSection}>
      
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
                <TouchableOpacity style={styles.saveButton}>
                    <Text style={styles.saveText}>SAVE</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7D97D1',
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    titleSection: {
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: '100%',
    },
    title: {
        fontSize: 42,
        fontFamily: 'Sniglet',
        color: '#222',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 22,
        color: '#222',
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 28,
    },
    closeIcon: {
        position: 'absolute',
        right: 10,
        top: 10,
        zIndex: 2,
    },
    contentSection: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 10,
    },
    pillRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#D9D9D9',
        borderRadius: 40,
        paddingVertical: 15,
        paddingHorizontal: 30,
        width: '95%',
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    pillText: {
        fontSize: 26,
        color: '#A3A3A3',
        fontFamily: 'Sniglet',
    },
    saveButton: {
        marginTop: 20,
        backgroundColor: '#B6D0F7',
        borderRadius: 40,
        width: '95%',
        alignItems: 'center',
        paddingVertical: 18,
        borderWidth: 3,
        borderColor: '#222',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    saveText: {
        fontSize: 32,
        color: '#222',
        fontFamily: 'Sniglet',
        letterSpacing: 2,
    },
});

export default Reminders; 