//import liraries
import React, { Component } from "react";
import { View, Image, Text, StyleSheet, Platform } from "react-native";
import { visibleImage, inVisibleImage } from "../utils/Images";
import { COLOURS } from "../utils/Colours";
import { FONTS } from "../utils/Fonts";
import { SIZES } from "../utils/Fonts";

// create a component
const TogglePassword = ({ securePassword }) => {
  //console.log("Toggle is ", securePassword)
  return (
    <>
      {securePassword ? (
        <Image style={styles.iconImages} source={require('../assets/icons/visible.png')} />
      ) : (
        <Image style={styles.iconImages} source={require('../assets/icons/invisible.png')} />
      )}
    </>
  );
};

// define your styles
const styles = StyleSheet.create({
  iconImages: {
    height: 17,
    width: 17,
    alignSelf: "center",
    justifyContent: "center",
    tintColor: COLOURS.gray,
  },
});

//make this component available to the app
export default TogglePassword;
