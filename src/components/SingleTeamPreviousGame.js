import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { withNavigation } from "react-navigation";

class SingleTeamPreviousGame extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  onPress = () => {
    const { previousGame } = this.props;
    this.props.navigation.navigate("PreviousPlayedGameScreen", {
      previousGame: previousGame
    });
  };
  render() {
    const { previousGame } = this.props;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} onPress={() => this.onPress()}>
          <View style={styles.homeTeam}>
            <View style={styles.homeTeamLogoContainer}>
              <Image style={styles.homeTeamLogo} />
            </View>
            <View style={styles.homeTeamTitle}>
              <Text>{previousGame.homeTeam.name}</Text>
            </View>
            <View style={styles.homeTeamScore}>
              <Text>{previousGame.homeTeam.score}</Text>
            </View>
          </View>
          <View style={styles.seperator}>
            <Text>-</Text>
          </View>
          <View style={styles.awayTeam}>
            <View style={styles.awayTeamScore}>
              <Text>{previousGame.awayTeam.score}</Text>
            </View>
            <View style={styles.awayTeamTitle}>
              <Text>{previousGame.awayTeam.name}</Text>
            </View>
            <View style={styles.awayTeamLogoContainer}>
              <Image style={styles.awayTeamLogo} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default withNavigation(SingleTeamPreviousGame);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EEEEEE",
    marginVertical: 2,
    paddingVertical: 4
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  homeTeam: {
    //backgroundColor: "yellow",
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
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
    borderColor: "#fff",
    backgroundColor: "grey"
  },
  homeTeamTitle: {},
  homeTeamScore: {},
  seperator: {
    flex: 1,
    alignItems: "center",
    //backgroundColor: "grey",
    justifyContent: "center"
  },

  awayTeam: {
    //backgroundColor: "yellow",
    flex: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
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
    borderColor: "#fff",
    backgroundColor: "grey"
  },
  awayTeamTitle: {},
  awayTeamScore: {}
});
