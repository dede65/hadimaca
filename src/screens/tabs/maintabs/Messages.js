import React, { Component } from "react";
import { View, Text, StyleSheet,FlatList, ScrollView } from "react-native";
import SingleMessage from "../../../components/SingleMessage";

class Messages extends Component {
  constructor(props) {
    super(props);
    this.dateObject = new Date();
    this.month = this.dateObject.getMonth() + 1;
    this.day = this.dateObject.getDate();
    this.year = this.dateObject.getFullYear();
    this.date = this.day + "/" + this.month + "/" + this.year;
    this.state = {
      messages: [
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        },
        {
          messageSender: "Uğur Dede",
          messageSenderPhoto: "http://placeimg.com/140/140/people",
          messageText: "Yeni mesaj",
          messageSentDate: this.date
        }
      ]
    };
  }

  renderMessages = () => {
    if (this.state.messages.length === 0) {
      return <Text>Yeni mesaj yok</Text>;
    }
    return this.state.messages.map((message, index) => {
      return <SingleMessage key={index} message={message} />;
    });
  };

  renderItem = ({ item }) => {
    return <SingleMessage message={item} />;
  };

  render() {
    if (this.state.messages.length === 0) return <Text>Yeni mesaj yok.</Text>;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Mesajlar</Text>
        </View>
        <View style={styles.content}>
          {/*<ScrollView>{this.renderMessages()}</ScrollView>*/}
          <FlatList
            data={this.state.messages}
            renderItem={this.renderItem}
            //numColumns={2}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    );
  }
}
export default Messages;

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
  content: {
    flex: 1,
    //backgroundColor: "#eeeeee",
    paddingHorizontal: 4
  }
});
