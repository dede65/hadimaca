import React, { Component } from "react";
import Profile from "../screens/tabs/maintabs/Profile";
import { createMaterialTopTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import FavoritesTabNavigator from "../navigation/FavoritesTabNavigator";
import Teams from "../screens/tabs/maintabs/Teams";
import Players from "../screens/tabs/maintabs/Players";
import Messages from "../screens/tabs/maintabs/Messages";

const AppBottomTabNavigator = createMaterialTopTabNavigator(
  {
    HomeScreen: {
      screen: Teams,
      //screen: HomeTabNavigator,
      navigationOptions: {
        tabBarLabel: "Ana Sayfa",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor} size={24} />
        )
      }
    },
    PlayersScreen: {
      screen: Players,
      navigationOptions: {
        tabBarLabel: "Geçmiş rezervasyonlar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="group" color={tintColor} size={24} />
        )
      }
    },
    MessagesScreen: {
      screen: Messages,
      navigationOptions: {
        tabBarLabel: "Mesajlar",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="email" color={tintColor} size={24} />
        )
      }
    },
    FavoritesScreen: {
      //screen:Favorites,
      screen: FavoritesTabNavigator,
      navigationOptions: {
        tabBarLabel: "Favoriler",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="favorite" color={tintColor} size={24} />
        )
      }
    },
    ProfileScreen: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: "Profilim",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="person" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    lazy: false,
    backBehavior: "none",
    tabBarPosition: "bottom",
    tabBarOptions: {
      tabStyle: {
        height: 64,
        backgroundColor: "green"
      },
      labelStyle: {
        fontSize: 10
      },
      activeTintColor: "white",
      inactiveTintColor: "white",
      style: {
        backgroundColor: "green"
      },
      indicatorStyle: {
        height: 0
      },
      showIcon: true,
      showLabel: false
    }
  }
);

export default AppBottomTabNavigator;
