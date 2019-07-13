import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class Messages extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mesajlar</Text>
        </View>
        <View style={styles.content}>
          <Text>Yeni mesaj yok.</Text>
        </View>
      </View>
    );
  }
}
export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: { color: "#fff", fontSize: 18 },
  content:{
    flex:1,
    backgroundColor: "#eeeeee",
    padding:4
  }
});
