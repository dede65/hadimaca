import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions
} from "react-native";
import Carousel from "react-native-snap-carousel";
import MapView, { Marker } from "react-native-maps";
import Icon from "react-native-vector-icons/FontAwesome5";
import { API_KEY_MAP_QUEST } from "../apikey";

const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
const ASPECT_RATIO = WIDTH / HEIGHT;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class AstropitchDetails extends Component {
  static navigationOptions = props => {
    return {
      title: "Details",
      header: (
        <View>
          <Text>Hello</Text>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      coordinates: {
        latitude: 41.035869,
        longitude: 28.973122,
        //latitudeDelta: 0.0065,
        //longitudeDelta: 0.0062,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      activeSlideIndex: 1,
      entries: [
        {
          title: "Earlier this morning, NYC",
          subtitle: "Lorem ipsum dolor sit amet",
          image: require("../assets/halisaha2.jpeg")
        },
        {
          title: "The lone tree, majestic landscape of New Zealand",
          subtitle: "Lorem ipsum dolor sit amet",
          image: require("../assets/bg-image.jpeg")
        },
        {
          title: "White Pocket Sunset",
          subtitle: "Lorem ipsum dolor sit amet et nuncat ",
          image: require("../assets/halisaha3.jpg")
        },
        {
          title: "Acrocorinth, Greece",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          image: require("..//assets/halisaha4.jpg")
        }
      ]
    };
  }

  _renderItem({ item, index }) {
    return (
      <View style={styles.slide}>
        <Image
          style={{ resizeMode: "stretch", width: WIDTH * 0.8, height: 220 }}
          source={item.image}
        />
      </View>
    );
  }

  convertAddressToCoords = async () => {
    const { navigation } = this.props;
    const { address } = navigation.getParam("astropitch");
    //let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`; // Google geocoding url
    let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${API_KEY_MAP_QUEST}&location=${address}`; // MapQuest geocoding key

    const response = await fetch(url);
    const result = await response.json();
    console.log("result:", result);
    this.setState({
      coordinates: {
        latitude: result.results[0].locations[0].latLng.lat,
        longitude: result.results[0].locations[0].latLng.lng,
        latitudeDelta: 0.0065,
        longitudeDelta: 0.0062
      }
    });
  };

  componentDidMount = () => {
    this.convertAddressToCoords();
  };

  render() {
    const { navigation } = this.props;
    const astropitch = navigation.getParam("astropitch");
    const { owner, address, phoneNumber, district, name } = astropitch;
    const {
      hasHotWater,
      hasParkingLot,
      hasShuttle,
      hasCanteen,
      hasFood,
      hasMaleToilet,
      hasFemaleToilet,
      isRecordingGame,
      acceptCreditCard
    } = astropitch.facilities;
    console.log("astropitch:", astropitch);
    return (
      <View style={styles.container}>
        {/*<View style={styles.header}>
          <Text style={styles.headerTitle}>Ana Sayfa</Text>
        </View>*/}
        <ScrollView>
          <View style={styles.carouselview}>
            <Carousel
              //autoplay={true}
              //autoplayDelay={2000}
              firstItem={1}
              ref={c => {
                this._carousel = c;
              }}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={WIDTH}
              itemWidth={WIDTH * 0.8}
            />
          </View>
          <View style={styles.astropitcInfo}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: "600",
                color: "#000",
                margin: 4,
                marginLeft: 8
              }}
            >
              {name}
            </Text>
            <Text
              style={{ fontSize: 16, color: "#000", margin: 4, marginLeft: 8 }}
            >
              {owner.firstName + " " + owner.lastName}
            </Text>
            <Text
              style={{ fontSize: 16, color: "#000", margin: 4, marginLeft: 8 }}
            >
              {owner.phoneNumber
                ? owner.phoneNumber + " - " + phoneNumber
                : phoneNumber}
            </Text>
          </View>
          <View style={styles.facilityRow}>
            <View style={styles.facility}>
              <Icon
                name={hasHotWater ? "check" : "times"}
                size={24}
                color={hasHotWater ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Duş</Text>
            </View>
            <View style={styles.facility}>
              <Icon
                name={hasParkingLot ? "check" : "times"}
                size={24}
                color={hasParkingLot ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Otopark</Text>
            </View>
            <View style={styles.facility}>
              <Icon
                name={hasShuttle ? "check" : "times"}
                size={24}
                color={hasShuttle ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Servis</Text>
            </View>
          </View>
          {/*second*/}
          <View style={styles.facilityRow}>
            <View style={styles.facility}>
              <Icon
                name={hasCanteen ? "check" : "times"}
                size={24}
                color={hasCanteen ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Kafe</Text>
            </View>
            <View style={styles.facility}>
              <Icon
                name={hasFood ? "check" : "times"}
                size={24}
                color={hasFood ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Yemek</Text>
            </View>
            <View style={styles.facility}>
              <Icon
                name={isRecordingGame ? "check" : "times"}
                size={24}
                color={isRecordingGame ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Kamera</Text>
            </View>
          </View>
          {/**3rd row */}
          <View style={styles.facilityRow}>
            <View style={styles.facility}>
              <Icon
                name={hasMaleToilet ? "check" : "times"}
                size={24}
                color={hasMaleToilet ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Erkek tuvaleti</Text>
            </View>
            <View style={styles.facility}>
              <Icon
                name={hasFemaleToilet ? "check" : "times"}
                size={24}
                color={hasFemaleToilet ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Kadın Tuvaleti</Text>
            </View>
            <View style={styles.facility}>
              <Icon
                name={acceptCreditCard ? "check" : "times"}
                size={24}
                color={acceptCreditCard ? "green" : "red"}
              />
              <Text style={styles.facilityTitle}>Kredi Kartı</Text>
            </View>
          </View>
          <Text
            style={{
              fontSize: 16,
              color: "#000",
              margin: 4,
              marginLeft: 8,
              marginTop: 16
            }}
          >
            {address} / {district}
          </Text>
          <View style={styles.mapContainer}>
            <MapView style={styles.mapview} region={this.state.coordinates}>
              <Marker coordinate={this.state.coordinates} />
            </MapView>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default AstropitchDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 64,
    backgroundColor: "#1b5e20",
    justifyContent: "center"
  },
  headerTitle: {
    fontSize: 24,
    color: "white",
    textAlign: "center"
  },
  carouselview: {
    height: 240,
    alignItems: "center"
    //marginTop: 4
  },
  slide: {},
  facility: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    margin: 8
  },
  facilityTitle: {
    marginLeft: 8,
    fontSize: 14
  },
  facilityRow: {
    marginTop: 8,
    padding: 4,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  mapContainer: {
    padding: 8,
    elevation: 12
  },
  mapview: {
    width: "100%",
    height: 240
  }
});
