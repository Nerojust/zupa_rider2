import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";

import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  DeliveryScreen,
  DeliveryDetailScreen,
  DeliveryHistoryScreen,
} from "../screens";
import { COLORS, FONTS } from "./../utils/theme";

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Dashboard" component={WelcomeScreen} />
      <Tab.Screen name="Orders" component={DeliveryScreen} />
      <Tab.Screen name="History" component={DeliveryHistoryScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: COLORS.primary,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Tabs;
