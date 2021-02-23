//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  OrdersScreen,
  OrderDetailScreen,
  OrderHistoryScreen,
} from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const Home = createStackNavigator();
const HomeStack = () => (
  <Home.Navigator
    screenOptions={{
      headerShown: false,
    }}
    initialRouteName={"Dashboard"}
    name="Home"
  >
    <Home.Screen name="Dashboard" component={DashboardScreen} />
    <Home.Screen name="Orders" component={OrdersScreen} />
    <Home.Screen name="OrderDetails" component={OrderDetailScreen} />
    <Home.Screen name="OrderHistory" component={OrderHistoryScreen} />
  </Home.Navigator>
);
// create a component
const HomeNavigation = () => {
  return <HomeStack />;
};

//make this component available to the app
export default HomeNavigation;
