//import liraries
import React, {
  Component,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../utils/Context";
import Ionicons from "react-native-vector-icons/Ionicons";
import { TextInput } from "react-native-paper";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { COLORS, SIZES } from "../utils/theme";
import TogglePasswordEye from "../components/TogglePassword";
import { visibleImage, inVisibleImage } from "../utils/icons";
import DisplayButton from "../components/Button";
// create a component
const LoginScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [securePasswordRe, setSecurePasswordRe] = useState(true);

  //const { signIn } = useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const [securePassword, setSecurePassword] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
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
    <>
      <View style={styles.header}>
        <Text style={styles.text_header}> Sign In </Text>
      </View>
      <KeyboardAwareScrollView style={styles.footer}>
        <View>
          <View style={[styles.textInputView, { marginBottom: 10 }]}>
            <Ionicons name="mail" size={15} color={COLORS.primary} />

            <TextInput
              placeholder="080..."
              mode={"flat"}
              style={[{ ...styles.textInput }, { marginRight: 14 }]}
              label={"Phone number"}
              theme={{
                colors: {
                  primary: COLORS.primary,
                  underlineColor: "transparent",
                },
              }}
              ref={phoneNumberRef}
              returnKeyLabel={"Password"}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              returnKeyType={"next"}
              keyboardType="number-pad"
              autoCapitalize="none"
              value={phoneNumber}
              //onFocus={handleFocusEmail}
              onChangeText={(val) => handlePhoneNumber(val)}
            />

            <View style={{ flex: 0.01 }} />
          </View>

          <View style={styles.textInputView}>
            <Ionicons name="lock-closed" size={15} color={COLORS.primary} />
            <TextInput
              label="Enter Password"
              placeholder="Enter password"
              mode={"flat"}
              style={[styles.textInput, { marginTop: 10 }]}
              secureTextEntry={securePassword ? true : false}
              autoCapitalize="none"
              ref={passwordRef}
              onSubmitEditing={performValidation}
              returnKeyType={"go"}
              //onFocus={handleFocusPassword}
              theme={{
                colors: {
                  primary: COLORS.primary,
                  underlineColor: "transparent",
                },
              }}
              onChangeText={(val) => handlePassword(val)}
            />
            <TouchableOpacity
              onPress={togglePassword}
              style={{
                position: "relative",
              }}
            >
              {securePassword ? (
                <TogglePasswordEye image={visibleImage} />
              ) : (
                <TogglePasswordEye image={inVisibleImage} />
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginHorizontal: 20, marginTop:30 }}>
            <DisplayButton
              text="Sign In"
              onPress={performValidation}
              color={COLORS.primary}
              mode={"contained"}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //backgroundColor:COLORS.primary
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
