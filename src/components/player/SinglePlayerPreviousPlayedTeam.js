import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SinglePlayerPreviousPlayedTeam extends Component {
  render() {
    const { previousPlayedTeam } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={{ flex: 1 }}>
          <View style={styles.row}>
            <View style={{ flexDirection: "row",alignItems:"center", justifyContent: "center" }}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo} source={previousPlayedTeam.logo} />
              </View>
              <View style={styles.teamName}>
                <Text style={{ padding: 2 }}>{previousPlayedTeam.name}</Text>
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
export default SinglePlayerPreviousPlayedTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomWidth: 0.5,
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
    backgroundColor: "#fff",
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 1,
    padding:4
  },
  teamName: { margin: 2 }
});
