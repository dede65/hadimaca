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
import SingleComment from "../components/SingleComment";
import { TEAM_DETAILS_SCREEN } from "../utils/constants";

class TeamDetails extends Component {
  constructor(props) {
    super(props);
    console.log("------------TeamDetails.js Constructor------------");
    this.state = {
      teamId: "",
      teamEmail: "",
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
    this.props.navigation.navigate("ChatScreen", {
      previousScreen: TEAM_DETAILS_SCREEN,
      teamId: this.state.teamId,
      teamEmail: this.state.teamEmail
    });
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

  renderComments = () => {
    return this.state.comments.map((comment, index) => {
      return <SingleComment key={index} comment={comment} />;
    });
  };

  componentDidMount = () => {
    const { navigation } = this.props;
    const team = navigation.getParam("teamDetails");
    console.log("Team details:", team);
    const { id, email } = team;
    this.setState({ teamId: id, teamEmail: email });
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
            <Text style={styles.headerTitle}>{nameOfTheTeam}</Text>
          </View>
          <View style={styles.headerRightButton} />
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.teamInfoContainer}>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: teamLogoUri }} />
            </View>
            <View style={styles.teamDetails}>
              <View style={styles.basicDetails}>
                <Text style={{ color: "#212121", fontWeight: "500" }}>
                  Takım Bilgileri
                </Text>
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
          </View>

          <View style={styles.comments}>
            <Text style={{ fontWeight: "500" }}>Yorumlar</Text>
            {this.renderComments()}
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
    //backgroundColor: "blue",
    //padding: 8,
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
  scrollview: {},
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
  teamDetails: {
    flex: 1,
    //backgroundColor: "yellow",
    padding: 2
  },
  basicDetails: {
    backgroundColor: "#EEEEEE",
    alignItems: "center",
    //borderBottomWidth: 1,
    borderColor: "green",
    padding: 4
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
  previousGames: {
    padding: 8,
    margin: 4
    //backgroundColor: "red"
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
  teamLineup: {
    //backgroundColor: "red",
    padding: 4,
    margin: 8
  },
  comments: {
    //backgroundColor: "yellow",
    padding: 8,
    margin: 4
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
