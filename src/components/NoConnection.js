//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Colors } from "../utils/Color";
import { SvgComponent } from "./SvgComponent";
import NoNetworkSvg from "./svgs/NoNetworkSvg";

// create a component
const NoConnection = (props) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 17,
          color: Colors.appGreen,
          marginBottom: 50,
          fontFamily: "roboto_light",
        }}
      >
        No network detected
      </Text>
      <TouchableOpacity onPress={props.onPressAction}>
        <Text
          style={{
            fontSize: 17,
            color: Colors.appGreen,
            fontFamily: "roboto_light",
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
    //backgroundColor: Colors.white,
  },
});

//make this component available to the app
export default NoConnection;
