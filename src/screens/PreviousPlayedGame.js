import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
class PreviousPlayedGame extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();
    this.state = {
      previousGames: {
        homeTeam: {
          name: "Galatasaray",
          score: 2,
          logo: require("../assets/team-logos/galatasaray.png")
        },
        awayTeam: {
          name: "Başakşehir",
          score: 1,
          logo: require("../assets/team-logos/basaksehir.png")
        },
        date:
          this.date.getDay() +
          "/" +
          this.date.getMonth() +
          "/" +
          this.date.getFullYear()
      },
      lineUps: {
        homeTeamLineUp: [
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" }
        ],
        awayTeamLineUp: [
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" },
          { firstName: "Uğur", lastName: "DEDE" }
        ]
      }
    };
  }

  renderHomeTeamLineUp = () => {
    return this.state.lineUps.homeTeamLineUp.map((singlePlayer, index) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eeeeee",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: "green",
            marginTop: 1,
            padding: 2
          }}
        >
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: "grey",
              borderColor: "white",
              borderWidth: 1,
              marginRight: 8
            }}
          />
          <View>
            <Text>{singlePlayer.firstName + " " + singlePlayer.lastName}</Text>
          </View>
        </View>
      );
    });
  };

  renderAwayTeamLineUp = () => {
    return this.state.lineUps.awayTeamLineUp.map((singlePlayer, index) => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#eeeeee",
            justifyContent: "flex-end",
            alignItems: "center",
            borderBottomWidth: 0.5,
            borderColor: "green",
            marginTop: 1,
            padding: 2
          }}
        >
          <View>
            <Text>{singlePlayer.firstName + " " + singlePlayer.lastName}</Text>
          </View>
          <Image
            style={{
              height: 40,
              width: 40,
              borderRadius: 20,
              backgroundColor: "grey",
              borderColor: "white",
              borderWidth: 1,
              marginLeft: 8
            }}
          />
        </View>
      );
    });
  };

  render() {
    const { navigation } = this.props;
    const previousGame = navigation.getParam("previousGame");
    const homeTeamName = previousGame.homeTeam.name;
    const awayTeamName = previousGame.awayTeam.name;

    //----------------
    const { awayTeam, date, homeTeam } = this.state.previousGames;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerLeftButton}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack();
              }}
            >
              <Icon name="chevron-left" color="white" size={48} />
            </TouchableOpacity>
          </View>
          <View
            style={{ flex: 3, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={styles.headerTitle}>
              {homeTeamName + "-" + awayTeamName}
            </Text>
          </View>
          <View style={styles.headerRightButton} />
        </View>
        <View style={styles.content}>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text>{date}</Text>
          </View>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View
              style={{
                flex: 2,
                alignItems: "center",
                //backgroundColor: "yellow",
                margin: 0
              }}
            >
              <View
                style={{
                  flex: 1,
                  //height: 40,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={homeTeam.logo}
                  style={{ width: 60, height: 60, marginVertical: 8 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text>{homeTeam.name}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-around"
                //backgroundColor: "red"
              }}
            >
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{homeTeam.score}</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>-</Text>
              </View>
              <View style={{ flex: 1, alignItems: "center" }}>
                <Text>{awayTeam.score}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 2,
                alignItems: "center",
                //backgroundColor: "green",
                margin: 0
              }}
            >
              <View
                style={{
                  flex: 1,
                  //height: 40,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Image
                  source={awayTeam.logo}
                  style={{ width: 60, height: 60, marginVertical: 8 }}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text>{awayTeam.name}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.lineUp}>
          <View style={styles.homeTeamLineUp}>
            <ScrollView style={styles.scrollView}>
              <View>{this.renderHomeTeamLineUp()}</View>
            </ScrollView>
          </View>
          <View style={styles.awayTeamLineUp}>
            <ScrollView style={styles.scrollView}>
              {this.renderAwayTeamLineUp()}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }
}
export default PreviousPlayedGame;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    flexDirection: "row",
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerLeftButton: {
    //backgroundColor: "yellow",
    flex: 1
  },
  headerTitle: { color: "#fff", fontSize: 18 },
  headerRightButton: { backgroundColor: "yellow", flex: 1 },
  content: {
    //flex: 1,
    height: "16%",
    margin: 8,
    //flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    //paddingVertical: 8,
    //borderWidth: 0.4,
    borderColor: "green",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 8
  },
  lineUp: {
    margin: 8,
    //padding: 4,
    //backgroundColor: "red",
    flexDirection: "row"
  },
  scrollView: { padding: 4 },
  homeTeamLineUp: {
    flex: 1,
    padding: 4,
    marginRight: 2
    //backgroundColor: "blue"
  },
  awayTeamLineUp: {
    flex: 1,
    padding: 4,
    marginLeft: 2
    //backgroundColor: "blue"
  }
});
