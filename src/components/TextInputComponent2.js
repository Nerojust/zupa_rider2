//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput,Platform } from "react-native";
import { COLOURS } from "../utils/Colours";
import { FONTS } from "../utils/Fonts";
import { SIZES } from "../utils/Fonts";

// create a component
const TextInputComponent = ({
  placeholder,
  handleTextChange,
  defaultValue,
  refInput,
  onSubmitEditing,
  keyboardType,
  secureTextEntry,
  returnKeyType,
}) => {
  return (
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor={COLOURS.gray}
      onChangeText={(text) => handleTextChange(text)}
      underlineColor={COLOURS.white}
      defaultValue={defaultValue}
      ref={refInput}
      onSubmitEditing={onSubmitEditing}
      returnKeyLabel={"Next"}
      returnKeyType={returnKeyType}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      autoCapitalize="none"
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  textInput: {
    height: 50,
    marginTop: 20,
    backgroundColor: COLOURS.lightGray5,
    paddingLeft: 16,
    color: COLOURS.black,
    borderTopLeftRadius: 10,
    fontFamily:
    Platform.OS == "ios" ? FONTS.ROBOTO_REGULAR_IOS : FONTS.ROBOTO_REGULAR,
    borderBottomLeftRadius: 10,
    fontSize: 17,
    //paddingVertical: 26,
  },
});

//make this component available to the app
export default TextInputComponent;
