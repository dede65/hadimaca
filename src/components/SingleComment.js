import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class SingleComment extends Component {
  render() {
    const {
      commentOwner,
      commentOwnerPhoto,
      commentText,
      commentDate,
      commentLikes,
      commentDislikes
    } = this.props.comment;
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} />
          </View>
          <View style={styles.comment}>
            <View style={styles.commentDetails}>
              <View style={styles.commentOwner}>
                <Text>{commentOwner}</Text>
              </View>
              <View style={styles.commentText}>
                <Text>{commentText}</Text>
              </View>
            </View>
            <View style={styles.commentLikesAndDislikes}>
              <View style={styles.commentLikes}>
                <TouchableOpacity>
                  <Icon name="thumb-up-outline" color="green" size={24} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 8 }}>{commentLikes}</Text>
              </View>
              <View style={styles.commentDislikes}>
                <TouchableOpacity>
                  <Icon name="thumb-down-outline" color="red" size={24} />
                </TouchableOpacity>
                <Text style={{ marginLeft: 8 }}>{commentDislikes}</Text>
              </View>
            </View>
          </View>
          <View style={styles.commentDate}>
            <Text>{commentDate}</Text>
          </View>
        </View>
      </View>
    );
  }
}
export default SingleComment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 2,
    backgroundColor: "#eeeeee"
  },
  content: {
    flex: 1,
    flexDirection: "row"
  },
  imageContainer: {},
  image: {
    backgroundColor: "grey",
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: "white",
    borderWidth: 2
  },
  comment: {
    flex: 1
  },
  commentDetails: {},
  commentOwner: {},
  commentText: {},
  commentLikesAndDislikes: {
    flex: 1,
    flexDirection: "row",
    //backgroundColor: "yellow",
    padding: 2,
    marginTop: 8
  },
  commentLikes: {
    //flex: 1,
    flexDirection: "row",
    margin: 2,
    marginRight: 16,
    alignItems: "center"
    //backgroundColor: "red"
  },
  commentDislikes: {
    //flex: 1,
    flexDirection: "row",
    margin: 2,
    marginLeft: 16,
    alignItems: "center"
    //backgroundColor: "red"
  },
  commentDate: {}
});
