import { View, Button } from 'react-native'
import Loading from '../components/Loading.js'

function FormLink({setIsFormModalVisible}){
    return(
        <View style={{flex: 1, justifyContent:"center", alignItems: "center"}}>
            <Button title="close" onPress={()=>setIsFormModalVisible(false)}/>
            <Loading />
        </View>
    );
};

export default FormLink;