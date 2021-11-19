//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLOURS } from "../utils/Colours";
import { FONTS } from "../utils/Fonts";
import { SIZES } from "../utils/Fonts";

// create a component
const NoConnection = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 17,
          color: COLOURS.gray,
          marginBottom: 50,
          fontFamily:
            Platform.OS == "ios"
              ? FONTS.ROBOTO_MEDIUM_IOS
              : FONTS.ROBOTO_MEDIUM,
        }}
      >
        No network detected
      </Text>
      <TouchableOpacity onPress={props.onPressAction}>
        <Text
          style={{
            fontSize: 17,
            color: COLOURS.blue,
            fontFamily:
            Platform.OS == "ios"
              ? FONTS.ROBOTO_MEDIUM_IOS
              : FONTS.ROBOTO_MEDIUM,
          }}
        >
          Click to Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: COLOURS.white,
  },
});

//make this component available to the app
export default NoConnection;
