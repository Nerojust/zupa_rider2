import React from "react";
import { Text, StyleSheet } from "react-native";
import { fp } from "../../utils/responsive-screen";

const MontserratMedium = ({ style, ...props }) => {
  return (
    <Text style={[styles.defaultStyles, style]} {...props} selectable>
      {props.children}
    </Text>
  );
};
export default MontserratMedium;

const styles = StyleSheet.create({
  defaultStyles: {
    fontFamily: "Montserrat-Medium",
    //color: COLOURS.white,
    fontSize: fp(14)
  }
});
