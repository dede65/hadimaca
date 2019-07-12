import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SingleTeamLineupPlayer extends Component {
  render() {
    const { player } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }}>
          <View style={styles.row}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} />
              </View>
              <View style={styles.playerDetails}>
                <Text style={{ padding: 2 }}>
                  {player.firstName + " " + player.lastName}
                </Text>
                <Text style={{ padding: 2 }}>{player.position}</Text>
              </View>
            </View>
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon name="chevron-right" color="green" size={32} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SingleTeamLineupPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    borderBottomWidth: 1,
    borderColor: "green",
    //marginBottom: 2
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  imageContainer: {
    margin: 4
  },
  image: {
    backgroundColor: "grey",
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 2
  },
  playerDetails: { margin: 2 }
});
