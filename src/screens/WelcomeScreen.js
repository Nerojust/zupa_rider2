import React from "react";
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
} from "react-native";
import { FONTS, SIZES, COLORS } from "../utils/theme";
import * as Animatable from "react-native-animatable";
import DisplayButton from "../components/Button";

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
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
            color={COLORS.blue}
          />
        </View>
      </ImageBackground>
    </View>
  );
};
const height_logo = SIZES.height * 0.08;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: SIZES.width, height: SIZES.height },
  logo: {
    width: SIZES.width - 140,
    height: height_logo,
  },
  title: {
    fontSize: 17,
    color: COLORS.blue,
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_THIN_IOS : FONTS.ROBOTO_THIN,
    top: -65,
    alignSelf: "flex-end",
    marginRight: Platform.OS == "ios" ? 68 : 70,
  },
  text: {
    color: "grey",
    marginBottom: 15,
    justifyContent: "center",
    fontSize:13,
    alignSelf: "center",
    fontFamily:
      Platform.OS == "ios" ? FONTS.VARELA_ROUND_REGULAR_IOS : FONTS.ROBOTO_MEDIUM,
  },
  buttonView: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    top: -40,
  },
});

export default WelcomeScreen;
