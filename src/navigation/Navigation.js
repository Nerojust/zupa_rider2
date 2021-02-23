//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  DeliveryScreen,
  DeliveryDetailScreen,
  DeliveryHistoryScreen,
} from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Tabs from "../navigation/tabs";

const Stack = createStackNavigator();
// create a component
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Welcome"}
      >
        <Stack.Screen name="Welcome" component={Tabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

//make this component available to the app
export default Navigation;
