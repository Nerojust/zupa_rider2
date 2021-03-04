//import liraries
import React from "react";
import { Text, TouchableOpacity, Image } from "react-native";

import { COLORS, SIZES } from "../utils/theme";

// create a component
const ButtonComponent = ({ text, onPress, color, left, image,tintColor }) => {
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        height: 50,
        width: SIZES.width - 70,
        backgroundColor: color,
        // justifyContent: "flex-end",
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
          fontSize: 18,
          fontWeight: "bold",
          flex: 1.5,
          alignSelf: "center",
          justifyContent: "center",left:left
        }}
      >
        {text}
      </Text>
      <Image
        source={image}
        resizeMode={"contain"}
        style={{ width: 20, height: 20, marginRight: 15, flex: 0.3 , tintColor:tintColor}}
      />
    </TouchableOpacity>
  );
};

export default ButtonComponent;
