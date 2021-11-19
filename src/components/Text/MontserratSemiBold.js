import React from "react";
import { Text, StyleSheet } from "react-native";
import { fp } from "../../utils/responsive-screen";

const MontserratSemiBold = ({ style, ...props }) => {
  return (
    <Text style={[styles.defaultStyles, style]} {...props} selectable>
      {props.children}
    </Text>
  );
};
export default MontserratSemiBold;

const styles = StyleSheet.create({
  defaultStyles: {
    fontFamily: "Montserrat-SemiBold",
    //color: COLOURS.white,
    fontSize: fp(14)
  }
});
