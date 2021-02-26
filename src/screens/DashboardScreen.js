//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import Header from "../components/Header";

// create a component
const DashboardScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <View style={styles.parentView}>
        <Text style={styles.nameTextview}>Hello Lawrence!</Text>

        <Image
          source={require("../assets/images/rider.png")}
          resizeMode={"contain"}
          style={styles.image}
        />
        <Text style={styles.noOrderTextview}>
          You have no orders assigned for today
        </Text>
      </View>
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
  parentView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  image: {
    top: -100,
    width: SIZES.width,
    height: SIZES.width / 2.5,
  },
  noOrderTextview: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    //marginTop:50
  },
  nameTextview: {
    fontSize: 23,
    fontWeight: "500",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    flex: 0.5,
  },
});

//make this component available to the app
export default DashboardScreen;
