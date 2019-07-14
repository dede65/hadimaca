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
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SinglePlayerPreviouslyPlayedTeam from "../components/player/SinglePlayerPreviouslyPlayedTeam";
import SingleComment from "../components/SingleComment";

class PlayerDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerPreviouslyPlayedTeams: [
        {
          name: "Galatasaray",
          logo: require("../assets/team-logos/galatasaray.png")
        },
        {
          name: "Beşiktaş",
          logo: require("../assets/team-logos/kasimpasa.png")
        },
        {
          name: "Ankaragücü",
          logo: require("../assets/team-logos/ankaragucu.png")
        }
      ],
      comments: [
        {
          commentOwner: "Uğur DEDE",
          commentOwnerPhoto: require("../assets/placeholder-person.png"),
          commentText: "Yeni yorum",
          commentDate: "",
          commentLikes: 14,
          commentDislikes: 3
        },
        {
          commentOwner: "Uğur DEDE",
          commentOwnerPhoto: require("../assets/placeholder-person.png"),
          commentText: "Yeni yorum",
          commentDate: "",
          commentLikes: 14,
          commentDislikes: 3
        },
        {
          commentOwner: "Uğur DEDE",
          commentOwnerPhoto: require("../assets/placeholder-person.png"),
          commentText: "Yeni yorum",
          commentDate: "",
          commentLikes: 14,
          commentDislikes: 3
        },
        {
          commentOwner: "Uğur DEDE",
          commentOwnerPhoto: require("../assets/placeholder-person.png"),
          commentText: "Yeni yorum",
          commentDate: "",
          commentLikes: 14,
          commentDislikes: 3
        },
        {
          commentOwner: "Uğur DEDE",
          commentOwnerPhoto: require("../assets/placeholder-person.png"),
          commentText: "Yeni yorum",
          commentDate: "",
          commentLikes: 14,
          commentDislikes: 3
        },
        {
          commentOwner: "Uğur DEDE",
          commentOwnerPhoto: require("../assets/placeholder-person.png"),
          commentText: "Yeni yorum",
          commentDate: "",
          commentLikes: 14,
          commentDislikes: 3
        }
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

  renderComments = () => {
    return this.state.comments.map((comment, index) => {
      return <SingleComment key={index} comment={comment} />;
    });
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
            <Text style={styles.headerTitle}>{firstName + " " + lastName}</Text>
          </View>
          <View style={styles.headerRightButton} />
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
              {/*<View style={styles.playerTeam}>
                <Image style={styles.playerTeamLogo} />
                <Text>Takım Adı</Text>
              </View>*/}
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
                  <Text>Oynadığı Takım</Text>
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
                  <Text>Juventus</Text>
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
                <Text style={{ fontSize: 18, color: "#fff" }}>
                  Favorilere ekle
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.sendMessage}>
              <TouchableOpacity
                style={styles.sendMessageButton}
                onPress={this.sendMessage}
              >
                <Text style={{ fontSize: 18, color: "#fff" }}>
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
            {this.renderComments()}
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
    //backgroundColor: "blue",
    //padding: 4,
    margin: 8
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
  scrollview: { marginBottom: 60 },
  imageContainer: {
    //backgroundColor: "red",
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
    //backgroundColor: "yellow",
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
    margin: 4
    //backgroundColor: "red"
  },
  addToFavAndSendMessage: {
    flexDirection: "row",
    padding: 8
  },
  addToFavorites: {
    flex: 1,
    //padding: 2,
    marginRight: 4,
    borderWidth: 1,
    borderColor: "green",
    justifyContent: "center",
    backgroundColor: "green"
  },
  addToFavoritesButton: {
    flex: 1,
    alignItems: "center",
    padding: 8,
    justifyContent: "center"
  },
  sendMessage: {
    flex: 1,
    //padding: 2,
    marginLeft: 4,
    borderWidth: 1,
    borderColor: "green",
    //alignItems: "center",
    justifyContent: "center",
    backgroundColor: "green"
  },
  sendMessageButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  numberOfGames: { alignItems: "center" },
  numberOfScores: { alignItems: "center" },
  numberOfAssists: { alignItems: "center" },
  comments: {
    //backgroundColor: "yellow",
    padding: 8,
    margin: 4
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
