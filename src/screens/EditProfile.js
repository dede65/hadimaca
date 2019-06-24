import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  ActivityIndicator
} from "react-native";
import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";
import Loader from "../components/Loader";
import { USER_PROFILE_IMAGE } from "../utils/constants";
class EditProfile extends Component {
  static navigationOptions = ({ navigaiton }) => {
    return {
      headerTitle: "Profil Düzenle",
      headerRight: (
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Kaydet</Text>
        </TouchableOpacity>
      )
    };
  };
  constructor(props) {
    super(props);

    this.state = {
      profileImage: null,
      firstName: "",
      lastName: "",
      phoneNumber: "",
      city: "",
      district: "",
      birthday: "",
      saveUserProfileError: null,
      loading: false
    };
  }

  getUserDetails = async () => {
    console.log("in getUserDetails in EditProfile.js : start");
    this.setState({ loading: true }, async () => {
      try {
        const userId = firebase.auth().currentUser.uid;
        const user = await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .get();

        if (user.data()) {
          console.log("User", user.data());
          const {
            firstName,
            lastName,
            phoneNumber,
            city,
            district,
            birthday,
            userProfileImageURL
          } = user.data();

          this.setState({
            profileImage: userProfileImageURL,
            firstName,
            lastName,
            phoneNumber,
            city,
            district,
            birthday,
            loading: false
          });
        }
        console.log(
          "in getUserDetails in EditProfile.js: no user data available"
        );
      } catch (error) {
        console.log(
          "in getUserDetails in EditProfile.js : error",
          error.message
        );
      }
    });
    console.log("in getUserDetails in EditProfile.js : end");
  };

  saveUserProfile = () => {
    console.log("in saveUserProfile in EditProfile.js : start");
    this.setState({ loading: true }, async () => {
      try {
        this.setState({ modalVisible: true });
        const userId = firebase.auth().currentUser.uid;
        // save user profile image to ifrebase storage
        const uploadTaskSnapshot = await firebase
          .storage()
          .ref(`images/users/${userId}/${USER_PROFILE_IMAGE}`)
          .putFile(this.state.profileImage);
        console.log(
          "In saveUserProfile() uploadTaskSnapshot",
          uploadTaskSnapshot
        );
        // get user profile image download url
        const userProfileImageDownloadURL = uploadTaskSnapshot.downloadURL;
        console.log(
          "In saveUserProfile(): userProfileImageDownloadURL",
          userProfileImageDownloadURL
        );

        //save user details to firebase firestore
        await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .set(
            {
              firstName: this.state.firstName,
              lastName: this.state.lastName,
              phoneNumber: this.state.phoneNumber,
              city: this.state.city,
              district: this.state.district,
              birthday: this.state.birthday,
              userProfileImageURL: userProfileImageDownloadURL
            },
            { merge: true }
          );
        this.setState({ loading: false }, () => {
          this.props.navigation.goBack();
        });
      } catch (error) {
        this.setState({ saveUserProfileError: error.message });
      }
    });
    console.log("in saveUserProfile in EditProfile.js : end");
  };

  selectImage = () => {
    console.log("selectImage function in EditProfile.js: start");
    const options = {};

    ImagePicker.showImagePicker(options, response => {
      console.log("select image response ", response);

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
          profileImage: source.uri
        });
      }
    });
  };

  componentDidMount = () => {
    this.getUserDetails();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil düzenle</Text>
        </View>
        <Loader loading={this.state.loading} />
        <ScrollView style={styles.scrollview}>
          <View style={styles.content}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={this.selectImage}
              >
                <Image
                  style={styles.image}
                  source={{ uri: this.state.profileImage }}
                />
                {this.state.profileImage ? (
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
              <Text style={styles.text}>Telefon numarası</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                keyboardType="numeric"
                placeholder="Telefon"
                onChangeText={phoneNumber => this.setState({ phoneNumber })}
                value={this.state.phoneNumber}
              />
            </View>
            <View>
              <Text style={styles.text}>Doğum tarihi</Text>
              <TextInput
                style={styles.textInput}
                autoCapitalize="none"
                placeholder="Doğum tarihi"
                onChangeText={birthday => this.setState({ birthday })}
                value={this.state.birthday}
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
                onPress={this.saveUserProfile}
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
export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  text: {
    marginLeft: 16,
    fontWeight: "400",
    fontSize: 18
  },
  textInput: {
    borderWidth: 0.5,
    margin: 8,
    paddingHorizontal: 8,
    borderRadius: 16
  },
  header: {
    backgroundColor: "green",
    height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  headerTitle: { color: "#fff", fontSize: 18 },
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
  }
});
