//import liraries
import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import { COLORS, SIZES } from "../utils/theme";

// create a component
const ButtonComponent = ({ text, onPress, color }) => {
  return (
    <TouchableOpacity
      style={{
        height: 50,
        width: SIZES.width-70,
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
      <Text style={{ color: COLORS.white, fontSize: 18, fontWeight: "bold" }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonComponent;
