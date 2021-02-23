//import liraries
import React, { Component } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Colors } from "../utils/Color";

// create a component
const TogglePassword = ({ image }) => {
  return <Image style={styles.iconImages} source={image} />;
};

// define your styles
const styles = StyleSheet.create({
  iconImages: {
    height: 17,
    width: 17,
    marginLeft: 2,
    tintColor: Colors.appGreen,
  },
});

//make this component available to the app
export default TogglePassword;
