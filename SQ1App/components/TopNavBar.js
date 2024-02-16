import {Text, View, StyleSheet} from 'react-native'

function TopNavBar(){
    return(
        <View style={styles.navBar}>
            <Text>Top Nav Bar</Text>
        </View>

    );
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'steelblue',
        width: '100%',
        height: '12%',
        borderBottomWidth: 3,
        borderColor: '#33363F',
    },
});

export default TopNavBar;