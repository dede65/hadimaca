import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class PlayerDetails extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Oyuncu Detayları</Text>
      </View>
    );
  }
}
export default PlayerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
