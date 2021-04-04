//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput,Platform } from "react-native";
import { COLORS, SIZES, FONTS } from "../utils/theme";

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
      placeholderTextColor={COLORS.gray}
      onChangeText={(text) => handleTextChange(text)}
      underlineColor={COLORS.white}
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
    backgroundColor: COLORS.lightGray5,
    paddingLeft: 16,
    color: COLORS.black,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_REGULAR_IOS : FONTS.ROBOTO_REGULAR,
    borderBottomLeftRadius: 10,
    fontSize: 17,
    alignSelf: "center",
    width: SIZES.width / 1.25,
  },
});

//make this component available to the app
export default TextInputComponent;
