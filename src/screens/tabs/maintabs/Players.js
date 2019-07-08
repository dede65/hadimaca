import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";
import firebase from "react-native-firebase";
import SinglePlayer from "../../../components/SinglePlayer";

class Players extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      onlinePlayers: [],
      loading: false
    };
  }

  getOnlinePlayers = () => {
    console.log("get online players");
    this.setState({ loading: true }, async () => {
      try {
        const id = firebase.auth().currentUser.uid;
        const querySnapshot = await firebase
          .firestore()
          .collection("players")
          .where("isPlayerOnline", "==", true)
          .get()
        console.log("online players querySnapshot", querySnapshot);
        const onlinePlayers = querySnapshot.docs.filter(
          player => player.id != id
        );
        console.log("online players", onlinePlayers);
        this.setState({ onlinePlayers: onlinePlayers, loading: false });
      } catch (error) {
        console.log("in getOnlinePlayers in Players.js : Error", error.message);
      }
    });
  };

  getPlayers = () => {
    console.log("in getPlayers in Players.js.js : start");
    try {
      this.setState({ loading: true }, async () => {
        const userId = firebase.auth().currentUser.uid;
        const querysnapshot = await firebase
          .firestore()
          .collection("players")
          .get();
        console.log("player querySnapshot", querysnapshot);
        const players = querysnapshot.docs.filter(
          player => player.id != userId
        );
        console.log("Players", players);
        this.setState({ players: players, loading: false });
      });
    } catch (error) {
      console.log("in getPlayers in Players.js : error", error.message);
    }
    console.log("in getPlayers in Players.js.js : end");
  };

  renderItem = ({ item }) => {
    const player = item._data;
    console.log("Single Player", player);

    return <SinglePlayer navigation={this.props.navigation} player={player} />;
  };

  componentDidMount = () => {
    //this.getPlayers();
    this.getOnlinePlayers();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Oyuncular</Text>
        </View>
        <FlatList
          style={{ flex: 1, paddingTop: 4 }}
          //data={this.state.players}
          data={this.state.onlinePlayers}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default Players;

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
