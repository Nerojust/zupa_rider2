//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES, FONTS } from "../utils/theme";

// create a component
const BatchHeaderComponent = ({ number, start }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal:20
      }}
    >
      <Text
        style={{
          fontSize: 17,
          color: COLORS.gray,
          //marginBottom: 50,
          fontFamily:
            Platform.OS == "ios"
              ? FONTS.ROBOTO_MEDIUM_IOS
              : FONTS.ROBOTO_MEDIUM,
        }}
      >
        Batch {number}
      </Text>
      <TouchableOpacity onPress={start}>
        <Text
          style={{
            fontSize: 17,
            color: COLORS.blue,
            fontFamily:
              Platform.OS == "ios"
                ? FONTS.ROBOTO_MEDIUM_IOS
                : FONTS.ROBOTO_MEDIUM,
          }}
        >
          Start
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: Colors.white,
  },
});

//make this component available to the app
export default BatchHeaderComponent;
