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
  Platform,
} from "react-native";
import { AuthContext } from "../utils/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import TogglePasswordEye from "../components/TogglePassword";
import { visibleImage, inVisibleImage } from "../utils/icons";
import TextInputComponent from "../components/TextInputComponent";
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

  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/icons/zupa.png")}
          resizeMode={"contain"}
          style={{ width: Platform.OS == "ios" ? 190 : 170, height: 40 }}
        />

        <View
          style={{
            width: SIZES.width - 70,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <TextInputComponent
            placeholder={"Email"}
            handleTextChange={handleEmailAddress}
            defaultValue={emailAddress}
            //ref={emailAddressRef}
            // nextRef={passwordRef}
            keyboardType={"email-address"}
            secureTextEntry={false}
          />
          <View style={{ marginTop: 10 }}>
            <TextInputComponent
              placeholder={"Password"}
              handleTextChange={handlePassword}
              defaultValue={password}
              //ref={passwordRef}
              keyboardType={"default"}
              secureTextEntry={securePassword ? true : false}
            />
          </View>
          <TouchableOpacity>
            <Text
              style={{
                color: COLORS.purple1,
                marginTop: 30,
                fontSize: 14,
                alignSelf: "flex-end",
                fontFamily:
                  Platform.OS == "ios"
                    ? FONTS.ROBOTO_REGULAR_IOS
                    : FONTS.ROBOTO_REGULAR,
              }}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 18 }}>
            <DisplayButton
              text="Login"
              onPress={performValidation}
              color={COLORS.purple1}
              mode={"contained"}
            />
          </View>
          <View
            style={{
              //flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.black,
                marginTop: 50,
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
              <Text
                style={{
                  color: COLORS.black,
                  marginTop: 50,
                  fontSize: 15,
                  fontWeight: "bold",
                  alignSelf: "center",
                  fontFamily:
                    Platform.OS == "ios"
                      ? FONTS.ROBOTO_REGULAR_IOS
                      : FONTS.ROBOTO_REGULAR,
                }}
              >
                Sign Up
              </Text>
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

  header: {
    flex: 0.5,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
  },
  text_header: {
    color: COLORS.secondary,
    //fontWeight: "bold",
    fontSize: 28,
    fontFamily: "Montserrat-Medium",
  },
  footer: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  textInputView: {
    flex: 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInput: {
    flex: 0.8,
    height: 50,
    fontFamily: "roboto_light",
    //width: "81%",
    fontSize: 17,
  },
});

//make this component available to the app
export default LoginScreen;
