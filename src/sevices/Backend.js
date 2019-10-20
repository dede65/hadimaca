import firebase from "react-native-firebase";

class Backend {
  constructor() {
    this.firestore = firebase.firestore();
    this.messagesRef = this.firestore.collection("messages");
  }

  // Retrieve messages from firebase firestore
  loadMessages() {}

  // Add messages to firestore
}
