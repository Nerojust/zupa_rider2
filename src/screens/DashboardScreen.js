//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { COLORS } from "../utils/theme";
import Header from "../components/Header";

// create a component
const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />

      <Text>DashboardScreen</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});

//make this component available to the app
export default DashboardScreen;
