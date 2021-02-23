//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WelcomeScreen, LoginScreen, ForgotPasswordScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "./tabs";

const Auth = createStackNavigator();
const AuthStack = () => (
  <Auth.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={"Welcome"}
    name="Auth"
  >
    <Auth.Screen name="Welcome" component={WelcomeScreen} />
    <Auth.Screen name="Login" component={LoginScreen} />
    <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </Auth.Navigator>
);
// create a component
const AuthScreen = () => {
  return <AuthStack />;
};

//make this component available to the app
export default AuthScreen;
