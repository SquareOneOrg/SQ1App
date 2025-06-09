import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Svg, Path } from "react-native-svg";
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { AppContext } from '../AppContext';
import { useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Settings({onNavChange, setIsModalVisible}) {
    const { logout, username } = useUser();
    const { setCurrentView } = useContext(AppContext);
    const [showLogoutConfirmation, setShowLogoutConfirmation] = useState(false);

    function openChangeUsername() {
       if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false);
        }
        if (typeof onNavChange === 'function') {
            onNavChange('changeUsername');
        }
    }

    function openChangePassword () {
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false); 
        }
        if (typeof onNavChange === 'function') {
            onNavChange('changePassword'); 
        }
    }

    function openHelpPage(){
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false); 
        }
        if (typeof onNavChange === 'function') {
            onNavChange('helppage'); 
        }
    }

    function openReminders() {
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false);
        }
        if (typeof onNavChange === 'function') {
            onNavChange('reminders');
        }
    }

    function openHealthFactSettings() {
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false);
        }
        if (typeof onNavChange === 'function') {
            onNavChange('healthfactsettings');
        }
    }

    function openWeeklyReminderSettings() {
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false);
        }
        if (typeof onNavChange === 'function') {
            onNavChange('weeklyremindersettings');
        }
    }

    function handleClose() {
        if (typeof setIsModalVisible === 'function') {
            setIsModalVisible(false);
        }
    }
    
    async function handleLogout() {
        
        try {
            await logout();
            
            
        } catch (error) {
            console.error('Error during logout:', error);
        }
    }

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
            <Text style={styles.title}>Settings</Text>
        </View>

            <View style={styles.contentSection}>
                <View>
                    <View style={styles.subtitlesContainer}>
                        <Text style={styles.subtitles}>Account</Text>
                    </View>
                    <TouchableOpacity onPress={openChangeUsername} style={styles.buttons}>
                        <Text style={styles.buttonTitles}>Change username</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={openChangePassword}>
                        <Text style={styles.buttonTitles}>Change password</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.subtitlesContainer}>
                        <Text style={styles.subtitles}>Notifications</Text>
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={openReminders}>
                        <Text style={styles.buttonTitles}>Reminders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={openWeeklyReminderSettings}>
                        <Text style={styles.buttonTitles}>Weekly Reminders</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={openHealthFactSettings}>
                        <Text style={styles.buttonTitles}>Health Fact of the Week</Text>
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
                    <TouchableOpacity style={styles.buttons} onPress={openHelpPage}>
                        <Text style={styles.buttonTitles}>Help</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.logoutContainer}>
                    <TouchableOpacity 
                        style={[styles.logoutButton, { backgroundColor: '#FF9999' }]} 
                        onPress={() => setShowLogoutConfirmation(true)}
                    >
                        <Text style={styles.logout}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal
                visible={showLogoutConfirmation}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Log Out</Text>
                        <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.cancelButton]} 
                                onPress={() => setShowLogoutConfirmation(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.modalButton, styles.confirmButton]} 
                                onPress={() => {
                                    setShowLogoutConfirmation(false);
                                    handleLogout();
                                }}
                            >
                                <Text style={styles.modalButtonText}>Log Out</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleSection: {
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        paddingVertical: 20,
        backgroundColor: "#99B7DE",
    },
    title: {
        textAlign: "center",
        fontSize: 35,
        width: "100%",
        fontFamily: 'Sniglet',
    },
    closeIcon: {
        paddingHorizontal: 15,
    },
    contentSection: {
        flex: 1,
    },
    subtitles: {
        fontSize: 20,
        fontFamily: 'Sniglet',
    },
    subtitlesContainer: {
        borderTopWidth: 2,
        borderColor: "#33363F",
        backgroundColor: "#708BDC",
        padding: 15,
    },
    buttons: {
        backgroundColor: "#99B7DE",
        padding: 15,
        borderTopWidth: 2,
        borderColor: "#33363F",
    },
    buttonTitles: {
        fontSize: 15,
        fontFamily: '#99B7DE',
        fontFamily: 'Sniglet',

    },
    logoutContainer: {
        backgroundColor: "#708BDC",
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
        paddingVertical: 20,
        paddingHorizontal: 100,

    },
    logout: {
        fontSize: 20,
        fontFamily: 'Sniglet',
        color: '#33363F',
    },
    closeButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ccc',
        borderRadius: 10,
    },
    closeText: {
        fontSize: 18,
        fontFamily: 'Sniglet',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#99B7DE',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#33363F',
    },
    modalTitle: {
        fontSize: 24,
        fontFamily: 'Sniglet',
        marginBottom: 10,
        color: '#33363F',
    },
    modalText: {
        fontSize: 18,
        fontFamily: 'Sniglet',
        marginBottom: 20,
        textAlign: 'center',
        color: '#33363F',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 30,
        minWidth: 100,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#33363F',
    },
    cancelButton: {
        backgroundColor: '#D9D9D9',
    },
    confirmButton: {
        backgroundColor: '#FF9999',
    },
    modalButtonText: {
        fontSize: 18,
        fontFamily: 'Sniglet',
        color: '#33363F',
    },
});

export default Settings;
