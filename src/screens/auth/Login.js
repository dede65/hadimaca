import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  PixelRatio,
  TextInput
} from "react-native";
import { AccessToken, LoginManager } from "react-native-fbsdk";
import firebase from "react-native-firebase";

import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class UserLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loginError: null
    };
  }
  //handle user login
  handleLogin = async () => {
    console.log("handle login: start");
    if (this.state.email === "") {
      this.setState({ loginError: "Email boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ loginError: null });
      }, 3000);
    } else if (this.state.password === "") {
      this.setState({ loginError: "Şifre boş bırakılamaz" });
      setTimeout(() => {
        this.setState({ loginError: null });
      }, 3000);
    } else {
      await this.login(this.state);
      if (this.state.loginError) {
        console.log("Login error:", this.state.loginError);
      } else {
        this.props.navigation.navigate("AppStack");
        this.setState({
          email: "",
          password: ""
        });
      }
    }
  };

  login = async ({ email, password }) => {
    try {
      const user = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log("in userLoginAction: login success: userCredentials", user);
    } catch (error) {
      console.log("in userLoginAction: login error", error.message);
      this.setState({ loginError: error.message });
    }
  };

  // Calling the following function will open the FB login dialogue
  handleFacebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions([
        "public_profile",
        "email"
      ]);

      if (result.isCancelled) {
        // handle this however suites the flow of your app
        throw new Error("User cancelled facebook login request");
      }

      console.log(
        `Facebook login success with permissions: ${result.grantedPermissions.toString()}`
      );

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
      console.log("Access token data:", data);
      if (!data) {
        // handle this however suites the flow of your app
        throw new Error(
          "Something went wrong obtaining the users facebook access token"
        );
      }

      // create a new firebase credential with the token
      const credentials = firebase.auth.FacebookAuthProvider.credential(
        data.accessToken
      );
      console.log("Credentails retrieved from facebook:", credentials);

      // login with credential
      const firebaseUserCredential = await firebase
        .auth()
        .signInWithCredential(credentials);

      console.log(
        "Firebase user credential:",
        JSON.stringify(firebaseUserCredential.user.toJSON())
      );
      console.log("Firebase user credential:", firebaseUserCredential.user);

      await this.saveUserDetails(firebaseUserCredential.user);
    } catch (error) {
      console.log("Error occured while login to facebook", error);
    }
  };

  saveUserDetails = async user => {
    try {
      const userId = await firebase.auth().currentUser.uid;

      await firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set(
          {
            id: userId,
            firstName: user.displayName.split(" ")[0],
            lastName: user.displayName.split(" ")[1],
            email: user.email,
            phoneNumber: user.phoneNumber,
            userProfileImageURL: user.photoURL
          },
          { merge: true }
        );
    } catch (error) {
      console.log(
        "Erro occured while saving user details in facebook login",
        error
      );
    }
  };

  isUserAuthenticated = () => {
    try {
      firebase.auth().onAuthStateChanged(user => {
        console.log("user", user);
        user ? this.props.navigation.navigate("UserTabNavigator") : null;
      });
    } catch (error) {
      console.log("isUserAuthenticated: Error", error.message);
    }
  };

  componentDidMount = () => {
    this.isUserAuthenticated();
  };

  render() {
    //console.log("Login props", this.props);
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.content}>
            <Image
              style={styles.logo}
              source={require("../../assets/bg-image.jpeg")}
            />
            <Text>Kullanıcı Girişi</Text>
            <Text style={{ color: "red" }}>{this.state.loginError}</Text>
            <TextInput
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Email"
              onChangeText={email => this.setState({ email })}
              value={this.state.email}
            />
            <TextInput
              secureTextEntry
              style={styles.textInput}
              autoCapitalize="none"
              placeholder="Şifre"
              onChangeText={password => this.setState({ password })}
              value={this.state.password}
            />
            <TouchableOpacity
              style={styles.loginButton}
              onPress={this.handleLogin}
            >
              <Text style={{ color: "white", fontSize: 18 }}>Giriş yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.facebookLoginButton}
              onPress={this.handleFacebookLogin}
            >
              <Icon name="facebook" color="#fff" size={28} />
              <Text style={{ color: "white", fontSize: 18, marginLeft: 8 }}>
                Facebook ile giriş yap
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.signupLink}
              onPress={() => this.props.navigation.navigate("UserSignupScreen")}
            >
              <Text style={{ color: "#1B5E20", fontSize: 18 }}>
                Hesabın yok mu? Burdan kaydol
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.forgotPasswordLink}
              onPress={() =>
                this.props.navigation.navigate("ForgotPasswordScreen")
              }
            >
              <Text style={{ color: "#1B5E20", fontSize: 18 }}>
                Şifremi unuttum
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default UserLogin;

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
  logo: {
    borderRadius: 70,
    width: 140,
    height: 140,
    marginBottom: 20,
    borderColor: "#9B9B9B",
    borderWidth: 0.5,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    paddingLeft: 16,
    //height: 40,
    width: "80%",
    borderColor: "green",
    borderWidth: 0.5,
    borderRadius: 24,
    marginTop: 4,
    color: "black"
  },
  loginButton: {
    width: "80%",
    height: 48,
    marginTop: 24,
    backgroundColor: "green",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },

  facebookLoginButton: {
    flexDirection: "row",
    width: "80%",
    height: 48,
    marginTop: 24,
    backgroundColor: "#3b5998",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center"
  },
  signupLink: {
    height: 40,
    marginTop: 8,
    //backgroundColor: "green",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center"
  },
  forgotPasswordLink: {
    height: 40,
    marginTop: 8,
    //backgroundColor: "green",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center"
  }
});
