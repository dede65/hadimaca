import React, { Component } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";

class SinglePreviousGameItem extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log("previous game", this.props.previousGame);
    const { awayTeam, date, homeTeam } = this.props.previousGame;
    return (
      <TouchableOpacity style={styles.container}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text>{date}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              //backgroundColor: "yellow",
              margin: 0
            }}
          >
            <View
              style={{
                flex: 1,
                //height: 40,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={homeTeam.logo}
                style={{ width: 60, height: 60, marginVertical: 8 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text>{homeTeam.name}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around"
              //backgroundColor: "red"
            }}
          >
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{homeTeam.score}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>-</Text>
            </View>
            <View style={{ flex: 1, alignItems: "center" }}>
              <Text>{awayTeam.score}</Text>
            </View>
          </View>
          <View
            style={{
              flex: 2,
              alignItems: "center",
              //backgroundColor: "green",
              margin: 0
            }}
          >
            <View
              style={{
                flex: 1,
                //height: 40,
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Image
                source={awayTeam.logo}
                style={{ width: 60, height: 60, marginVertical: 8 }}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Text>{awayTeam.name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
export default SinglePreviousGameItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
    //flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 4,
    paddingVertical: 8,
    //borderWidth: 0.4,
    borderColor: "green",
    borderRadius: 8,
    backgroundColor: "#fff",
    elevation: 8
  }
});
