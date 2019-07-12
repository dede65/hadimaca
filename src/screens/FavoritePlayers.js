import React, { Component } from "react";
import { 
    View,
    Text,
    StyleSheet
    } from "react-native";

class FavoritePlayers extends Component{
    render(){
        return (
            <View style={styles.container}>
                <Text>FavoritePlayers</Text>
            </View>
        );
    }
}
export default FavoritePlayers;

const styles = StyleSheet.create({
    container:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
    }
});