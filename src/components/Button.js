//import liraries
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

import { Button } from "react-native-paper";
import { SIZES } from "../utils/theme";

// create a component
const ButtonComponent = ({ text, onPress, color, mode }) => {
  return (
    <Button
      //icon="door"
      mode={mode}
      onPress={onPress}
      color={color}
      uppercase={false}
      style={{
        height: 50,
        width: SIZES.width - 65,
        justifyContent: "center",
        //marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 8,
      }}
    >
      {text}
    </Button>
  );
};

// define your styles

//make this component available to the app
export default ButtonComponent;
