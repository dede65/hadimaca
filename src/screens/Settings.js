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
import firebase from "react-native-firebase";
class Settings extends Component {
  static navigationOptions = ({ navigaiton }) => {
    return {
      headerTitle: "Ayarlar"
    };
  };

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
            <Text style={styles.headerTitle}>Ayarlar</Text>
          </View>
          <View style={styles.headerRightButton} />
        </View>
        <ScrollView style={styles.scrollview}>
          <TouchableOpacity
            style={styles.editProfileButton}
            onPress={() => {
              this.props.navigation.navigate("EditProfileScreen");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="account" color="green" size={26} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>
                Profil düzenle
              </Text>
            </View>
            <Icon name="chevron-right" color="green" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createPlayerProfileButton}
            onPress={() => {
              this.props.navigation.navigate("CreatePlayerProfileScreen");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="account-edit" color="green" size={26} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>
                Oyuncu profilini oluştur
              </Text>
            </View>
            <Icon name="chevron-right" color="green" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.createTeamButton}
            onPress={() => {
              this.props.navigation.navigate("CreateTeamScreen");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon name="account-group" color="green" size={26} />
              <Text style={{ fontSize: 16, marginLeft: 4 }}>
                Takımını oluştur
              </Text>
            </View>
            <Icon name="chevron-right" color="green" size={26} />
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
export default Settings;

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
  editProfileButton: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  },
  createPlayerProfileButton: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  },
  createTeamButton: {
    alignItems: "center",
    //backgroundColor: "yellow",
    flexDirection: "row",
    justifyContent: "space-between",
    height: 48,
    borderBottomWidth: 0.5,
    borderColor: "green",
    paddingHorizontal: 12
  }
});
