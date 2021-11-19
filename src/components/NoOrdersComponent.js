//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet,Image } from "react-native";
import { COLOURS } from "../utils/Colours";
import { FONTS } from "../utils/Fonts";
import { SIZES } from "../utils/Sizes";

// create a component
const NoOrdersComponent = ({ name, message }) => {
  return (
    <View style={styles.parentView}>
      {/* <Text style={styles.nameTextview}>Hello {name}!</Text> */}

      <Image
        source={require("../assets/images/rider.png")}
        resizeMode={"contain"}
        style={styles.image}
      />
      <Text style={styles.noOrderTextview}>{message}</Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  parentView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  noOrderTextview: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    //marginTop:50
  },
  nameTextview: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    flex: 0.5,
  },
  imageStyle: {
    width: 15,
    height: 20,
    opacity: 0.75,
    tintColor: COLOURS.blue,
  },
  image: {
    top: -100,
    width: SIZES.width,
    height: SIZES.width / 3.5,
  },
});

//make this component available to the app
export default NoOrdersComponent;
