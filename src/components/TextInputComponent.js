//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { COLORS } from "../utils/theme";

// create a component
const TextInputComponent = ({
  placeholder,
  handleTextChange,
  defaultValue,
  ref,
  nextRef,
  keyboardType,
  secureTextEntry,
  styleProps,
}) => {
  return (
    <>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        placeholderTextColor={COLORS.gray}
        onChangeText={(text) => handleTextChange(text)}
        underlineColor={COLORS.white}
        defaultValue={defaultValue}
        ref={ref}
        //onSubmitEditing={() => nextRef.current.focus()}
        returnKeyLabel={"Next"}
        returnKeyType={"next"}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize="none"
      />
    </>
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
    borderBottomLeftRadius: 10,
    fontSize: 17,
    //paddingVertical: 26, 
  },
});

//make this component available to the app
export default TextInputComponent;
