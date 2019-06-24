/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

import { createStackNavigator, createAppContainer } from "react-navigation";
import Login from "./src/screens/auth/Login";
import Signup from "./src/screens/auth/Signup";
import AppBottomTabNavigator from "./src/navigation/AppBottomTabNavigator";

import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { Provider as PaperProvider } from "react-native-paper";
import ForgotPassword from "./src/screens/auth/ForgotPassword";
import EditProfile from "./src/screens/EditProfile";
import CreatePlayerProfile from "./src/screens/CreatePlayerProfile";
import CreateTeam from "./src/screens/CreateTeam";
import Settings from "./src/screens/Settings";
import TeamDetails from "./src/screens/TeamDetails";
import PreviousGames from "./src/screens/PreviousGames";
import PlayerDetails from "./src/screens/PlayerDetails";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <AppContainer />
        </PaperProvider>
      </Provider>
    );
  }
}

const RootNavigator = createStackNavigator(
  {
    UserLoginScreen: Login,
    UserSignupScreen: Signup,
    UserTabNavigator: AppBottomTabNavigator,
    TeamDetailsScreen: TeamDetails,
    ForgotPasswordScreen: ForgotPassword,
    EditProfileScreen: EditProfile,
    CreatePlayerProfileScreen: CreatePlayerProfile,
    CreateTeamScreen: CreateTeam,
    PreviousGamesScreen: PreviousGames,
    SettingsScreen: Settings,
    PlayerDetailsScreen:PlayerDetails
  },
  {
    initialRouteName: "UserLoginScreen",
    //initialRouteName: "UserSignupScreen",
    headerMode: "none"
  }
);

const AppContainer = createAppContainer(RootNavigator);
