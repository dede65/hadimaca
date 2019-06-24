import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "react-native-firebase";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userProfileImageURL: null,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      findMe: false,
      findMyTeam: false
    };
  }

  getUserDetails = async () => {
    try {
      const id = firebase.auth().currentUser.uid;
      await firebase
        .firestore()
        .collection("users")
        .doc(id)
        .onSnapshot(doc => {
          console.log("In getUserDetails(): in Profile.js: doc", doc);
          const {
            firstName,
            lastName,
            phoneNumber,
            email,
            userProfileImageURL
          } = doc.data();
          this.setState({
            firstName,
            lastName,
            phoneNumber,
            email,
            userProfileImageURL
          });
        });
    } catch (error) {
      console.log("in getUserDetails in Profile.js: Error", error.message);
    }
  };

  logout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("In logout: Logout success");
      this.props.navigation.navigate("UserLoginScreen");
    } catch (error) {
      console.log("Logout Error", error.message);
    }
  };

  componentDidMount = () => {
    this.getUserDetails();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profilim</Text>
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.imgContainer}>
            <Image
              style={styles.image}
              source={{ uri: this.state.userProfileImageURL }}
            />
            <Text>{this.state.firstName + " " + this.state.lastName}</Text>
            <Text>{this.state.email}</Text>
            <Text>{this.state.phoneNumber}</Text>
          </View>
          <View style={styles.findMeAsPlayer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>
                Beni oyuncu olarak bulsunlar
              </Text>
            </View>
            <Switch
              onValueChange={findMe => {
                this.setState({ findMe });
              }}
              value={this.state.findMe}
            />
          </View>
          <View style={styles.findMyTeam}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>
                Takımımı bulsunlar
              </Text>
            </View>
            <Switch
              onValueChange={findMyTeam => {
                this.setState({ findMyTeam });
              }}
              value={this.state.findMyTeam}
            />
          </View>
          <TouchableOpacity
            style={styles.previousGames}
            onPress={() => {
              this.props.navigation.navigate("PreviousGamesScreen");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="soccer" color="green" size={26} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>
                Önceki Maçlarım
              </Text>
            </View>
            <Icon name="chevron-right" color="green" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              this.props.navigation.navigate("SettingsScreen");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="settings" color="green" size={26} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>Ayarlar</Text>
            </View>
            <Icon name="chevron-right" color="green" size={26} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={this.logout}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="power" color="red" size={26} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>Çıkış yap</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: { color: "#fff", fontSize: 18 },
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
    borderColor: "green"
  },
  previousGames: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  },
  findMeAsPlayer: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
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
  settingsButton: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  },
  logoutButton: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  }
});
