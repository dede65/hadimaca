import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import PropTypes from "prop-types";

const SinglePlayer = props => {
  return (
      <TouchableOpacity style={styles.container}>
        <View
          style={{
            flex:1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center"
            }}
          >
            <Image
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                borderWidth: 0.5,
                borderColor: "green",
                margin: 4
              }}
              source={{ uri: props.player.playerProfileImageURL }}
            />
            <View>
              <Text style={{ marginVertical: 2, fontSize: 18 }}>
                {props.player.firstName + " " + props.player.lastName}
              </Text>
              <Text style={{ marginVertical: 2, fontSize: 16 }}>
                {props.player.position}
              </Text>
            </View>
          </View>
          <View>
            <Icon name="chevron-right" color="green" size={32} />
          </View>
        </View>
      </TouchableOpacity>
  );
};

export default SinglePlayer;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal:8,
    marginVertical:4,
    flexDirection: "row",
    borderColor: "green",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation:8
  },
});