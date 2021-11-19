import React from "react";
import { Text, StyleSheet } from "react-native";
import { fp } from "../../utils/responsive-screen";

const MontserratBold = ({ style, ...props }) => {
  return (
    <Text style={[styles.defaultStyles, style]} {...props} selectable>
      {props.children}
    </Text>
  );
};
export default MontserratBold;

const styles = StyleSheet.create({
  defaultStyles: {
    fontFamily: "Montserrat-Bold",
    //color: COLOURS.white,
    fontSize: fp(14)
  }
});
