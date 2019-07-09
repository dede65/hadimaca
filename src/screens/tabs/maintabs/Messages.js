import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Messages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Messages</Text>
      </View>
    );
  }
}
export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
