import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
  Image,
} from "react-native";
import { FONTS, SIZES, COLORS } from "../utils/theme";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require("../assets/images/bitcoin.png")}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: COLORS.white,
          },
        ]}
        animation="fadeInUpBig"
      >
        <Text
          style={[
            styles.title,
            {
              color: COLORS.black,
              fontFamily:
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_MEDIUM_IOS
                  : FONTS.MONTSERRAT_EXTRABOLD,
            },
          ]}
        >
          Zupa Rider
        </Text>
        <Text style={styles.text}>Sign in with an account</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => navigation.push("Login")}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[COLORS.primary, COLORS.secondary]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}>Get Started</Text>
              <Image
                source={require("../assets/icons/next.png")}
                style={{
                  height: 15,
                  width: 15,
                  tintColor: COLORS.white,
                  marginLeft: 10,
                }}
              />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};
const height_logo = SIZES.height * 0.15;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 10,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.MONTSERRAT_EXTRABOLD,
  },
  text: {
    color: "grey",
    marginTop: 5,
    fontFamily:
      Platform.OS == "ios" ? FONTS.MONTSERRAT_EXTRABOLD_IOS : FONTS.MONTSERRAT_EXTRABOLD,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontFamily:
      Platform.OS == "ios" ? FONTS.MONTSERRAT_EXTRABOLD_IOS : FONTS.MONTSERRAT_EXTRABOLD,
  },
});

export default WelcomeScreen;
