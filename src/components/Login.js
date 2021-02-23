import React from "react";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import visibleImage from "../assets/visible.png";
import { TextInput } from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import CheckBox from "@react-native-community/checkbox";
import inVisibleImage from "../assets/invisible.png";
import { Colors } from "../utils/Color";
import { GoogleSigninButton } from "@react-native-community/google-signin";

import DisplayButton from "../components/Button";
import { ScrollView } from "react-native-gesture-handler";
import { Error } from "./Error";
import TogglePasswordEye from "../components/TogglePassword";
import FaceBookLoginButton from "../components/FBLoginButton";

import { CheckEmail } from "./CheckEmail";

export const Login = ({
  emailRef,
  handleFocusEmail,
  handleEmail,
  emailAddress,
  isEmailAddressValid,
  isEmailFocused,
  securePassword,
  passwordRef,
  performValidation,
  handleFocusPassword,
  handlePassword,
  togglePassword,
  isPasswordFocused,
  isPasswordValid,
  checked,
  handleCheckBox,
  handleSignInView,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.text_header}> Sign In </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={300}
        style={styles.footer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.textInputView}>
            <Ionicons name="mail" size={15} color={Colors.appGreen} />
            <TextInput
              placeholder="name@example.com"
              mode={"outlined"}
              style={{ ...styles.textInput, fontFamily: "roboto_regular" }}
              label={"Enter email address"}
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              ref={emailRef}
              returnKeyLabel={"Password"}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              returnKeyType={"next"}
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailAddress}
              onFocus={handleFocusEmail}
              onChangeText={(val) => handleEmail(val)}
            />
            {isEmailAddressValid ? (
              <CheckEmail />
            ) : (
              <View
                style={{
                  margin: 8,
                }}
              />
            )}
          </View>
          {isEmailFocused ? (
            isEmailAddressValid ? null : (
              <Error error="Email must contain @ and ." />
            )
          ) : null}

          <View
            style={[
              styles.textInputView,
              {
                marginTop: 22,
              },
            ]}
          >
            <Ionicons name="lock-closed" size={15} color={Colors.appGreen} />
            <TextInput
              label="Enter Password"
              placeholder="Enter password"
              mode={"outlined"}
              style={styles.textInput}
              secureTextEntry={securePassword ? true : false}
              autoCapitalize="none"
              ref={passwordRef}
              onSubmitEditing={performValidation}
              returnKeyType={"go"}
              onFocus={handleFocusPassword}
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              style={styles.textInput}
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
          {isPasswordFocused ? (
            isPasswordValid ? null : (
              <Error error=" Password must be at least 8 characters." />
            )
          ) : null}

          <View
            style={{
              marginTop: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginLeft: 20,
            }}
          >
            <CheckBox
              tintColors={{ true: Colors.appGreen }}
              disabled={false}
              value={checked}
              onValueChange={(newValue) => handleCheckBox(newValue)}
            />

            <Text style={{ fontFamily: "roboto_light", fontSize: 12 }}>
              Remember me?
            </Text>
          </View>

          <DisplayButton
            text="Sign In"
            onPress={performValidation}
            color={Colors.appGreen}
            mode={"contained"}
          />

          <DisplayButton
            text="Sign Up"
            onPress={handleSignInView}
            color={Colors.appGreen}
            mode={"outlined"}
          />

          <TouchableOpacity
            onPress={() => navigation.push("ForgotPasswordScreen")}
            activeOpacity={0.3}
            style={{
              alignItems: "center",
              marginTop: 15,
            }}
          >
            <Text
              style={{
                fontSize: 13,
                color: Colors.appGreen,
                fontFamily: "roboto_light",
              }}
            >
              Reset password?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </Animatable.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.appGreen,
  },
  iconImages: {
    height: 17,
    width: 17,
    marginLeft: 2,
    tintColor: Colors.appGreen,
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: Platform.OS === "ios" ? 50 : 20,
  },
  footer: {
    flex: 3,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 35,
  },
  text_header: {
    color: Colors.white,
    //fontWeight: "bold",
    fontSize: 28,
    fontFamily: "Montserrat-Medium",
  },

  textInputView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textInput: {
    flex: 0.9,
    height: 45,
    fontFamily: "roboto_light",
    width: "81%",
  },
});
