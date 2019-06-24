import React, { Component } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SinglePreviousGameItem from "../components/SinglePreviousGameItem";
class PreviousBookings extends Component {
  constructor(props) {
    super(props);
    this.date = new Date();

    this.state = {
      previousGames: [
        {
          homeTeam: {
            name: "Galatasaray",
            score: 2,
            logo: require('../assets/team-logos/galatasaray.png')
          },
          awayTeam: {
            name: "Başakşehir",
            score: 1,
            logo: require('../assets/team-logos/basaksehir.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "ankaragücü",
            score: 3,
            logo: require('../assets/team-logos/ankaragucu.png')
          },
          awayTeam: {
            name: "Sivasspor",
            score: 1,
            logo: require('../assets/team-logos/sivasspor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "Antalyaspor",
            score: 3,
            logo: require('../assets/team-logos/antalyaspor.png')
          },
          awayTeam: {
            name: "Malatyaspor",
            score: 0,
            logo: require('../assets/team-logos/malatyaspor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "Kasımpaşa",
            score: 1,
            logo: require('../assets/team-logos/kasimpasa.png')
          },
          awayTeam: {
            name: "Konyaspor",
            score: 1,
            logo: require('../assets/team-logos/konyaspor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "Alanyaspor",
            score: 1,
            logo: require('../assets/team-logos/alanyaspor.png')
          },
          awayTeam: {
            name: "Rizespor",
            score: 1,
            logo: require('../assets/team-logos/rizespor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "Alanyaspor",
            score: 1,
            logo: require('../assets/team-logos/alanyaspor.png')
          },
          awayTeam: {
            name: "Rizespor",
            score: 1,
            logo: require('../assets/team-logos/rizespor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "Alanyaspor",
            score: 1,
            logo: require('../assets/team-logos/alanyaspor.png')
          },
          awayTeam: {
            name: "Rizespor",
            score: 1,
            logo: require('../assets/team-logos/rizespor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        },
        {
          homeTeam: {
            name: "Alanyaspor",
            score: 1,
            logo: require('../assets/team-logos/alanyaspor.png')
          },
          awayTeam: {
            name: "Rizespor",
            score: 1,
            logo: require('../assets/team-logos/rizespor.png')
          },
          date: this.date.getDay()+"/"+this.date.getMonth()+"/"+this.date.getFullYear()
        }
      ],
      loading: false
    };
  }

  renderItem = ({item}) => {
    //console.log("single previous game", item);
    return (
      <SinglePreviousGameItem
        navigation={this.props.navigation}
        previousGame={item}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Önceki Maçlarım</Text>
        </View>
        {/*<Loader loading={this.state.loading} onClose={this.onModalClose} />*/}
        <FlatList
          data={this.state.previousGames}
          renderItem={this.renderItem}
          //numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}
export default PreviousBookings;

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
  headerTitle: { color: "#fff", fontSize: 18 }
});
