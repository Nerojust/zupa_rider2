//import liraries
import React, {
  Component,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
} from "react-native";
import { AuthContext } from "../utils/Context";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import TogglePasswordEye from "../components/TogglePassword";
import LoadingDialog from "../components/LoadingDialog";
import TextInputComponent from "../components/TextInputComponent";
import TextInputComponent2 from "../components/TextInputComponent2";
import DisplayButton from "../components/Button";

// create a component
const ForgotPasswordScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [securePasswordRe, setSecurePasswordRe] = useState(true);

  //const { signIn } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handleEmailAddress = (value) => {
    setEmailAddress(value);
  };

  const performValidation = () => {
    if (emailAddress) {
      alert("Please check your email and change your password");
    } else {
      alert("Email is required");
    }
  };

  const handleRefFocus = () => {
    passwordRef.current.focus();
  };

  return (
    <View style={styles.container}>
      <LoadingDialog loading={isLoading} />
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
        <Text
          style={{
            color: COLORS.gray,
            marginTop: 80,
            fontSize: 14,
            alignSelf: "center",
            fontFamily:
              Platform.OS == "ios"
                ? FONTS.ROBOTO_REGULAR_IOS
                : FONTS.ROBOTO_REGULAR,
          }}
        >
          Enter your email to reset your password
        </Text>
        <View style={styles.emailAndPasswordView}>
          <TextInputComponent
            placeholder={"Email"}
            handleTextChange={handleEmailAddress}
            defaultValue={emailAddress}
            refInput={emailAddressRef}
            onSubmitEditing={handleRefFocus}
            keyboardType={"email-address"}
            secureTextEntry={false}
            returnKeyType="next"
          />

          <View style={{ marginTop: 28 }}>
            <DisplayButton
              text="Reset Password"
              onPress={performValidation}
              color={COLORS.blue}
            />
          </View>
          <View style={styles.signRowView}>
            <Text
              style={{
                color: COLORS.gray,

                fontSize: 14,
                alignSelf: "center",
                fontFamily:
                  Platform.OS == "ios"
                    ? FONTS.ROBOTO_REGULAR_IOS
                    : FONTS.ROBOTO_REGULAR,
              }}
            >
              Have an account?
            </Text>

            <TouchableOpacity
              style={{ marginLeft: 5 }}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.signUp}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
