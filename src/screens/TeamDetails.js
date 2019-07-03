import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

class TeamDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  sendMessage = () => {
    this.props.navigation.navigate("ChatScreen");
  };

  render() {
    console.log("TeamDetails props", this.props);

    // Grab team details from route params
    const { navigation } = this.props;
    const teamDetails = navigation.getParam("teamDetails");
    console.log("Team Details:", teamDetails);
    const {
      city,
      district,
      nameOfTheTeam,
      numberOfFootballers,
      numberOfSubstitutes,
      teamLogoUri
    } = teamDetails;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{nameOfTheTeam}</Text>
        </View>
        <ScrollView style={styles.scrollview}>
          <View style={styles.content}>
            <View style={styles.contentRow}>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: teamLogoUri }} />
              </View>
            </View>
            <View style={styles.rating}>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                Puan
              </Text>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                10
              </Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Text style={{ fontSize: 18, color: "#212121" }}>
                Takım Kaptanı Uğur DEDE
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Icon name="map-marker" size={18} color="green" />
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{ margin: 2, color: "#212121", fontSize: 16 }}
                >
                  {district} - {city}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                As oyuncu sayısı
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>
                {numberOfFootballers}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                Yedek oyuncu sayısı
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>
                {numberOfSubstitutes}
              </Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                Maç sayısı
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>{12}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                Galibiyet
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>{7}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: "row", marginTop: 20 }}>
            <View style={{ flex: 2 }}>
              <Text
                style={{ fontSize: 18, color: "#212121", marginHorizontal: 8 }}
              >
                Mağlubiyet
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 18, color: "#212121" }}>{5}</Text>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.inviteButton}
          onPress={() => {
            this.props.navigation.navigate("ChatScreen");
          }}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Hadi maça</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default TeamDetails;

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
  scrollview: {
    marginBottom: 64
  },
  inviteButton: {
    position: "absolute",
    right: 8,
    bottom: 8,
    backgroundColor: "green",
    margin: 8,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
    borderRadius: 24
  },
  content: {
    //backgroundColor: "red"
  },
  contentRow: {
    flex: 1,
    flexDirection: "row",
    height: 200
  },
  matchCount: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    width: 170,
    height: 170,
    borderWidth: 0.5,
    borderRadius: 85,
    borderColor: "green"
  },
  rating: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
