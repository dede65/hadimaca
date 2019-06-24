import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { resetPassword } from "../../redux/actions/userAuthActions";
class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };
  }

  resetPassword = () => {
    this.props.resetPassword(this.state.email)
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Email Adresi</Text>
        <TextInput
          style={styles.textinput}
          value={this.state.email}
          placeholder="Email giriniz"
          onChangeText={email => this.setState({ email })}
        />
        <TouchableOpacity
          style={styles.sendbutton}
          onPress={this.resetPassword}
        >
          <Text style={styles.title}>Gönder</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
    resetPassword: state.userAuth.resetPassword
  };
};

const mapDispatchToProps = dispatch => {
  return {
    resetPassword: emailAddress => dispatch(resetPassword(emailAddress))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  textinput: {
    borderWidth: 1,
    borderColor: "green",
    borderRadius: 24,
    width: "90%",
    margin: 24,
    paddingHorizontal: 16
  },
  sendbutton: {
    backgroundColor: "green",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24
  },
  title: {
    color: "#fff",
    fontSize: 18
  }
});
