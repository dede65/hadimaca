import React, { Component } from "react";
import {
  createMaterialTopTabNavigator,
  createStackNavigator
} from "react-navigation";
import Icon from "react-native-vector-icons/MaterialIcons";
import PlayersChats from "../screens/chats/PlayersChats";
import TeamsChats from "../screens/chats/TeamsChats";

const FavoritesTabNavigator = createMaterialTopTabNavigator(
  {
    FavoriteTeamsScreen: {
      screen: PlayersChats,
      navigationOptions: {
        tabBarLabel: "Oyuncu Mesajları",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="message" color={tintColor} size={24} />
        )
      }
    },
    FavoritePlayersScreen: {
      screen: TeamsChats,
      navigationOptions: {
        tabBarLabel: "Takım Mesajları",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="comment" color={tintColor} size={24} />
        )
      }
    }
  },
  {
    lazy: false,
    backBehavior: "none",
    tabBarPosition: "top",
    tabBarOptions: {
      upperCaseLabel: false,
      tabStyle: {
        height: 64
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
      showLabel: true
    }
  }
);

export default FavoritesTabNavigator;
