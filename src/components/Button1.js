//import liraries
import React from "react";
import { Text, TouchableOpacity, Image, Platform } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

import { COLORS, SIZES, FONTS } from "../utils/theme";

// create a component
const ButtonComponent = ({ text, onPress, color, width }) => {
  return (
    <TouchableWithoutFeedback
      style={{
        // flexDirection: "row",
        height: 50,
        width: width,
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
          fontSize: 17,
          fontWeight: "bold",
          alignSelf: "center",
          justifyContent: "center",
          fontFamily:
            Platform.OS == "ios" ? FONTS.ROBOTO_THIN_IOS : FONTS.ROBOTO_THIN,
        }}
      >
        {text}
      </Text>
      {/* <Image
        source={image}
        resizeMode={"contain"}
        style={{
          width: 20,
          height: 20,
          //marginRight: 15,
          flex: 0.5,
          tintColor: tintColor,
        }}
      /> */}
    </TouchableWithoutFeedback>
  );
};

export default ButtonComponent;
