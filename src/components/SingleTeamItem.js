import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";

class SingleTeamItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  addToFavorites = async () => {
    try {
      const userId = firebase.auth().currentUser.uid;
      const team = this.props.singleTeam;
      await firebase
        .firestore()
        .collection("favorites")
        .doc(userId)
        .set(
          {
            favorites: firebase.firestore.FieldValue.arrayUnion(team)
          },
          { merge: true }
        );
      console.log("added to favorites");
    } catch (error) {
      console.log("Error occured while adding to favorites", error.message);
    }
  };

  render() {
    console.log("singleTeam", this.props.singleTeam);
    const {
      id,
      teamLogoUri,
      nameOfTheTeam,
      city,
      district,
      numberOfFootballers,
      numberOfSubstitutes
    } = this.props.singleTeam;

    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("TeamDetailsScreen", {
            teamDetails: this.props.singleTeam //pass team details to the screen via navigation
          });
        }}
      >
        <Image style={styles.image} source={{ uri: teamLogoUri }} />
        <View style={styles.content}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center"
              //backgroundColor: "red",
            }}
          >
            <View style={{ flex: 4 }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 18,
                  margin: 2,
                  color: "#212121",
                  fontWeight: "500"
                }}
              >
                {nameOfTheTeam}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <TouchableOpacity
                style={{ paddingHorizontal: 4 }}
                onPress={() => {
                  this.addToFavorites();
                }}
              >
                <Icon name="heart-outline" color="green" size={28} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon name="map-marker" size={18} color="green" />
            <Text
              numberOfLines={1}
              ellipsizeMode="tail"
              style={{ margin: 2, color: "#212121", fontSize: 16 }}
            >
              {district} - {city}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default SingleTeamItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    flexDirection: "row",
    //borderWidth: 0.4,
    borderColor: "green",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 8
  },
  image: {
    //resizeMode:"cover",
    height: 124,
    width: Dimensions.get("screen").width * 0.3,
    marginRight: 8,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6
  },
  content: {
    flex: 1
    //height: height * 0.15
  }
});
