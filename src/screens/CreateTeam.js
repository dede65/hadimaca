import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";
import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";

import Loader from "../components/Loader";

import { TEAM_LOGO } from "../utils/constants";

class CreateTeam extends Component {
  static navigationOptions = ({ navigaiton }) => {
    console.log("inside static method");
    return {
      headerTitle: "Takım oluştur"
    };
  };

  constructor(props) {
    super(props);
    console.log("inside constructor");
    this.state = {
      teamLogoUri: null,
      nameOfTheTeam: "",
      numberOfFootballers: null,
      numberOfSubstitutes: null,
      city: "",
      district: "",
      saveTeamDetailsError: null,
      getTeamDetailsError: null,
      loading: false
    };
  }

  getTeamDetails = async () => {
    console.log("in getTeamDetails in CreateTeam.js : start");
    this.setState({ loading: true }, async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const doc = await firebase
          .firestore()
          .collection("teams")
          .doc(userId)
          .get();
        console.log("docuemnt is", doc.data());
        if (doc.data()) {
          console.log("Team document", doc.data());
          const {
            teamLogoUri,
            city,
            district,
            nameOfTheTeam,
            numberOfFootballers,
            numberOfSubstitutes
          } = doc.data();

          this.setState({
            teamLogoUri,
            city,
            district,
            nameOfTheTeam,
            numberOfFootballers,
            numberOfSubstitutes,
            loading: false
          });
        }
        this.setState({ loading: false });
      } catch (error) {
        this.setState({ getTeamDetailsError: error.message }, () => {
          console.log(
            "in getTeamDetails in CreateTeam.js : Error",
            error.message
          );
        });
      }
    });

    console.log("in getTeamDetails in CreateTeam.js : start");
  };

  saveTeamDetails = async () => {
    console.log("in saveTeamDetails in CreateTeam.js : start");
    this.setState({ loading: true }, async () => {
      try {
        const teamId = firebase.auth().currentUser.uid; //user id as team id

        const {
          teamLogoUri,
          nameOfTheTeam,
          numberOfFootballers,
          numberOfSubstitutes,
          city,
          district
        } = this.state;

        const uploadTaskSnapshot = await firebase
          .storage()
          .ref(`images/teams/${teamId}/${TEAM_LOGO}`)
          .putFile(teamLogoUri);

        console.log(
          "In saveTeamDetails() in CreateTeam.js: uploadTaskSnapshot ",
          uploadTaskSnapshot
        );

        // get team's logo download url
        const teamLogoDownloadURL = uploadTaskSnapshot.downloadURL;

        await firebase
          .firestore()
          .collection("teams")
          .doc(teamId)
          .set(
            {
              id:teamId,
              teamLogoUri: teamLogoDownloadURL,
              nameOfTheTeam,
              numberOfFootballers,
              numberOfSubstitutes,
              city,
              district
            },
            { merge: true }
          );
        this.setState({ loading: false }, () => {
          this.props.navigation.goBack();
        });
      } catch (error) {
        this.setState(
          { saveTeamDetailsError: error.message, loading: false },
          () => {
            console.log(
              "in saveTeamDetails in CreateTeam.js : Error",
              error.message
            );
          }
        );
      }
    });
  };

  selectImage = () => {
    console.log("selectImage function in EditProfile.js: start");
    const options = {};

    ImagePicker.showImagePicker(options, response => {
      console.log("Response ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        const source = { uri: response.uri, path: response.path };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          teamLogoUri: source.uri
        });
      }
    });
  };

  onModalClose = () => {
    this.setState({ loading: false });
    //this.props.navigation.goBack();
  };

  componentDidMount = () => {
    this.getTeamDetails();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "400" }}>
            Takımını oluştur
          </Text>
        </View>
        <Loader loading={this.state.loading} onClose={this.modalOnClose}/>
        <ScrollView>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={this.selectImage}
              >
                <Image
                  style={styles.image}
                  source={{ uri: this.state.teamLogoUri }}
                />
                {this.state.teamLogoUri ? (
                  <Text />
                ) : (
                  <Text style={{ position: "absolute" }}>Resim seç</Text>
                )}
              </TouchableOpacity>
            </View>
            <Text>{this.state.saveTeamDetailsError}</Text>
            <View>
              <Text style={styles.text}>Takım adı</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Takım adı"
                onChangeText={nameOfTheTeam => this.setState({ nameOfTheTeam })}
                value={this.state.nameOfTheTeam}
              />
            </View>
            <View>
              <Text style={styles.text}>As oyuncu sayısı</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="As futbolcu sayısı"
                onChangeText={numberOfFootballers =>
                  this.setState({ numberOfFootballers })
                }
                value={this.state.numberOfFootballers}
              />
            </View>
            <View>
              <Text style={styles.text}>Yedek oyuncu sayısı</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="Yedek futbolcu sayısı"
                onChangeText={numberOfSubstitutes =>
                  this.setState({ numberOfSubstitutes })
                }
                value={this.state.numberOfSubstitutes}
              />
            </View>
            <View>
              <Text style={styles.text}>Şehir</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Şehir"
                onChangeText={city => this.setState({ city })}
                value={this.state.city}
              />
            </View>
            <View>
              <Text style={styles.text}>İlçe</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="İlçe"
                onChangeText={district => this.setState({ district })}
                value={this.state.district}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={this.saveTeamDetails}
              >
                <Text style={{ color: "#fff", fontSize: 16 }}>Kaydet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default CreateTeam;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    backgroundColor: "green",
    height: 64,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    flex: 1,
    justifyContent: "center"
  },
  imageContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    backgroundColor: "#bdbdbd",
    width: 140,
    height: 140,
    borderWidth: 0.5,
    borderRadius: 70,
    borderColor: "black"
  },
  text: { marginLeft: 16, fontWeight: "400", fontSize: 18 },
  textInput: {
    borderWidth: 0.5,
    margin: 8,
    paddingHorizontal: 8,
    borderRadius: 16
  },
  saveButton: {
    width: "75%",
    height: 48,
    marginTop: 24,
    marginBottom: 20,
    backgroundColor: "green",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  }
});
