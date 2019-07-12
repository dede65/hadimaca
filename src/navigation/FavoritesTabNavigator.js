import React, { Component } from "react";
import { createMaterialTopTabNavigator, createStackNavigator } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import FavoriteTeams from "../screens/tabs/maintabs/FavoriteTeams";
import FavoritePlayers from "../screens/FavoritePlayers";

const FavoritesTabNavigator = createMaterialTopTabNavigator({
  FavoriteTeamsScreen: {
    screen: FavoriteTeams,
    navigationOptions: {
      tabBarLabel: "Takımlar",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="view-list" color={tintColor} size={24} />
      )
    }
  },
  FavoritePlayersScreen: {
    screen: FavoritePlayers,
    navigationOptions: {
      tabBarLabel: "Oyuncular",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="people" color={tintColor} size={24} />
      )
    }
  }
},{
    lazy: false,
    backBehavior: "none",
    tabBarPosition: "top",
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
  });

export default FavoritesTabNavigator;
