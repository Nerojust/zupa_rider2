//import liraries
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
} from "react-native";
import { COLORS, FONTS } from "../utils/theme";
import email from "react-native-email";

// create a component
const ForgotPasswordScreen = ({ navigation }) => {
  const sendEmail = () => {
    const to = ["hello@zupa.ng"]; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      // cc: ["bazzy@moo.com", "doooo@daaa.com"], // string or array of email addresses
      // bcc: "mee@mee.com", // string or array of email addresses
      subject: "",
      body: "",
    }).catch(console.error);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <View style={styles.parentView}>
        <Image
          source={require("../assets/icons/zupa.png")}
          resizeMode={"contain"}
          style={styles.logoImage}
        />
        <View style={{ marginTop: 30 }}>
          <Text
            style={{
              //flex: 0.7,
              color: COLORS.gray,
              fontSize: 14,
              alignSelf: "center",
              fontFamily:
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_REGULAR_IOS
                  : FONTS.ROBOTO_REGULAR,
            }}
          >
            To get a new password, please send an email to our admin using the
            email address below.
          </Text>
          <TouchableOpacity activeOpacity={0.6} onPress={sendEmail}>
            <Text
              style={{
                //flex: 0.7,
                color: COLORS.blue,
                marginTop: 20,
                fontSize: 18,
                alignSelf: "center",
                fontFamily:
                  Platform.OS == "ios"
                    ? FONTS.ROBOTO_REGULAR_IOS
                    : FONTS.ROBOTO_REGULAR,
              }}
            >
              hello@zupa.ng
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  parentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //width: SIZES.width - 70,

    marginHorizontal: 35,
  },
  logoImage: { width: Platform.OS == "ios" ? 190 : 170, height: 40 },
  emailAndPasswordView: {
    alignSelf: "center",
    marginTop: 10,
  },
  toggleView: {
    backgroundColor: COLORS.lightGray5,
    flex: 0.2,
    justifyContent: "center",
    top: 10,
    left: -1,
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  signUp: {
    color: COLORS.blue,
    fontSize: 15,
    fontWeight: "300",
    alignSelf: "center",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
  },
  passwordRowView: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  signRowView: {
    //flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 45,
  },
  forgotPasswordView: {
    color: COLORS.primary,
    marginTop: 30,
    fontSize: 14,
    alignSelf: "flex-end",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
  },
});

//make this component available to the app
export default ForgotPasswordScreen;
