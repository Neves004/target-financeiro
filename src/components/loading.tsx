import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native";

export function Loading(){
    return(
        <ActivityIndicator color={'#00f'} style={styles.container}/>
    )
}

 const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:' #fff'
    }
})
