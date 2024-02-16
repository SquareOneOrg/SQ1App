import { StyleSheet, View, Text } from "react-native";

function Activity(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Activity Page
            </Text>
        </View>
    );
};

export default Activity

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
    },
});