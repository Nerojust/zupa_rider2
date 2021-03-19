//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import { SIZES, COLORS, FONTS } from "../utils/theme";

// create a component
const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/splash_big.jpg")}
        style={styles.image}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: SIZES.width, height: SIZES.height },
});

//make this component available to the app
export default SplashScreen;
