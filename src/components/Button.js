//import liraries
import React from "react";
import { Text, TouchableOpacity, Platform, Image } from "react-native";

import { COLORS, SIZES, FONTS } from "../utils/theme";

// create a component
const ButtonComponent = ({ text, onPress, color }) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: SIZES.width - 70,
        backgroundColor: color,
        justifyContent: "center",
        alignItems: "center",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: COLORS.white,
          fontSize: 16,
          //fontWeight: "bold",
          fontFamily:
            Platform.OS == "ios"
              ? FONTS.ROBOTO_MEDIUM_IOS
              : FONTS.ROBOTO_MEDIUM,
        }}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
