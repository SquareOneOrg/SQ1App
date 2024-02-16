import { StyleSheet, View, Text } from "react-native";

function LinkCenter(){
    return(
        <View style={styles.container}>
            <Text style={styles.text}>
                Link Center Page
            </Text>
        </View>
    );
};

export default LinkCenter

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    text: {
        fontSize: 40,
    },
});