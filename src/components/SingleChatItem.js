import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";
import firebase from "react-native-firebase";

class SingleChatItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uri: ""
    };
  }

  onPress = () => {
    console.log("selected chat index: ", this.props.index);
    this.props.navigation.navigate("ChatScreen", {
      chat: this.props.chat,
      previousScreen: this.props.previousScreen
    });
  };
  componentDidMount = () => {};

  render() {
    console.log("chat:", this.props.chat);
    const currentUserEmail = this.props.currentUserEmail;
    const { messages, receiverHasRead, users } = this.props.chat;
    const lastMessage = messages[messages.length - 1]["message"];
    const friendEmail = users.filter(user => user !== currentUserEmail)[0];
    const friendEmailFirstLetter = friendEmail.split("")[0].toUpperCase();
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} onPress={() => this.onPress()}>
          <View style={styles.imageContainer}>
            {!this.state.uri ? (
              <View style={styles.imageLetter}>
                <Text style={styles.initialLetter}>
                  {friendEmailFirstLetter}
                </Text>
              </View>
            ) : (
              <Image
                style={styles.image} /*source={{ uri: messageSenderPhoto }}*/
              />
            )}
          </View>
          <View style={styles.messageDetails}>
            <View style={styles.messageSenderAndDate}>
              <View style={styles.messageSender}>
                <Text style={{ fontWeight: "500", fontSize: 18 }}>
                  {friendEmail}
                </Text>
              </View>
              {/*<View style={styles.messageSentDate}>
                <Text>{messageSentDate}</Text>
              </View>*/}
            </View>
            <View style={styles.messageText}>
              <Text numberOfLines={1}>{lastMessage}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.borderBottom} />
      </View>
    );
  }
}
export default withNavigation(SingleChatItem);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: { flexDirection: "row", padding: 4, alignItems: "center" },
  imageContainer: {},
  imageLetter: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2
  },
  initialLetter: { color: "#FFFFFF", fontSize: 20, fontWeight: "600" },
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
    padding: 2
    //borderBottomColor: "green",
    //borderBottomWidth: 0.5
    //backgroundColor: "yellow"
  },
  messageSenderAndDate: { flexDirection: "row" },
  messageSender: {
    flex: 3,
    marginRight: 2
    //backgroundColor: "red"
  },
  messageSentDate: {
    flex: 2,
    alignItems: "flex-end",
    //backgroundColor: "red",
    marginLeft: 0,
    paddingRight: 4
  },
  messageText: {
    marginTop: 2
    //backgroundColor: "red"
  },
  borderBottom: { marginLeft: 50, borderBottomWidth: 0.5, borderColor: "green" }
});
