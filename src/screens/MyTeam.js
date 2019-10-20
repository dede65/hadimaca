import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";
import SingleTeamPreviousGame from "../components/SingleTeamPreviousGame";
import SingleTeamLineupPlayer from "../components/SingleTeamLineupPlayer";

class MyTeam extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isUserTeamOnline: true,
      previousGames: [
        {
          homeTeam: {
            logo: "",
            name: "Ev sahibi",
            score: 2
          },
          awayTeam: {
            logo: "",
            name: "Deplasman",
            score: 1
          }
        },
        {
          homeTeam: {
            logo: "",
            name: "Ev sahibi",
            score: 2
          },
          awayTeam: {
            logo: "",
            name: "Deplasman",
            score: 1
          }
        },
        {
          homeTeam: {
            logo: "",
            name: "Ev sahibi",
            score: 2
          },
          awayTeam: {
            logo: "",
            name: "Deplasman",
            score: 1
          }
        }
      ],
      teamLineup: [
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: require("../assets/placeholder-person.png"),
          position: "Forvet"
        }
      ]
    };
  }

  //get team status and update db
  setTeamStatus = async isUserTeamOnline => {
    console.log("isUserTeamOnline(): isOnline", isUserTeamOnline);
    this.setState({ isUserTeamOnline: isUserTeamOnline }, async () => {
      try {
        const id = firebase.auth().currentUser.uid;
        await firebase
          .firestore()
          .collection("teams")
          .doc(id)
          .set(
            {
              isUserTeamOnline: isUserTeamOnline
            },
            { merge: true }
          );
      } catch (error) {
        console.log(" is user online: Error", error.message);
      }
    });
  };

  // get team's status and update status
  getTeamStatus = async () => {
    console.log("getTeamStatus():start");
    try {
      const uid = firebase.auth().currentUser.uid;
      const querySnapshot = await firebase
        .firestore()
        .collection("teams")
        .where("id", "==", uid)
        .get();
      console.log(
        "getTeamStatus",
        querySnapshot.docs[0]._data.isUserTeamOnline
      );
      this.setState({
        isUserTeamOnline: querySnapshot.docs[0]._data.isUserTeamOnline
      });
    } catch (error) {}
  };

  renderPreviousGames = () => {
    return this.state.previousGames.map((previousGame, index) => {
      return <SingleTeamPreviousGame key={index} previousGame={previousGame} />;
    });
  };

  renderTeamLineup = () => {
    return this.state.teamLineup.map((player, index) => {
      return <SingleTeamLineupPlayer key={index} player={player} />;
    });
  };

  componentDidMount = () => {
    this.getTeamStatus();
  };

  render() {
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
            <Text style={styles.headerTitle}>Takımım</Text>
          </View>
          <View style={styles.headerRightButton} />
        </View>
        <ScrollView>
          <View style={styles.imgContainer}>
            <View>
              <Image style={styles.image} />
              <View
                style={{
                  position: "absolute",
                  bottom: 9,
                  right: 9,
                  height: 24,
                  width: 24,
                  borderRadius: 20,
                  borderWidth: 2,
                  borderColor: "#fff",
                  backgroundColor: this.state.isUserTeamOnline ? "green" : "red"
                }}
              />
            </View>
            <Text>Takım Adı</Text>
          </View>
          <View style={styles.findMyTeam}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>
                Takımımı bulsunlar
              </Text>
            </View>
            <Switch
              onValueChange={this.setTeamStatus}
              value={this.state.isUserTeamOnline}
            />
          </View>
          <View style={styles.statistics}>
            <Text style={{ fontWeight: "500" }}>İstatistikler</Text>
            <View style={styles.statisticsContainer}>
              <View style={styles.wins}>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>Galibiyet</Text>
                </View>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>7</Text>
                </View>
              </View>
              <View
                style={{
                  borderLeftWidth: 2,
                  borderColor: "green",
                  height: 40,
                  width: 2
                }}
              />
              <View style={styles.draw}>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>Beraberlik</Text>
                </View>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>2</Text>
                </View>
              </View>
              <View
                style={{
                  borderLeftWidth: 2,
                  borderColor: "green",
                  height: 40,
                  width: 2
                }}
              />
              <View style={styles.loss}>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>Mağlubiyet</Text>
                </View>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>3</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.previousGames}>
            <Text style={{ fontWeight: "500" }}>Önceki maçlar</Text>
            {this.renderPreviousGames()}
          </View>
          <View style={styles.teamLineup}>
            <Text style={{ fontWeight: "500" }}>Kadro</Text>
            {this.renderTeamLineup()}
            <View style={styles.addPlayer}>
              <View
                style={{
                  flex: 5,
                  //backgroundColor: "red",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: "500" }}>
                  Oyuncu Ekle
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                }}
              >
                <TouchableOpacity style={{flex:1,alignItems: "center" }}>
                  <Icon name="account-plus" size={36} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default MyTeam;

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
  imgContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 140,
    height: 140,
    borderWidth: 0.5,
    borderRadius: 70,
    borderColor: "green",
    backgroundColor: "grey"
  },
  findMyTeam: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  },
  statistics: {
    //backgroundColor: "grey",
    padding: 4,
    margin: 8
  },
  statisticsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  wins: { alignItems: "center" },
  draw: { alignItems: "center" },
  loss: { alignItems: "center" },
  previousGames: {
    padding: 8,
    margin: 4
    //backgroundColor: "red"
  },
  teamLineup: {
    //backgroundColor: "red",
    padding: 4,
    margin: 8
  },
  addPlayer: {
    flexDirection: "row",
    marginTop: 4
  }
});
