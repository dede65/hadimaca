import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleChatItem from "../../../components/SingleChatItem";
import firebase from "react-native-firebase";

class Chats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserEmail: null,
      chats: []
    };
  }

  renderItem = ({ item, index }) => {
    //console.log("chat:", item);
    return (
      <SingleChatItem
        currentUserEmail={this.state.currentUserEmail}
        chat={item}
        index={index}
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
        .where("users", "array-contains", currentUser.email)
        .onSnapshot(async result => {
          const chats = result.docs.map(doc => doc.data());
          await this.setState({
            currentUserEmail: currentUser.email,
            chats: chats
          });
          console.log("chats : ", chats);
        });
    } catch (error) {
      console.log("Error at Chats.js ", error.message);
    }
  };

  render() {
    //if (this.state.chats.length === 0) return <Text>Yeni mesaj yok.</Text>;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mesajlar</Text>
        </View>
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
export default Chats;

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
  content: {
    flex: 1,
    //backgroundColor: "#eeeeee",
    paddingHorizontal: 4
  }
});
