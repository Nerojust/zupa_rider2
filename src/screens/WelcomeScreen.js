import React, { useEffect, useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  ImageBackground,
  Image,
  SafeAreaView,
} from "react-native";
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';
import {SIZES} from '../utils/Sizes';
import * as Animatable from "react-native-animatable";
import DisplayButton from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={COLOURS.primary} barStyle="dark-content" />
      <ImageBackground
        source={require("../assets/images/auth_bg.png")}
        style={styles.image}
      >
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceIn"
            duraton="1500"
            source={require("../assets/icons/zupa.png")}
            style={styles.logo}
            resizeMode="stretch"
          />

          <Text style={styles.title}>Rider</Text>
        </View>
        <View style={styles.buttonView}>
          <Text style={styles.text}>Sign in with an account</Text>

          <DisplayButton
            text="Get started"
            onPress={() => navigation.push("Login")}
            color={COLOURS.blue}
            width={SIZES.width - 70}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLOURS.white,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: SIZES.width, height: SIZES.height },
  logo: {
    width: SIZES.width - 140,
    height: SIZES.height * 0.073,
  },
  title: {
    fontSize: 17,
    color: COLOURS.blue,
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_THIN_IOS : FONTS.ROBOTO_THIN,
    bottom: SIZES.width / 5.5,
    alignSelf: "flex-end",
    marginRight: Platform.OS == "ios" ? 68 : 70,
  },
  text: {
    color: COLOURS.gray,
    marginBottom: 15,
    justifyContent: "center",
    fontSize: 13,
    alignSelf: "center",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
  },
  buttonView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: -40,
  },
});

export default WelcomeScreen;
