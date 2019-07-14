import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class SingleMessage extends Component {
  render() {
    const {
      messageSender,
      messageSenderPhoto,
      messageText,
      messageSentDate
    } = this.props.message;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={messageSenderPhoto}/>
          </View>
          <View style={styles.messageDetails}>
            <View style={styles.messageSenderAndDate}>
              <View style={styles.messageSender}>
                <Text>{messageSender}</Text>
              </View>
              <View style={styles.messageSentDate}>
                <Text>{messageSentDate}</Text>
              </View>
            </View>
            <View style={styles.messageText}>
              <Text>{messageText}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SingleMessage;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: { flexDirection: "row", padding: 4,alignItems:"center"},
  imageContainer: {},
  image: {
    backgroundColor: "grey",
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2
  },
  messageDetails: {
    flex: 1,
    padding: 2,
    borderBottomColor:"green",
    borderBottomWidth:0.5
    //backgroundColor: "yellow"
  },
  messageSenderAndDate: { flexDirection: "row" },
  messageSender: {
    flex:3,
    marginRight: 2,
    //backgroundColor: "red"
  },
  messageSentDate: {
    flex: 2,
    alignItems:"flex-end",
    //backgroundColor: "red",
    marginLeft: 0,
    paddingRight:4
  },
  messageText: {
    marginTop: 2,
    //backgroundColor: "red"
  }
});
