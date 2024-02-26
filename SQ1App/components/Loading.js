import { View, ActivityIndicator, StyleSheet, Text } from 'react-native'

function Loading(){
    return(
        <View style={styles.loading}>
            <ActivityIndicator size="large"/>
        </View>
    );
};

styles = StyleSheet.create({
    loading: {
        flex: 1,
    },
});

export default Loading;