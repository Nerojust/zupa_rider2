//import liraries
import React from "react";
import {
  Dimensions,
  StyleSheet,
} from "react-native";

import { Button } from "react-native-paper";

// create a component
const ButtonComponent = ({ text, onPress, color, mode }) => {
  return (
    <Button
      //icon="door"
      mode={mode}
      onPress={onPress}
      color={color}
      style={{
        height: 45,
        justifyContent: "center",
        marginHorizontal: 20,
        marginTop: 15,
        borderRadius: 10,
        fontSize: 10,
      }}
    >
      {text}
    </Button>
  );
};

// define your styles

//make this component available to the app
export default ButtonComponent;
