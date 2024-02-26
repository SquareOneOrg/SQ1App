import { View, Button, StyleSheet } from 'react-native'
import Loading from '../components/Loading.js'

function FormLink({setIsFormModalVisible}){
    return(
        <View>
            <Button title="close" onPress={()=>setIsFormModalVisible(false)}/>
            <Loading />
        </View>
    );
};

export default FormLink;

styles = StyleSheet.create({

});