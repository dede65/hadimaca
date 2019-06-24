import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
class SingleFavoriteItem extends Component {
  constructor(props) {
    super(props);
  }

  removeFromFavorites = id => {
    console.log("removed from favorites");
    this.props.removeFromFavorites(id);
  };

  render() {
    console.log("singleFavoriteTeam", this.props.singleFavoriteTeam);
    const {
      id,
      teamLogoUri,
      nameOfTheTeam,
      city,
      district,
      numberOfFootballers,
      numberOfSubstitutes
    } = this.props.singleFavoriteTeam;
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("TeamDetailsScreen", {
            teamDetails: this.props.singleFavoriteTeam //pass team details to the screen via navigation
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
                  this.removeFromFavorites(id);
                }}
              >
                <Icon name="heart" color="green" size={28} />
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
export default SingleFavoriteItem;

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
