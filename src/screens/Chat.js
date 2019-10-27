import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";
import { TextInput } from "react-native-gesture-handler";
import {
  TEAM_DETAILS_SCREEN,
  PLAYER_DETAILS_SCREEN,
  CHATS_COLLECTION,
  PLAYERS_CHATS_DOCUMENT,
  PLAYERS_CHATS_COLLECTION,
  TEAMS_CHATS_DOCUMENT,
  TEAMS_CHATS_COLLECTION,
  PLAYERS_CHATS_SCREEN,
  TEAMS_CHATS_SCREEN
} from "../utils/constants";
class Chat extends Component {
  constructor(props) {
    super(props);
    this.currentUserEmail = firebase.auth().currentUser.email;
    this.currentUserId = firebase.auth().currentUser.uid;
    this.state = {
      previousScreen: "",
      playerId: "",
      playerEmail: "",
      chat: null,
      messageText: "",
      teamId: "",
      teamEmail: ""
    };
  }

  // Render each message from sender and current user
  renderItem = ({ item }) => {
    //console.log("item:", item);
    if (this.state.chat) {
      console.log("sender:", item.sender);
      const messageContainerStyle =
        item.sender === this.currentUserEmail
          ? styles.currentUserMessageContainer
          : styles.senderUserMessageContainer;
      const messageTextStyle =
        item.sender === this.currentUserEmail
          ? styles.currentUserMessageText
          : styles.senderMessageText;

      return (
        <View style={messageContainerStyle}>
          <View
            style={
              (styles.messageTextContainer,
              item.sender === this.currentUserEmail
                ? { alignItems: "flex-end" }
                : { alignItems: "flex-start" })
            }
          >
            <Text style={messageTextStyle}>{item.message}</Text>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  sendMessage = () => {
    const { previousScreen } = this.state;
    console.log("in send message:prev screen:::", previousScreen);
    if (previousScreen === TEAM_DETAILS_SCREEN) this.sendMessageToTheTeam();
    if (previousScreen === PLAYER_DETAILS_SCREEN) this.sendMessageToThePlayer();
    if (previousScreen === PLAYERS_CHATS_SCREEN) this._sendMessageToThePlayer();
    if (previousScreen === TEAMS_CHATS_SCREEN) this._sendMessageToTheTeam();
  };

  // when navigate from PlayersChats screen
  _sendMessageToThePlayer = async () => {
    if (this.isMessageValid(this.state.messageText)) {
      const { navigation } = this.props;
      console.log("Navigation:::", navigation);
      const chat = navigation.getParam("chat");
      const { users } = chat;
      const playerEmail = users.filter(
        user => user !== this.currentUserEmail
      )[0];
      const documentKey = this.buildDocumentKey(playerEmail);
      console.log("documentKey:", documentKey);
      try {
        await firebase
          .firestore()
          .collection(CHATS_COLLECTION)
          .doc(PLAYERS_CHATS_DOCUMENT)
          .collection(PLAYERS_CHATS_COLLECTION)
          .doc(documentKey)
          .set(
            {
              messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.currentUserEmail,
                message: this.state.messageText,
                createdAt: Date.now()
              }),
              receiverHasRead: false,
              users: documentKey.split(":")
            },
            { merge: true }
          );

        await this.setState({ messageText: "" });
      } catch (error) {
        console.log("Chat._sendMessageToThePlayer():::", error.message);
      }
    }
  };

  // when navigate from PlayerDetails screen
  sendMessageToThePlayer = async () => {
    if (this.isMessageValid(this.state.messageText)) {
      const documentKey = this.buildDocumentKey(this.state.playerEmail);
      console.log("documentKey:", documentKey);
      try {
        await firebase
          .firestore()
          .collection(CHATS_COLLECTION)
          .doc(PLAYERS_CHATS_DOCUMENT)
          .collection(PLAYERS_CHATS_COLLECTION)
          .doc(documentKey)
          .set(
            {
              messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.currentUserEmail,
                message: this.state.messageText,
                createdAt: Date.now()
              }),
              receiverHasRead: false,
              users: documentKey.split(":")
            },
            { merge: true }
          );

        await this.setState({ messageText: "" });
      } catch (error) {
        console.log("Chat.sendMessageToThePlayer:::", error.message);
      }
    }
  };

  // when navigate from TeamsChats screen
  _sendMessageToTheTeam = async () => {
    if (this.isMessageValid(this.state.messageText)) {
      const { navigation } = this.props;
      console.log("Navigation:::", navigation);
      const chat = navigation.getParam("chat");
      const { users } = chat;
      const teamEmail = users.filter(user => user !== this.currentUserEmail)[0];
      const documentKey = this.buildDocumentKey(teamEmail);
      console.log("documentKey:", documentKey);
      try {
        await firebase
          .firestore()
          .collection(CHATS_COLLECTION)
          .doc(TEAMS_CHATS_DOCUMENT)
          .collection(TEAMS_CHATS_COLLECTION)
          .doc(documentKey)
          .set(
            {
              messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.currentUserEmail,
                message: this.state.messageText,
                createdAt: Date.now()
              }),
              receiverHasRead: false,
              users: documentKey.split(":")
            },
            { merge: true }
          );

        await this.setState({ messageText: "" });
      } catch (error) {
        console.log("Chat._sendMessageToTheTeam:::", error.message);
      }
    }
  };

  // when navigate from team details
  sendMessageToTheTeam = async () => {
    if (this.isMessageValid(this.state.messageText)) {
      const documentKey = this.buildDocumentKey(this.state.teamEmail);
      console.log("documentKey:", documentKey);
      try {
        await firebase
          .firestore()
          .collection(CHATS_COLLECTION)
          .doc(TEAMS_CHATS_DOCUMENT)
          .collection(TEAMS_CHATS_COLLECTION)
          .doc(documentKey)
          .set(
            {
              messages: firebase.firestore.FieldValue.arrayUnion({
                sender: this.currentUserEmail,
                message: this.state.messageText,
                createdAt: Date.now()
              }),
              receiverHasRead: false,
              users: documentKey.split(":")
            },
            { merge: true }
          );

        await this.setState({ messageText: "" });
      } catch (error) {
        console.log("Chat.sendMessageToTheTeam:::", error.message);
      }
    }
  };

  /**
   * Build a document key ordered alphabetically with user's id.
   * e.g: "userA@hadimaca.com:userB@hadimaca.com"
   * @param: teamOrPlayerId -> The team or the player who current user will send a message
   */
  buildDocumentKey = teamOrPlayerEmail =>
    [this.currentUserEmail, teamOrPlayerEmail].sort().join(":");

  /**
   * Make sure user does not send an empty message
   * @param: text -> message text
   */
  isMessageValid = text => text && text.replace(/\s/g, "").length;

  getChats = () => {
    if (this.state.previousScreen === PLAYER_DETAILS_SCREEN)
      this.getChatsWithPlayer();
    if (this.state.previousScreen === TEAM_DETAILS_SCREEN)
      this.getChatsWithTeam();
    if (this.state.previousScreen === PLAYERS_CHATS_SCREEN)
      this._getChatsWithPlayer();
    if (this.state.previousScreen === TEAMS_CHATS_SCREEN)
      this._getChatsWithTeam();
  };

  // when navigate from PlayersChats screen
  _getChatsWithPlayer = async () => {
    const { navigation } = this.props;
    console.log("Navigation:::", navigation);
    const chat = navigation.getParam("chat");
    const { users } = chat;
    const playerEmail = users.filter(user => user !== this.currentUserEmail)[0];
    try {
      const documentKey = this.buildDocumentKey(playerEmail);
      console.log("documentKey in chat._getChatWithPlayer:::", documentKey);
      await firebase
        .firestore()
        .collection(CHATS_COLLECTION)
        .doc(PLAYERS_CHATS_DOCUMENT)
        .collection(PLAYERS_CHATS_COLLECTION)
        .doc(documentKey)
        .onSnapshot(async doc => {
          console.log("Chat with the Player:::", doc.data());
          await this.setState({ chat: doc.data() });
        });
    } catch (error) {
      console.log("_getChatsWithPlayer() in Chat.js Error:::", error.message);
    }
  };

  getChatsWithPlayer = async () => {
    try {
      const documentKey = this.buildDocumentKey(this.state.playerEmail);
      console.log("documentKey in chat.getChatWithTeam:::", documentKey);
      await firebase
        .firestore()
        .collection(CHATS_COLLECTION)
        .doc(PLAYERS_CHATS_DOCUMENT)
        .collection(PLAYERS_CHATS_COLLECTION)
        .doc(documentKey)
        .onSnapshot(async doc => {
          console.log("Chat with the Player:::", doc.data());
          await this.setState({ chat: doc.data() });
        });
    } catch (error) {
      console.log("getChatsWithPlayer() in Chat.js Error:::", error.message);
    }
  };

  // when navigate from TeamChats screen
  _getChatsWithTeam = async () => {
    const { navigation } = this.props;
    console.log("Navigation:::", navigation);
    const chat = navigation.getParam("chat");
    const { users } = chat;
    const playerEmail = users.filter(user => user !== this.currentUserEmail)[0];
    try {
      const documentKey = this.buildDocumentKey(playerEmail);
      console.log("documentKey in chat._getChatWithPlayer:::", documentKey);
      const doc = await firebase
        .firestore()
        .collection(CHATS_COLLECTION)
        .doc(TEAMS_CHATS_DOCUMENT)
        .collection(TEAMS_CHATS_COLLECTION)
        .doc(documentKey)
        .onSnapshot(async doc => {
          console.log("Chat with the Player:::", doc.data());
          await this.setState({ chat: doc.data() });
        });
    } catch (error) {
      console.log("_getChatsWithTeam() in Chat.js Error:::", error.message);
    }
  };

  // When navigate from TeamDetails screen
  getChatsWithTeam = async () => {
    try {
      const documentKey = this.buildDocumentKey(this.state.teamEmail);
      console.log("documentKey in chat.getChatWithTeam:::", documentKey);
      const doc = await firebase
        .firestore()
        .collection(CHATS_COLLECTION)
        .doc(TEAMS_CHATS_DOCUMENT)
        .collection(TEAMS_CHATS_COLLECTION)
        .doc(documentKey)
        .onSnapshot(async doc => {
          console.log("Chat with the Team:::", doc.data());
          await this.setState({ chat: doc.data() });
        });
    } catch (error) {
      console.log("getChatsWithTeam() in Chat.js Error:::", error.message);
    }
  };

  componentDidMount = async () => {
    console.log("Chat.componentdidMount()");
    const { navigation } = this.props;
    const previousScreen = navigation.getParam("previousScreen");
    console.log("Chat.componentdidMount(): previousScreen:::", previousScreen);
    // These 2 params come from PlayerDetails.js
    const playerId = navigation.getParam("playerId"); // This is belongs to the player who the current user will send a message
    const playerEmail = navigation.getParam("playerEmail"); // This is belongs to the player who the current user will send a message
    // These 2 params come from TeamDetails.js
    const teamId = navigation.getParam("teamId"); // This is belongs to the team which the current user will send a message
    const teamEmail = navigation.getParam("teamEmail"); // This is belongs to the team which the current user will send a message

    try {
      await this.setState({
        previousScreen,
        playerId,
        playerEmail,
        teamId,
        teamEmail
      });
      this.getChats();
    } catch (error) {
      console.log("Chat.componentDidMount.Error:", error.message);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeftButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="chevron-left" color="white" size={48} />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 3, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerTitle}>Player or Team Name</Text>
          </View>
          <View style={styles.headerRightButton} />
        </View>
        <View style={{ flex: 1, padding: 4 }}>
          {this.state.chat ? (
            <FlatList
              ref="flatList"
              onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
              style={{ marginBottom: 48 }}
              data={this.state.chat.messages}
              renderItem={this.renderItem}
              //numColumns={2}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : null}
          <View style={styles.sendMessageContainer}>
            <TextInput
              onChangeText={messageText => this.setState({ messageText })}
              value={this.state.messageText}
              placeholder="Bir mesaj yaz"
              style={styles.textInput}
            />
            <TouchableOpacity
              onPress={this.sendMessage}
              style={styles.sendButton}
            >
              <Text style={styles.sendButtontitle}>Gönder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerLeftButton: {
    //backgroundColor: "yellow",
    flex: 1
  },
  headerTitle: { color: "#fff", fontSize: 18 },
  headerRightButton: { backgroundColor: "yellow", flex: 1 },
  currentUserMessageContainer: {
    alignItems: "flex-end",
    margin: 4
  },
  senderUserMessageContainer: {
    alignItems: "flex-start",
    margin: 4
  },
  messageTextContainer: {
    backgroundColor: "yellow",
    width: "65%",
    padding: 4
  },
  currentUserMessageText: {
    backgroundColor: "#79d279",
    borderRadius: 5,
    padding: 4,
    marginLeft: "35%",
    fontSize: 18,
    color: "#000"
  },
  senderMessageText: {
    backgroundColor: "#f2f2f2",
    borderRadius: 5,
    padding: 4,
    marginRight: "35%",
    fontSize: 18,
    color: "#000"
  },
  sendMessageContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    flexDirection: "row",
    padding: 2,
    paddingTop: 4,
    alignItems: "center"
  },
  textInput: {
    flex: 4,
    //backgroundColor: "red",
    color: "#000",
    borderWidth: 0.5,
    borderColor: "green",
    borderRadius: 24,
    paddingLeft: 16
  },
  sendButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    paddingVertical: 13,
    marginLeft: 2,
    borderWidth: 0.5,
    borderColor: "green",
    borderRadius: 24
  },
  sendButtontitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600"
  }
});
