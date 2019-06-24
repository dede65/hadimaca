import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  Picker
} from "react-native";
import firebase from "react-native-firebase";
import DateTimePicker from "react-native-modal-datetime-picker";
import validate from "validator";
import ImagePicker from "react-native-image-picker";
import Loader from "../../components/Loader";
import { cityAndDistricts } from "../../utils/cityAndDistricts";

class UserSignup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      birthday: "",
      city: "",
      cityIndex: 0,
      district: "",
      loading: false,
      profileImage: null,
      signupError: null
    };
  }

  handleSignUp = () => {
    if (validate.isEmpty(this.state.email)) {
      this.setState({ signupError: "Email boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ signupError: null });
      }, 5000);
    } else if (validate.isEmpty(this.state.password)) {
      this.setState({ signupError: "Şifre boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ signupError: null });
      }, 5000);
    } else if (validate.isEmpty(this.state.firstName)) {
      this.setState({ signupError: "Ad boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ signupError: null });
      }, 5000);
    } else if (validate.isEmpty(this.state.lastName)) {
      this.setState({ signupError: "Soyad boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ signupError: null });
      }, 5000);
    } else if (validate.isEmpty(this.state.phoneNumber)) {
      this.setState({ signupError: "Telefon boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ signupError: null });
      }, 5000);
    } else if (validate.isEmpty(this.state.birthday)) {
      this.setState({ signupError: "Doğum tarihi boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ signupError: null });
      }, 5000);
    } else if (validate.isEmpty(this.state.profileImage)) {
      this.setState({ signupError: "Lütfen profil resmi seçiniz" });
    } else if (validate.isEmpty(this.state.city)) {
      this.setState({ signupError: "Lütfen şehir seçiniz" });
    } else if (validate.isEmpty(this.state.district)) {
      this.setState({ signupError: "Lütfen ilçe seçiniz" });
    } else {
      this.setState({ loading: true }, async () => {
        try {
          await this.signup(this.state);
          if (this.state.signupError) {
            console.log("Signup Error:", this.state.signupError);
          } else {
            this.setState({ loading: false }, () => {
              this.props.navigation.navigate("UserTabNavigator");
              this.setState({
                email: "",
                password: "",
                firstName: "",
                lastName: "",
                phoneNumber: "",
                birthday: "",
                city: "",
                cityIndex: 0,
                district: "",
                profileImage: null,
                signupError: null,
                loading: false
              });
            });
          }
        } catch (error) {
          console.log("in handleSignup in Signup.js: Error", error.message);
        }
      });
    }
  };

  signup = async ({
    firstName,
    lastName,
    email,
    password,
    birthday,
    phoneNumber,
    profileImage,
    city,
    district
  }) => {
    try {
      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      console.log("User created successfully", user);
      const userId = user._user.uid;
      //set user profiel image
      const uploadTaskSnapshot = await firebase
        .storage()
        .ref(`images/users/${userId}/user-profile-image`)
        .putFile(profileImage);
      console.log("in Signup.js: in signup(): profile image: success");
      //get user profile image download URL
      const userProfileImageURL = uploadTaskSnapshot.downloadURL;
      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          {
            id: user._user.uid,
            firstName,
            lastName,
            birthday,
            email,
            phoneNumber,
            city,
            district,
            userProfileImageURL
          },
          { merge: true }
        );
      console.log("in Signup.js: in signup(): signup success");
    } catch (error) {
      this.setState({ signupError: error.message });
    }
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    console.log("A date has been picked: ", date);
    this.setState({ birthday: date.toLocaleDateString() });
    this.setState({ isDateTimePickerVisible: false });
    //this.hideDateTimePicker()
  };

  selectImage = () => {
    console.log("selectImage function in Signup.js: start");
    const options = {};

    ImagePicker.showImagePicker(options, response => {
      console.log("select image response", response);
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
        console.log("in Signup.js: in selectImage(): image source", source);
        this.setState({
          profileImage: source.uri
        });
      }
    });
  };
  onModalClose = () => {
    this.setState({ loading: false });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Loader loading={this.state.loading} onClose={this.onModalClose} />
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
            <Text>Kullanıcı kaydı oluştur</Text>
            <Text style={{ color: "red" }}>{this.state.signupError}</Text>
            <TextInput
              placeholder="Email"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              placeholder="Şifre"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TextInput
              placeholder="Adın"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={firstName => this.setState({ firstName })}
              value={this.state.firstName}
            />
            <TextInput
              placeholder="Soyadın"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={lastName => this.setState({ lastName })}
              value={this.state.lastName}
            />
            <TextInput
              placeholder="Telefon"
              autoCapitalize="none"
              style={styles.textInput}
              onChangeText={phoneNumber => this.setState({ phoneNumber })}
              value={this.state.phoneNumber}
            />
            <View style={styles.pickDate}>
              <TouchableOpacity onPress={this.showDateTimePicker}>
                <Text>
                  {this.state.birthday ? this.state.birthday : "Doğum tarihi"}{" "}
                </Text>
              </TouchableOpacity>
            </View>
            <DateTimePicker
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
            <View style={styles.selectCity}>
              <Picker
                selectedValue={this.state.city}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) =>
                  this.setState({ city: itemValue, cityIndex: itemIndex })
                }
              >
                {cityAndDistricts.map(({ il, plaka }) => {
                  return <Picker.Item label={il} value={il} key={plaka} />;
                })}
              </Picker>
            </View>
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
            <TouchableOpacity
              style={styles.signupButton}
              onPress={this.handleSignUp}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Kaydol</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.loginLink}
              onPress={() => this.props.navigation.navigate("UserLoginScreen")}
            >
              <Text style={{ color: "#1B5E20", fontSize: 18 }}>
                Zaten bir hesabın var mı? Burdan giriş yap
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default UserSignup;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24
  },
  textInput: {
    paddingLeft: 16,
    width: "90%",
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 24,
    marginTop: 4,
    color: "black"
  },
  pickDate: {
    paddingLeft: 16,
    height: 52,
    width: "90%",
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 24,
    marginTop: 4,
    justifyContent: "center"
  },
  selectCity: {
    paddingLeft: 8,
    height: 52,
    width: "90%",
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 24,
    marginTop: 4,
    justifyContent: "center"
  },
  selectDistrict: {
    paddingLeft: 8,
    height: 52,
    width: "90%",
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 24,
    marginTop: 4,
    justifyContent: "center"
  },
  picker: {
    width: "100%"
  },
  signupButton: {
    width: "75%",
    height: 48,
    marginTop: 24,
    backgroundColor: "green",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  loginLink: {
    height: 40,
    marginTop: 16,
    //backgroundColor: "green",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    backgroundColor: "#bdbdbd",
    borderRadius: 70,
    width: 140,
    height: 140,
    borderColor: "#9B9B9B",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10
  }
});
