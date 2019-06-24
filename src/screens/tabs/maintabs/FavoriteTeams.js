import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SingleFavoriteItem from "../../../components/SingleFavoriteItem";
import firebase from "react-native-firebase";

class FavoriteTeams extends Component {
  constructor(props) {
    super(props);

    this.state = {
      favoriteTeams: []
    };
  }

  getFavoriteTeams = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      await firebase
        .firestore()
        .collection("favorites")
        .doc(userId)
        .onSnapshot(doc => {
          console.log("favorite teams", doc.data());
          this.setState({ favoriteTeams: doc.data().favorites });
        });
    } catch (error) {}
  };

  removeFromFavorites = async id => {
    try {
      const favoriteTeams = this.state.favoriteTeams.filter(
        team => team.id != id
      );
      const userId = firebase.auth().currentUser.uid;
      this.setState({ favoriteTeams });
      await firebase
        .firestore()
        .collection("favorites")
        .doc(userId)
        .set(
          {
            favorites: favoriteTeams
          },
          { merge: true }
        );
    } catch (error) {
      console.log("removeFromFavorites: Error", error.message);
    }
  };

  renderItem = ({ item }) => {
    console.log("Takım", item);
    return (
      <SingleFavoriteItem
        singleFavoriteTeam={item}
        navigation={this.props.navigation}
        removeFromFavorites={this.removeFromFavorites}
      />
    );
  };

  componentDidMount = () => {
    this.getFavoriteTeams();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Favori Takımlar</Text>
        </View>
        <View
          style={{ flex: 1, }}
        >
          {this.state.favoriteTeams.length ? (
            <FlatList
              style={{ flex: 1 }}
              data={this.state.favoriteTeams}
              renderItem={this.renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text style={{flex:1, color: "#212121",alignSelf:"center",paddingTop:8 }}>
              Henüz favorilerinize eklemediniz
            </Text>
          )}
        </View>
      </View>
    );
  }
}
export default FavoriteTeams;

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
