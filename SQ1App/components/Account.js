import { StyleSheet, View, Text } from "react-native";

function Account(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Account Page
            </Text>
        </View>
    );
};

export default Account

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
    },
});