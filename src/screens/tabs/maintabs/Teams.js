import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import firebase from "react-native-firebase";
import SingleTeamItem from "../../../components/SingleTeamItem";
import Loader from "../../../components/Loader";

class Teams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teams: [],
      loading: false
    };
  }

  getTeams = async () => {
    try {
      this.setState({ loading: true });
      const userId = firebase.auth().currentUser.uid;
      const querySnapshot = await firebase
        .firestore()
        .collection("teams")
        .get();

      console.log("querySnapshot", querySnapshot.docs);
      const docs = querySnapshot.docs;
      console.log("docs", docs);

      // filter the current user
      const teams = docs.filter(doc => {
        return doc.id != userId;
      });
      console.log("Team", teams);
      this.setState({ teams: teams, loading: false });
    } catch (error) {
      console.log("getTeams: Error", error.message);
    }
  };

  onModalClose = () => {
    this.setState({ loading: false });
    this.props.navigation.goBack();
  };

  // check notification permission
  checkPermission = async () => {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      console.log(
        "In checkPermission(): in Teams.js: Notification permission is enabled"
      );
      this.getToken();
    } else {
      console.log(
        "In checkPermission(): in Teams.js: Notification permission is not enabled. Requestiong permission"
      );
      this.requestPermission();
    }
  };

  // get firebase cloud messaging token
  getToken = async () => {
    try {
      const fcmToken = await firebase.messaging().getToken();
      console.log("fcmToken", fcmToken);
      // get user id
      const { email, uid } = firebase.auth().currentUser;
      // save notification token to cloud firestore
      await firebase
        .firestore()
        .collection("notificationTokens")
        .doc(uid)
        .set({
          token: fcmToken,
          email: email
        });
    } catch (error) {
      console.log("In getToken() in Teams.js: Error:", error.message);
    }
  };

  requestPermission = async () => {
    try {
      await firebase.messaging().requestPermission();
      // User has authorised permmission
      this.getToken();
    } catch (error) {
      // User has rejected permissions
      console.log("permission rejected", error.message);
    }
  };
  componentDidMount = () => {
    console.log("component did mounttttt");
    this.checkPermission();
    this.getTeams();
  };

  renderItem = ({ item }) => {
    return (
      <SingleTeamItem
        navigation={this.props.navigation}
        singleTeam={item.data()}
      />
    );
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Takımlar</Text>
        </View>
        <Loader loading={this.state.loading} onClose={this.onModalClose} />
        <FlatList
          data={this.state.teams}
          renderItem={this.renderItem}
          //numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default Teams;

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
  headerTitle: { color: "#fff", fontSize: 18 }
});
