import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class SingleTeamLineupPlayer extends Component {
  render() {
    const { player } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }}>
          <View style={styles.row}>
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
        </TouchableOpacity>
      </View>
    );
  }
}
export default SingleTeamLineupPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "green",
    marginBottom: 2,
  },
  row: {
    flexDirection: "row"
  },
  imageContainer: {
    margin: 2
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
