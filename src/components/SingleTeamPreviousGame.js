import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class SingleTeamPreviousGame extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content}>
          <View style={styles.homeTeam}>
            <View style={styles.homeTeamLogoContainer}>
              <Image style={styles.homeTeamLogo} />
            </View>
            <View style={styles.homeTeamTitle}>
              <Text>Ev sahibi</Text>
            </View>
            <View style={styles.homeTeamScore}>2</View>
          </View>
          <View style={styles.seperator}>
            <Text>-</Text>
          </View>
          <View style={styles.awayTeam}>
            <View style={styles.awayTeamLogoContainer}>
              <Image style={styles.awayTeamLogo} />
            </View>
            <View style={styles.awayTeamTitle}>
              <Text>Deplasman</Text>
            </View>
            <View style={styles.awayTeamScore}>
              <Text>1</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default SingleTeamPreviousGame;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  homeTeam: {
    flex: 3,
    flexDirection: "row"
  },
  homeTeamLogoContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  homeTeamLogo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff"
  },
  homeTeamTitle: {},
  homeTeamScore: {},
  seperator: {
    flex: 1
  },

  awayTeam: {
    flex: 3,
    flexDirection: "row"
  },
  awayTeamLogoContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  awayTeamLogo: {
    height: 30,
    width: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff"
  },
  awayTeamTitle: {},
  awayTeamScore: {}
});
