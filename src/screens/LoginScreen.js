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
const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [securePasswordRe, setSecurePasswordRe] = useState(true);

  //const { signIn } = useContext(AuthContext);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const emailAddressRef = useRef(null);
  const passwordRef = useRef(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handleEmailAddress = (value) => {
    setEmailAddress(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const togglePassword = () => {
    setSecurePassword(!securePassword);
  };

  const performValidation = () => {
    navigation.navigate("Home", {
      screen: "Dashboard",
    });
  };
  const gotoForgotPasswordPage = () => {
    navigation.push("ForgotPassword");
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
          <View style={styles.passwordRowView}>
            <View
              style={{
                flex: 1,
              }}
            >
              <TextInputComponent2
                placeholder={"Password"}
                handleTextChange={handlePassword}
                defaultValue={password}
                refInput={passwordRef}
                keyboardType={"default"}
                returnKeyType="done"
                secureTextEntry={securePassword ? true : false}
              />
            </View>
            <TouchableOpacity
              style={styles.toggleView}
              onPress={togglePassword}
            >
              <TogglePasswordEye securePassword={securePassword} />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={gotoForgotPasswordPage}>
            <Text style={styles.forgotPasswordView}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{ marginTop: 18 }}>
            <DisplayButton
              text="Login"
              onPress={performValidation}
              color={COLORS.primary}
            />
          </View>
          <View style={styles.signRowView}>
            <Text
              style={{
                color: COLORS.black,

                fontSize: 14,
                alignSelf: "center",
                fontFamily:
                  Platform.OS == "ios"
                    ? FONTS.ROBOTO_REGULAR_IOS
                    : FONTS.ROBOTO_REGULAR,
              }}
            >
              Don't have an account?
            </Text>

            <TouchableOpacity style={{ marginLeft: 5 }}>
              <Text style={styles.signUp}>Sign Up</Text>
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
    marginTop: 20,
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
    color: COLORS.black,
    fontSize: 15,
    fontWeight: "bold",
    alignSelf: "center",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_REGULAR_IOS : FONTS.ROBOTO_REGULAR,
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
      Platform.OS == "ios" ? FONTS.ROBOTO_REGULAR_IOS : FONTS.ROBOTO_REGULAR,
  },
});

//make this component available to the app
export default LoginScreen;
