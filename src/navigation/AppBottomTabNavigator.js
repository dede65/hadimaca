import React, { Component } from "react";
import Profile from "../screens/tabs/maintabs/Profile";
import { createMaterialTopTabNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import FavoriteTeams from "../screens/tabs/maintabs/FavoriteTeams";
import Teams from "../screens/tabs/maintabs/Teams";
import Players from "../screens/tabs/maintabs/Players";

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
    },FavoritesScreen: {
      screen: FavoriteTeams,
      //screen: FavoritesTabNavigator,
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
    lazy: true,
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
