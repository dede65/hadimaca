import React, { Component } from "react";
import { View, Text, StyleSheet,TouchableOpacity } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any"
          }
        }
      ]
    });
  }

  render() {
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
            <Text style={styles.headerTitle}>Mesajlar</Text>
          </View>
          <View style={styles.headerRightButton} />
        </View>
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
            }}
          />
        </View>
      </View>
    );
  }
}
export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1
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
});
