import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class PlayersChats extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PlayerChats</Text>
      </View>
    );
  }
}
export default PlayersChats;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
