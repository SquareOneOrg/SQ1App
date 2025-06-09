import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, Alert, Modal } from 'react-native';
import { useUser } from '../context/UserContext';
import { AppContext } from '../AppContext';

// Import all avatar accessories - UPDATE THESE PATHS TO MATCH YOUR ASSETS
const gazellaBase = require("../assets/gazella.png");
const gazellaGlasses = require("../assets/gazella_with_glasses.png");
const gazellaCrown = require("../assets/gazella_with_crown.png");
const gazellaCrownGlasses = require("../assets/gazella_with_crown_and_glasses.png");

const giraffeBase = require("../assets/giraffe.png");
const giraffeGlasses = require("../assets/giraffe_with_glasses.png");
const giraffeHat = require("../assets/giraffe_with_hat.png");
const giraffeHatGlasses = require("../assets/giraffe_with_hat_and_glasses.png");

const leopardBase = require("../assets/snow leopard.png");
const leopardGlasses = require("../assets/leopard_with_glasses.png");
const leopardHat = require("../assets/leopard_with_hat.png");
const leopardHatGlasses = require("../assets/leopard_with_hat_and_glasses.png");

const toucanBase = require("../assets/toucan.png");
const toucanGlasses = require("../assets/toucan_with_glasses.png");
const toucanHat = require("../assets/toucan_with_hat.png");
const toucanHatGlasses = require("../assets/toucan_with_hat_and_glasses.png");

// Accessory definitions
const accessories = [
    {
        id: 'glasses',
        name: 'Glasses',
        price: 50,
        icon: giraffeGlasses,
        description: 'Look smart with your new glasses!'
    },
    {
        id: 'hat',
        name: 'Hat',
        price: 75,
        icon: giraffeHat,
        description: 'A fashionable hat for any occasion!'
    },
    {
        id: 'crown',
        name: 'Crown',
        price: 100,
        icon: gazellaCrown,
        description: 'Stunt in this golden crown!'
    }
];

// Avatar configurations
const avatarConfigurations = {
    gazella: {
        base: gazellaBase,
        glasses: gazellaGlasses,
        crown: gazellaCrown,
        'crown+glasses': gazellaCrownGlasses,
        name: 'Gazella'
    },
    giraffe: {
        base: giraffeBase,
        glasses: giraffeGlasses,
        hat: giraffeHat,
        'hat+glasses': giraffeHatGlasses,
        name: 'Giraffe'
    },
    leopard: {
        base: leopardBase,
        glasses: leopardGlasses,
        hat: leopardHat,
        'hat+glasses': leopardHatGlasses,
        name: 'Snow Leopard'
    },
    toucan: {
        base: toucanBase,
        glasses: toucanGlasses,
        hat: toucanHat,
        'hat+glasses': toucanHatGlasses,
        name: 'Toucan'
    }
};

function AvatarAccessoriesShop() {
    const { setCurrentView } = useContext(AppContext);
    const { selectedAvatar, setSelectedAvatar, userProfile, setUserProfile } = useUser();
    
    // Mock user gems - replace with actual user data
    const [userGems, setUserGems] = useState(200);
    const [ownedAccessories, setOwnedAccessories] = useState([]);
    const [currentAvatarType, setCurrentAvatarType] = useState('giraffe');
    const [equippedAccessories, setEquippedAccessories] = useState([]);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedAccessory, setSelectedAccessory] = useState(null);

    const handleBackPress = () => {
        setCurrentView('home');
    };

    const getAvatarImage = () => {
        const config = avatarConfigurations[currentAvatarType];
        if (!config) return config?.base;

        // Determine which image to show based on equipped accessories
        if (equippedAccessories.includes('crown') && equippedAccessories.includes('glasses')) {
            return config['crown+glasses'] || config.base;
        } else if (equippedAccessories.includes('hat') && equippedAccessories.includes('glasses')) {
            return config['hat+glasses'] || config.base;
        } else if (equippedAccessories.includes('glasses')) {
            return config.glasses || config.base;
        } else if (equippedAccessories.includes('hat')) {
            return config.hat || config.base;
        } else if (equippedAccessories.includes('crown')) {
            return config.crown || config.base;
        }
        return config.base;
    };

    const handleBuyAccessory = (accessory) => {
        setSelectedAccessory(accessory);
        setShowConfirmModal(true);
    };

    const confirmPurchase = () => {
        if (userGems >= selectedAccessory.price) {
            setUserGems(userGems - selectedAccessory.price);
            setOwnedAccessories([...ownedAccessories, selectedAccessory.id]);
            Alert.alert(
                "Purchase Successful!",
                `You bought ${selectedAccessory.name} for ${selectedAccessory.price} gems!`,
                [{ text: "OK" }]
            );
        } else {
            Alert.alert(
                "Not Enough Gems",
                `You need ${selectedAccessory.price} gems but only have ${userGems} gems.`,
                [{ text: "OK" }]
            );
        }
        setShowConfirmModal(false);
        setSelectedAccessory(null);
    };

    const toggleAccessory = (accessoryId) => {
        if (ownedAccessories.includes(accessoryId)) {
            if (equippedAccessories.includes(accessoryId)) {
                // Remove accessory
                setEquippedAccessories(equippedAccessories.filter(id => id !== accessoryId));
            } else {
                // Add accessory (handle conflicts)
                let newEquipped = [...equippedAccessories];
                
                // Remove conflicting accessories
                if (accessoryId === 'crown' && newEquipped.includes('hat')) {
                    newEquipped = newEquipped.filter(id => id !== 'hat');
                } else if (accessoryId === 'hat' && newEquipped.includes('crown')) {
                    newEquipped = newEquipped.filter(id => id !== 'crown');
                }
                
                newEquipped.push(accessoryId);
                setEquippedAccessories(newEquipped);
            }
        }
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Text style={styles.backButtonText}>⇦</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Avatar Shop</Text>
                <View style={styles.gemsContainer}>
                    <Text style={styles.gemsText}>💎 {userGems}</Text>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Avatar Preview */}
                <View style={styles.avatarPreviewSection}>
                    <Text style={styles.sectionTitle}>Your Avatar</Text>
                    <View style={styles.avatarPreview}>
                        <Image 
                            source={getAvatarImage()} 
                            style={styles.avatarImage}
                        />
                    </View>
                    <Text style={styles.avatarName}>
                        {avatarConfigurations[currentAvatarType]?.name}
                    </Text>
                </View>

                {/* Avatar Type Selector */}
                <View style={styles.avatarTypeSection}>
                    <Text style={styles.sectionTitle}>Choose Avatar</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        {Object.keys(avatarConfigurations).map((type) => (
                            <TouchableOpacity
                                key={type}
                                style={[
                                    styles.avatarTypeButton,
                                    currentAvatarType === type && styles.selectedAvatarType
                                ]}
                                onPress={() => setCurrentAvatarType(type)}
                            >
                                <Image 
                                    source={avatarConfigurations[type].base} 
                                    style={styles.avatarTypeImage}
                                />
                                <Text style={styles.avatarTypeName}>
                                    {avatarConfigurations[type].name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                {/* Accessories Shop */}
                <View style={styles.accessoriesSection}>
                    <Text style={styles.sectionTitle}>Accessories</Text>
                    {accessories.map((accessory) => {
                        const isOwned = ownedAccessories.includes(accessory.id);
                        const isEquipped = equippedAccessories.includes(accessory.id);
                        
                        return (
                            <View key={accessory.id} style={styles.accessoryItem}>
                                <Image 
                                    source={accessory.icon} 
                                    style={styles.accessoryIcon}
                                />
                                <View style={styles.accessoryInfo}>
                                    <Text style={styles.accessoryName}>{accessory.name}</Text>
                                    <Text style={styles.accessoryDescription}>{accessory.description}</Text>
                                    <Text style={styles.accessoryPrice}>💎 {accessory.price} gems</Text>
                                </View>
                                <TouchableOpacity
                                    style={[
                                        styles.actionButton,
                                        isOwned ? (isEquipped ? styles.equippedButton : styles.equipButton) : styles.buyButton
                                    ]}
                                    onPress={() => isOwned ? toggleAccessory(accessory.id) : handleBuyAccessory(accessory)}
                                >
                                    <Text style={styles.actionButtonText}>
                                        {isOwned ? (isEquipped ? 'Remove' : 'Wear') : 'Buy'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>

            {/* Confirmation Modal */}
            <Modal visible={showConfirmModal} transparent={true} animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Confirm Purchase</Text>
                        <Text style={styles.modalText}>
                            Do you want to buy {selectedAccessory?.name} for {selectedAccessory?.price} gems?
                        </Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowConfirmModal(false)}
                            >
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.confirmButton]}
                                onPress={confirmPurchase}
                            >
                                <Text style={styles.modalButtonText}>Buy</Text>
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
        backgroundColor: '#708BDC',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: 50,
        backgroundColor: '#5A7BC8',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        fontSize: 24,
        color: '#323746',
        fontFamily: 'Sniglet',
    },
    title: {
        fontSize: 24,
        color: '#323746',
        fontFamily: 'Sniglet',
        fontWeight: 'bold',
    },
    gemsContainer: {
        backgroundColor: '#FFD700',
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#323746',
    },
    gemsText: {
        fontSize: 18,
        fontFamily: 'Sniglet',
        color: '#323746',
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
    },
    avatarPreviewSection: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.1)',
        margin: 15,
        borderRadius: 15,
    },
    sectionTitle: {
        fontSize: 20,
        color: '#323746',
        fontFamily: 'Sniglet',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    avatarPreview: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    avatarName: {
        fontSize: 18,
        color: '#323746',
        fontFamily: 'Sniglet',
    },
    avatarTypeSection: {
        padding: 15,
    },
    avatarTypeButton: {
        alignItems: 'center',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        minWidth: 80,
    },
    selectedAvatarType: {
        backgroundColor: '#99B7DE',
        borderWidth: 2,
        borderColor: '#323746',
    },
    avatarTypeImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    avatarTypeName: {
        fontSize: 12,
        color: '#323746',
        fontFamily: 'Sniglet',
        textAlign: 'center',
    },
    accessoriesSection: {
        padding: 15,
    },
    accessoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#323746',
    },
    accessoryIcon: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    accessoryInfo: {
        flex: 1,
    },
    accessoryName: {
        fontSize: 18,
        fontFamily: 'Sniglet',
        color: '#323746',
        fontWeight: 'bold',
    },
    accessoryDescription: {
        fontSize: 14,
        fontFamily: 'Sniglet',
        color: '#666',
        marginVertical: 2,
    },
    accessoryPrice: {
        fontSize: 16,
        fontFamily: 'Sniglet',
        color: '#323746',
        fontWeight: 'bold',
    },
    actionButton: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#323746',
    },
    buyButton: {
        backgroundColor: '#4CAF50',
    },
    equipButton: {
        backgroundColor: '#2196F3',
    },
    equippedButton: {
        backgroundColor: '#FF5722',
    },
    actionButtonText: {
        color: 'white',
        fontFamily: 'Sniglet',
        fontWeight: 'bold',
        fontSize: 14,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontFamily: 'Sniglet',
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#323746',
    },
    modalText: {
        fontSize: 16,
        fontFamily: 'Sniglet',
        textAlign: 'center',
        marginBottom: 20,
        color: '#666',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    modalButton: {
        paddingHorizontal: 25,
        paddingVertical: 12,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#323746',
        minWidth: 80,
    },
    cancelButton: {
        backgroundColor: '#f8f8f8',
    },
    confirmButton: {
        backgroundColor: '#4CAF50',
    },
    modalButtonText: {
        textAlign: 'center',
        fontFamily: 'Sniglet',
        fontWeight: 'bold',
        color: '#323746',
    },
});

export default AvatarAccessoriesShop;