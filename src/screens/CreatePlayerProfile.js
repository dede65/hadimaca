import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Picker
} from "react-native";
import Loader from "../components/Loader";
import firebase from "react-native-firebase";
import ImagePicker from "react-native-image-picker";
import { cityAndDistricts } from "../utils/cityAndDistricts";
import { PLAYER_PROFILE_IMAGE } from "../utils/constants";

class CreatePlayerProfile extends Component {
  static navigationOptions = ({ navigaiton }) => {
    return {
      headerTitle: "Oyuncu profili oluştur"
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      playerProfileImageUri: null,
      firstName: "",
      lastName: "",
      city: "",
      cityIndex: 0,
      district: "",
      height: null,
      weight: null,
      age: null,
      position: "",
      foot: "",
      loading: false,
      savePlayerDetailsError: null,
      getPlayerDetailsError: null
    };
  }

  getPlayerDetails = () => {
    console.log("in getPlayerDetails in CreatePlayerProfile.js : start");
    this.setState({ loading: true }, async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const player = await firebase
          .firestore()
          .collection("players")
          .doc(userId)
          .get();

        if (player.data()) {
          console.log("Player", player.data());
          const {
            firstName,
            lastName,
            city,
            district,
            height,
            weight,
            age,
            position,
            foot,
            playerProfileImageURL
          } = player.data();

          this.setState({
            firstName,
            lastName,
            city,
            district,
            height,
            weight,
            age,
            position,
            foot,
            playerProfileImageUri: playerProfileImageURL,
            loading: false
          });
        } else {
          this.setState({ loading: false });
        }
      } catch (error) {
        this.setState({ getPlayerDetailsError: error.message });
        console.log("getPlayerDetailsError", error.message);
      }
    });

    console.log("in getPlayerDetails in CreatePlayerProfile.js : start");
  };

  savePlayerDetails = () => {
    console.log("in savePlayerDetails in CreatePlayerProfile.js : start");
    this.setState({ loading: true }, async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const {
          firstName,
          lastName,
          city,
          district,
          height,
          weight,
          age,
          position,
          foot,
          playerProfileImageUri
        } = this.state;

        //await this.savePlayerProfileImage(this.state.playerProfileImageUri,userId);
        const uploadTaskSnapshot = await firebase
          .storage()
          .ref(`images/players/${userId}/${PLAYER_PROFILE_IMAGE}`)
          .putFile(playerProfileImageUri);
        console.log(
          "In saveUserProfile() uploadTaskSnapshot",
          uploadTaskSnapshot
        );
        // get player profile image download url
        const playerProfileImageDownloadURL = uploadTaskSnapshot.downloadURL;

        await firebase
          .firestore()
          .collection("players")
          .doc(userId)
          .set(
            {
              id: userId,
              firstName,
              lastName,
              city,
              district,
              height,
              weight,
              age,
              position,
              foot,
              playerProfileImageURL: playerProfileImageDownloadURL
            },
            { merge: true }
          );

        this.setState({ loading: false }, () => {
          this.props.navigation.goBack();
        });
      } catch (error) {
        this.setState({ savePlayerDetailsError: error.message });
        console.log("savePlayerDetailsError", error.message);
      }
    });
    console.log("in savePlayerDetails in CreatePlayerProfile.js : end");
  };

  onModalClose = () => {
    this.setState({ loading: false });
    this.props.navigation.goBack();
  };

  selectImage = () => {
    console.log("selectImage function in CreatePlayerProfile.js: start");
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
          playerProfileImageUri: source.uri
        });
      }
    });
  };

  componentDidMount = () => {
    this.getPlayerDetails();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Oyuncu profili oluştur</Text>
        </View>
        <Loader loading={this.state.loading} onClose={this.onModalClose} />
        <ScrollView style={styles.scrollview}>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={this.selectImage}
              >
                <Image
                  style={styles.image}
                  source={{ uri: this.state.playerProfileImageUri }}
                />
                {this.state.playerProfileImageUri ? (
                  <Text />
                ) : (
                  <Text style={{ position: "absolute" }}>Resim seç</Text>
                )}
              </TouchableOpacity>
            </View>
            <View>
              <Text style={styles.text}>Adınız</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Adınız"
                onChangeText={firstName => this.setState({ firstName })}
                value={this.state.firstName}
              />
            </View>
            <View>
              <Text style={styles.text}>Soyadınız</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Soyadınız"
                onChangeText={lastName => this.setState({ lastName })}
                value={this.state.lastName}
              />
            </View>
            <View>
              <Text style={styles.text}>Şehir</Text>
              <View style={styles.selectPosition}>
                <Picker
                  selectedValue={this.state.city}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ city: itemValue, cityIndex: itemIndex })
                  }
                >
                  {cityAndDistricts.map(({ il }, index) => {
                    return <Picker.Item label={il} value={il} key={index} />;
                  })}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.text}>İlçe</Text>
              <View style={styles.selectDistrict}>
                <Picker
                  selectedValue={this.state.district}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ district: itemValue })
                  }
                >
                  {cityAndDistricts[this.state.cityIndex]["ilceleri"].map(
                    (district, index) => {
                      return (
                        <Picker.Item
                          label={district}
                          value={district}
                          key={index}
                        />
                      );
                    }
                  )}
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Yaş</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Yaş"
                keyboardType="numeric"
                onChangeText={age => this.setState({ age })}
                value={this.state.age}
              />
            </View>
            <View>
              <Text style={styles.text}>Boy</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Boy"
                keyboardType="numeric"
                onChangeText={height => this.setState({ height })}
                value={this.state.height}
              />
            </View>
            <View>
              <Text style={styles.text}>Kilo</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Kilo"
                keyboardType="numeric"
                onChangeText={weight => this.setState({ weight })}
                value={this.state.weight}
              />
            </View>
            <View>
              <Text style={styles.text}>Mevki</Text>
              <View style={styles.selectPosition}>
                <Picker
                  selectedValue={this.state.position}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ position: itemValue })
                  }
                >
                  <Picker.Item label="Kaleci" value="kaleci" />
                  <Picker.Item label="Defans" value="defans" />
                  <Picker.Item label="Orta saha" value="orta saha" />
                  <Picker.Item label="Forvet" value="forvet" />
                </Picker>
              </View>
            </View>
            <View>
              <Text style={styles.text}>Ayak</Text>
              <View style={styles.selectFoot}>
                <Picker
                  selectedValue={this.state.foot}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    this.setState({ foot: itemValue })
                  }
                >
                  <Picker.Item label="Sağ" value="sağ" />
                  <Picker.Item label="Sol" value="sol" />
                </Picker>
              </View>
            </View>

            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.saveButton}
                onPress={this.savePlayerDetails}
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
export default CreatePlayerProfile;

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
  text: {
    marginLeft: 16,
    fontWeight: "400",
    fontSize: 18
  },
  textInput: {
    borderWidth: 0.5,
    margin: 8,
    paddingHorizontal: 8,
    borderRadius: 16,
    borderColor: "green"
  },
  content: {
    flex: 1,
    justifyContent: "center"
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
  },
  selectFoot: {
    margin: 8,
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 16,
    marginTop: 4,
    justifyContent: "center"
  },
  selectPosition: {
    margin: 8,
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 16,
    marginTop: 4,
    justifyContent: "center"
  },
  selectCity: {
    margin: 8,
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 16,
    marginTop: 4,
    justifyContent: "center"
  },
  selectDistrict: {
    margin: 8,
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 16,
    marginTop: 4,
    justifyContent: "center"
  },
  picker: {
    width: "100%"
  }
});
