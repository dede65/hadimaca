import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView
} from "react-native";
import SinglePlayerPreviouslyPlayedTeam from "../components/player/SinglePlayerPreviouslyPlayedTeam";

class PlayerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerPreviouslyPlayedTeams: [
        { name: "Galatasaray", logo: "" },
        { name: "Beşiktaş", logo: "" },
        { name: "Vanspor", logo: "" },
        { name: "Barcelona", logo: "" }
      ]
    };
  }

  sendMessage = () => {
    this.props.navigation.navigate("ChatScreen");
  };

  renderPreviouslyPlayedTeams = () => {
    return this.state.playerPreviouslyPlayedTeams.map(
      (previouslyPlayedTeam, index) => {
        return (
          <SinglePlayerPreviouslyPlayedTeam
            key={index}
            previouslyPlayedTeam={previouslyPlayedTeam}
          />
        );
      }
    );
  };

  render() {
    const { navigation } = this.props;
    const player = navigation.getParam("player");
    console.log("Player details:", player);
    const {
      firstName,
      lastName,
      age,
      foot,
      height,
      position,
      weight,
      birthday,
      playerProfileImageURL
    } = player;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{firstName + " " + lastName}</Text>
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.playerInfoContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: playerProfileImageURL }}
              />
            </View>
            <View style={styles.details}>
              <View style={styles.playerTeam}>
                <Image style={styles.playerTeamLogo} />
                <Text>Takımı</Text>
              </View>
              <View />
              <View style={styles.info}>
                <View style={{ flex: 1 }}>
                  <Text>Ad</Text>
                  <Text>Soyad</Text>
                  <Text>Yaş</Text>
                  <Text>Doğum tarihi</Text>
                  <Text>Mevki</Text>
                  <Text>Boy</Text>
                  <Text>Kilo</Text>
                  <Text>Ayak</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text>{firstName}</Text>
                  <Text>{lastName}</Text>
                  <Text>{age}</Text>
                  <Text>{birthday}</Text>
                  <Text>{position}</Text>
                  <Text>{height}</Text>
                  <Text>{weight}</Text>
                  <Text>{foot}</Text>
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

          <View style={styles.statistics}>
            <Text style={{ fontWeight: "500" }}>İstatistikler</Text>
            <View style={styles.statisticsContainer}>
              <View style={styles.numberOfGames}>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>Maç Sayısı</Text>
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
              <View style={styles.numberOfScores}>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>Gol Sayısı</Text>
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
              <View style={styles.numberOfAssists}>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>Assist Sayısı</Text>
                </View>
                <View>
                  <Text style={{ margin: 2, fontSize: 18 }}>3</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.previousTeams}>
            <Text>Önceki oynadığı takımlar</Text>
            {this.renderPreviouslyPlayedTeams()}
          </View>

          <View style={styles.comments}>
            <Text>Yorumlar</Text>
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
          </View>
        </ScrollView>
        <View style={styles.comment}>
          <TextInput placeholder="Yorum yap" style={styles.commentTextInput} />
          <TouchableOpacity style={styles.sendButton}>
            <Text>Gönder</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
export default PlayerDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  playerInfoContainer: {
    flexDirection: "row",
    height: 200,
    backgroundColor: "blue",
    padding: 4,
    margin: 8
  },
  header: {
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: { color: "#fff", fontSize: 18 },
  scrollview: { marginBottom: 60 },
  imageContainer: {
    backgroundColor: "red",
    padding: 2
  },
  image: {
    flex: 1,
    //height: 200,
    width: 120,
    backgroundColor: "yellow"
  },
  details: {
    flex: 1,
    backgroundColor: "yellow",
    padding: 2
  },
  playerTeam: {
    backgroundColor: "grey",
    flexDirection: "row",
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
  previousTeams: {
    padding: 8,
    margin: 8,
    backgroundColor: "red"
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
  numberOfGames: { alignItems: "center" },
  numberOfScores: { alignItems: "center" },
  numberOfAssists: { alignItems: "center" },
  comments: {
    backgroundColor: "yellow",
    padding: 8,
    margin: 8
  },
  comment: {
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    padding: 4,
    margin: 8,
    backgroundColor: "#f5f5f5"
  },
  commentTextInput: {
    borderColor: "green",
    borderWidth: 1,
    width: "75%",
    borderRadius: 24,
    margin: 2
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
