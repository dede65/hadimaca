import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Example extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.senderMessageContainer}>
          <View style={styles.senderTextcontainer}>
            <Text style={styles.senderText}>Sender</Text>
          </View>
        </View>
        <View style={styles.currentUserMessageContainer}>
          <View style={styles.currentUserTextcontainer}>
            <Text style={styles.currentUserText}>Current User</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default Example;

const styles = StyleSheet.create({
  container: {
    //backgroundColor: "yellow"
  },
  senderMessageContainer: {
    backgroundColor: "yellow",
    margin: 4,
    padding: 4
  },
  senderTextcontainer: {
    backgroundColor: "grey",
    padding: 4
  },
  senderText: {
    backgroundColor: "red"
  },
  currentUserMessageContainer: {
    backgroundColor: "yellow",
    margin: 4,
    padding: 4
  },
  currentUserTextcontainer: {
    backgroundColor: "green",
    padding: 4
  },
  currentUserText: {
    backgroundColor: "blue"
  }
});
