//import liraries
import React, { Component } from "react";
import { COLORS, FONTS } from "../utils/theme";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
// create a component
const Header = ({ navigation, title }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 20,
        width: "100%",height:60,
        backgroundColor: COLORS.blue,
      }}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={1}>
        <Image
          source={require("../assets/icons/menu.png")}
          style={{
            width: 25,
            height: 20,
            marginLeft: 19,
            tintColor: COLORS.white,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 18,
          color: COLORS.white,
          fontFamily:
            Platform.OS == "ios"
              ? FONTS.ROBOTO_REGULAR_IOS
              : FONTS.ROBOTO_REGULAR,
        }}
      >
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("settings")}
        activeOpacity={1}
      >
        <Ionicons
          name="settings"
          size={20}
          color={COLORS.white}
          style={{ marginRight: 19 }}
        />
      </TouchableOpacity>
    </View>
  );
};

//make this component available to the app
export default Header;
