import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SinglePlayerPreviouslyPlayedTeam extends Component {
  render() {
    const { previouslyPlayedTeam } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }}>
          <View style={styles.row}>
            <View style={{ flexDirection: "row",alignItems:"center", justifyContent: "center" }}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} />
              </View>
              <View style={styles.teamName}>
                <Text style={{ padding: 2 }}>{previouslyPlayedTeam.name}</Text>
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
export default SinglePlayerPreviouslyPlayedTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "green",
    //marginBottom: 2,
    backgroundColor: "#EEEEEE",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  logoContainer: {
    margin: 4
  },
  logo: {
    backgroundColor: "grey",
    height: 30,
    width: 30,
    borderRadius: 15,
    borderColor: "white",
    borderWidth: 2
  },
  teamName: { margin: 2 }
});
