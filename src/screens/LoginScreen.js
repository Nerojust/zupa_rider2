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
  ImageBackground,
  Platform,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import { AuthContext } from "../utils/Context";
import { useDispatch } from "react-redux";
import TogglePasswordEye from "../components/TogglePassword";
import LoadingDialog from "../components/LoadingDialog";
import TextInputComponent from "../components/TextInputComponent";
import { LOGIN_URL } from "../utils/Urls";
import TextInputComponent2 from "../components/TextInputComponent2";
import DisplayButton from "../components/Button";
import { loginUser, setError } from "../store/Actions";


// create a component
const LoginScreen = ({ navigation }) => {
  const { signIn } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("08069809921");
  const [pin, setPin] = useState("1234");
  const phoneNumberRef = useRef(null);
  const pinRef = useRef(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
  };
  const handlePin = (value) => {
    setPin(value);
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
    pinRef.current.focus();
  };
  const makeLoginRequest = () => {
    setIsLoading(true);

    fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phoneNumber,
        pin: pin,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          //dispatch(loginUser(responseJson));
          signIn(responseJson);
        } else {
          dispatch(setError(responseJson.message));
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        handleError(error);
        console.log(error);
      });
  };
  return (
    <View style={styles.container}>
      <LoadingDialog loading={isLoading} />
      <StatusBar
        backgroundColor={COLORS.primary}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <ImageBackground
        source={require("../assets/images/auth_bg.png")}
        style={styles.image}
      >
        <View style={styles.parentView}>
          <Image
            source={require("../assets/icons/zupa.png")}
            resizeMode={"contain"}
            style={styles.logoImage}
          />

          <View style={styles.emailAndPasswordView}>
            <TextInputComponent
              placeholder={"Email"}
              handleTextChange={handlePhoneNumber}
              defaultValue={phoneNumber}
              refInput={phoneNumberRef}
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
                  handleTextChange={handlePin}
                  defaultValue={pin}
                  refInput={pinRef}
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
                onPress={makeLoginRequest}
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
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor: COLORS.white,
  },
  parentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //width: SIZES.width - 70,

    marginHorizontal: 35,
  },
  image: { width: SIZES.width, height: SIZES.height },
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
