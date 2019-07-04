import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TextInput
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SingleTeamLineupPlayer from "../components/SingleTeamLineupPlayer";
import SingleTeamPreviousGame from "../components/SingleTeamPreviousGame";

class TeamDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      teamLineup: [
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        },
        {
          firstName: "Uğur",
          lastName: "DEDE",
          photoUrl: "",
          position: "Forvet"
        }
      ],
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
      ]
    };
  }

  sendMessage = () => {
    this.props.navigation.navigate("ChatScreen");
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

  render() {
    console.log("TeamDetails props", this.props);

    // Grab team details from route params
    const { navigation } = this.props;
    const teamDetails = navigation.getParam("teamDetails");
    console.log("Team Details:", teamDetails);
    const {
      city,
      district,
      nameOfTheTeam,
      numberOfFootballers,
      numberOfSubstitutes,
      teamLogoUri
    } = teamDetails;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{nameOfTheTeam}</Text>
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.teamInfoContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: teamLogoUri }} />
            </View>
            <View style={styles.teamDetails}>
              <View style={styles.basicDetails}>
                <Text>Takım Bilgileri</Text>
              </View>
              <View />
              <View style={styles.info}>
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>Takım Adı</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>{nameOfTheTeam}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>Şehir</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>{city}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>İlçe</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>{district}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>As oyuncu sayısı</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>{numberOfFootballers}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>Yedek oyuncu sayısı</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>{numberOfSubstitutes}</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                      <Text>Puan</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text>9.4</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.addToFavAndSendMessage}>
            <View style={styles.addToFavorites}>
              <TouchableOpacity
                style={styles.addToFavoritesButton}
                onPress={this.addToFavorites}
              >
                <Text style={{ fontSize: 18, color: "#212121" }}>
                  Favorilere ekle
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sendMessage}>
              <TouchableOpacity
                style={styles.sendMessageButton}
                onPress={this.sendMessage}
              >
                <Text style={{ fontSize: 18, color: "#212121" }}>
                  Mesaj gönder
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.previousGames}>
            <Text style={{ fontWeight: "500" }}>Önceki maçlar</Text>
            {this.renderPreviousGames()}
          </View>

          <View style={styles.statistics}>
            <Text style={{ fontWeight: "500" }}>İstatistikler</Text>
            <Text>Maç sayısı</Text>
            <Text>Galibiyet</Text>
            <Text>Beraberlik</Text>
            <Text>Mağlubiyet</Text>
          </View>
          <View style={styles.footballers}>
            <Text style={{ fontWeight: "500" }}>Kadro</Text>
            {this.renderTeamLineup()}
          </View>

          <View style={styles.comments}>
            <Text style={{ fontWeight: "500" }}>Yorumlar</Text>
            <View>
              <Text>yorum 1</Text>
            </View>
            <View>
              <Text>yorum 2</Text>
            </View>
            <View>
              <Text>yorum 3</Text>
            </View>
            <View>
              <Text>yorum 4</Text>
            </View>
            <View>
              <Text>yorum 4</Text>
            </View>
            <View style={styles.comment}>
              <TextInput
                placeholder="Yorum yap"
                style={styles.commentTextInput}
              />
              <TouchableOpacity style={styles.sendButton}>
                <Text>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default TeamDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  teamInfoContainer: {
    flexDirection: "row",
    height: 200,
    backgroundColor: "blue",
    //padding: 8,
    margin: 8
  },
  header: {
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: { color: "#fff", fontSize: 18 },
  scrollview: {},
  imageContainer: {
    backgroundColor: "red",
    padding: 2
  },
  image: {
    flex: 1,
    //height: 200,
    width: 100,
    backgroundColor: "yellow"
  },
  teamDetails: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 2
  },
  basicDetails: {
    backgroundColor: "grey",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "green"
  },
  playerTeamLogo: {
    backgroundColor: "blue",
    height: 30,
    width: 30,
    marginRight: 8
  },
  info: {
    flexDirection: "row"
  },
  addToFavAndSendMessage: {
    flexDirection: "row",
    padding: 8
  },
  addToFavorites: {
    flex: 1,
    padding: 8,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center"
    //backgroundColor: "blue"
  },
  addToFavoritesButton: {
    alignItems: "center"
  },
  sendMessage: {
    flex: 1,
    padding: 8,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center"
  },
  sendMessageButton: { alignItems: "center" },
  previousGames: {
    padding: 8,
    margin: 8,
    backgroundColor: "red"
  },
  statistics: {
    backgroundColor: "grey",
    padding: 4,
    margin: 8
  },
  footballers: {
    backgroundColor: "red",
    padding: 4,
    margin: 8
  },
  comments: {
    backgroundColor: "yellow",
    padding: 8,
    margin: 8
  },
  comment: {
    flexDirection: "row",
    marginVertical: 4
    //backgroundColor: "#f5f5f5"
  },
  commentTextInput: {
    borderColor: "green",
    borderWidth: 1,
    width: "75%",
    borderRadius: 24,
    margin: 2,
    backgroundColor: "#f5f5f5"
  },
  sendButton: {
    flex: 1,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    margin: 2
  }
});
