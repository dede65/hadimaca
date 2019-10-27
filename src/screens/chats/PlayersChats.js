import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleChatItem from "../../components/SingleChatItem";
import firebase from "react-native-firebase";
import { PLAYERS_CHATS_SCREEN } from "../../utils/constants";

class PlayersChats extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUserEmail: null,
      chats: []
    };
  }

  renderItem = ({ item, index }) => {
    console.log("renderItem -> chat:::", item);
    return (
      <SingleChatItem
        currentUserEmail={this.state.currentUserEmail}
        chat={item}
        index={index}
        previousScreen = {PLAYERS_CHATS_SCREEN}
      />
    );
  };

  componentDidMount = async () => {
    const currentUser = firebase.auth().currentUser;

    // Retrieve chat list from firebase and set state
    try {
      await firebase
        .firestore()
        .collection("chats")
        .doc("PlayersChatsDocument")
        .collection("PlayersChatsCollection")
        .where("users", "array-contains", currentUser.email)
        .onSnapshot(async result => {
          console.log("PlayersChats.js -> result:::", result);
          const chats = result.docs.map(doc => doc.data());
          console.log("PlayersChats.js -> chats:::", chats);
          await this.setState({
            currentUserEmail: currentUser.email,
            chats: chats
          });
          console.log("Players chats::: ", chats);
        });
    } catch (error) {
      console.log("Error at PlayersChats.js ", error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          {this.state.chats.length > 0 ? (
            <FlatList
              //data={this.state.chats}
              data={this.state.chats}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text>Yeni mesajınız yok.</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
export default PlayersChats;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    //backgroundColor: "#eeeeee",
    paddingHorizontal: 4
  }
});
