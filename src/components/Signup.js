import React from "react";
import * as Animatable from "react-native-animatable";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  Image,
} from "react-native";
import checkImage from "../assets/check.png";
import visibleImage from "../assets/visible.png";
import inVisibleImage from "../assets/invisible.png";
import DisplayButton from "../components/Button";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from "../utils/Color";
import { Error } from "./Error";
import TogglePasswordEye from "../components/TogglePassword";
import { CheckEmail } from "./CheckEmail";
import { TextInput, Button, RadioButton } from "react-native-paper";

export const SignUp = ({
  focusFirstName,
  validateFirstName,
  lastNameRef,
  focusLastName,
  validateLastname,
  isSignupEmailFocused,
  handleGenderSwitch,
  genderRadioValue,
  emailRef,
  firstNameRef,
  isSignUpEmailAddressValid,
  handleEmailSignUp,
  isSignupPasswordFocused,
  focusPassword,
  phoneNumberRef,
  focusPhoneNumber,
  handlePhoneNumber,
  isPhoneNumberFocused,
  passwordRef,
  securePasswordSignup,
  handlePasswordSignup,
  isPasswordSignupValid,
  togglePasswordSignup,
  reenterPasswordRef,
  securePasswordRe,
  focusRePassword,
  handleReEnterPassword,
  togglePasswordRe,
  isReenterPasswordValid,
  isReEnteredPasswordFocused,
  performSignUp,
  isPhoneNumberValid,
  handleSignInView,
  handleFocusEmailSignup,
}) => {
  return (
    <>
      <View style={styles.header}>
        <Text style={styles.text_header}> Sign Up </Text>
      </View>
      <Animatable.View
        animation="fadeInUpBig"
        delay={300}
        style={styles.footer}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*first name */}
          <View
            style={[
              styles.textInputView,
              {
                marginRight: 15,
                marginTop: 25,
              },
            ]}
          >
            <Ionicons
              name="ios-person"
              size={15}
              color={Colors.appGreen}
              style={{
                marginRight: 5,
              }}
            />
            <TextInput
              placeholder="Enter first name"
              label={"Enter First Name"}
              style={styles.textInput}
              autoCapitalize="none"
              ref={firstNameRef}
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              onFocus={focusFirstName}
              mode={"outlined"}
              onChangeText={(val) => validateFirstName(val)}
              onSubmitEditing={() => lastNameRef.current.focus()}
              returnKeyType={"next"}
            />
          </View>
          {/*last name */}
          <View
            style={[
              styles.textInputView,
              {
                marginTop: 10,
                marginRight: 15,
              },
            ]}
          >
            <Ionicons
              name="ios-person"
              size={15}
              color={Colors.appGreen}
              style={{
                marginRight: 5,
              }}
            />

            <TextInput
              placeholder="Enter last name"
              label={"Enter last name"}
              style={styles.textInput}
              ref={lastNameRef}
              autoCapitalize="none"
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              onFocus={focusLastName}
              mode={"outlined"}
              onChangeText={(val) => validateLastname(val)}
              onSubmitEditing={() => emailRef.current.focus()}
              returnKeyType={"next"}
            />
          </View>
          {/*radio buttons */}
          <RadioButton.Group
            onValueChange={(value) => handleGenderSwitch(value)}
            value={genderRadioValue}
          
          >
            <View
              style={{
                flexDirection: "row",
                marginLeft: 14,
                alignItems: "center",
              }}
            >
              <Ionicons name="man" size={15} color={Colors.appGreen} />
              <RadioButton.Item
                label="Male"
                value="male"
                color={Colors.appGreen}
              />
              <Ionicons name="woman" size={15} color={Colors.appGreen} />
              <RadioButton.Item
                label="Female"
                value="female"
                color={Colors.appGreen}
              />
            </View>
          </RadioButton.Group>
          {/*email address */}
          <View style={styles.textInputView}>
            <Ionicons
              name="mail"
              size={15}
              color={Colors.appGreen}
              style={{
                marginRight: 5,
              }}
            />
            <TextInput
              placeholder="name@example.com"
              mode={"outlined"}
              style={styles.textInput}
              label={"Enter email address"}
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              ref={emailRef}
              onSubmitEditing={() => phoneNumberRef.current.focus()}
              returnKeyType={"next"}
              keyboardType="email-address"
              autoCapitalize="none"
              onFocus={handleFocusEmailSignup}
              onChangeText={(val) => handleEmailSignUp(val)}
            />
            {isSignUpEmailAddressValid ? (
              <CheckEmail />
            ) : (
              <View
                style={{
                  margin: 8,
                }}
              />
            )}
          </View>
          {isSignupEmailFocused ? (
            isSignUpEmailAddressValid ? null : (
              <Error error="Email must contain @ and ." />
            )
          ) : null}
          {/* phone number */}
          <View
            style={[
              styles.textInputView,
              {
                marginVertical: 10,
                marginRight: 18,
              },
            ]}
          >
            <Ionicons
              name="ios-person"
              size={15}
              color={Colors.appGreen}
              style={{
                marginRight: 5,
              }}
            />
            <TextInput
              placeholder="Enter phone number"
              label={"Enter phone number"}
              style={styles.textInput}
              autoCapitalize="none"
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              ref={phoneNumberRef}
              mode={"outlined"}
              onFocus={focusPhoneNumber}
              keyboardType={"number-pad"}
              maxLength={11}
              onChangeText={(val) => handlePhoneNumber(val)}
              onSubmitEditing={() => passwordRef.current.focus()}
              returnKeyType={"next"}
            />
          </View>
          {isPhoneNumberFocused ? (
            isPhoneNumberValid ? null : (
              <Error error="Number must be 11 digits starting with 080..." />
            )
          ) : null}
          {/*password */}
          <View style={styles.textInputView}>
            <Ionicons
              name="lock-closed"
              size={15}
              color={Colors.appGreen}
              style={{
                marginRight: 5,
              }}
            />
            <TextInput
              label="Enter Password"
              placeholder="Enter password"
              mode={"outlined"}
              ref={passwordRef}
              style={styles.textInput}
              secureTextEntry={securePasswordSignup ? true : false}
              autoCapitalize="none"
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              onFocus={focusPassword}
              onChangeText={(val) => handlePasswordSignup(val)}
              onSubmitEditing={() => reenterPasswordRef.current.focus()}
              returnKeyType={"next"}
            />
            <TouchableOpacity onPress={togglePasswordSignup}>
              {securePasswordSignup ? (
                <TogglePasswordEye image={visibleImage} />
              ) : (
                <TogglePasswordEye image={inVisibleImage} />
              )}
            </TouchableOpacity>
          </View>
          {isSignupPasswordFocused ? (
            isPasswordSignupValid ? null : (
              <Error error=" Password must be at least 8 characters." />
            )
          ) : null}
          {/* re entered password */}
          <View
            style={[
              styles.textInputView,
              {
                marginTop: 10,
              },
            ]}
          >
            <Ionicons
              name="lock-closed"
              size={15}
              color={Colors.appGreen}
              style={{
                marginRight: 5,
              }}
            />
            <TextInput
              label="Re-enter Password"
              placeholder="Re-enter password"
              mode={"outlined"}
              style={styles.textInput}
              ref={reenterPasswordRef}
              secureTextEntry={securePasswordRe ? true : false}
              autoCapitalize="none"
              theme={{
                colors: {
                  primary: Colors.appGreen,
                  underlineColor: "transparent",
                },
              }}
              onFocus={focusRePassword}
              onChangeText={(val) => handleReEnterPassword(val)}
            />
            <TouchableOpacity onPress={togglePasswordRe}>
              {securePasswordRe ? (
                <TogglePasswordEye image={visibleImage} />
              ) : (
                <TogglePasswordEye image={inVisibleImage} />
              )}
            </TouchableOpacity>
          </View>
          {isReEnteredPasswordFocused ? (
            isReenterPasswordValid ? null : (
              <Error error=" Password must be at least 8 characters." />
            )
          ) : null}
          {/*Buttons */}
          <View style={[styles.footer, { marginTop: 10, marginBottom: 40 }]}>
            <DisplayButton
              text="Sign Up"
              onPress={performSignUp}
              color={Colors.appGreen}
              mode={"contained"}
            />

            <Text
              style={{
                textAlign: "center",
                fontSize: 9,
                marginTop: 5,
                color: Colors.gray_color,
                fontFamily: "roboto_light",
              }}
            >
              By registering, you confirm that you accept our
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 9,
                  fontFamily: "roboto_medium",
                  color: Colors.appGreen,
                }}
              >
                Terms of Service
              </Text>
              <Text
                style={{
                  paddingHorizontal: 5,
                  fontSize: 9,
                  fontFamily: "roboto_light",
                }}
              >
                and
              </Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 9,
                  fontFamily: "roboto_medium",
                  color: Colors.appGreen,
                }}
              >
                Privacy Policy
              </Text>
            </View>
            <DisplayButton
              text="Sign In"
              onPress={handleSignInView}
              color={Colors.gray_color}
              mode={"outlined"}
            />
          </View>
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
  },
  text_header: {
    color: Colors.white,
    fontFamily: "Montserrat-Medium",
    fontSize: 28,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
    fontFamily: "roboto_regular",
  },
  action: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.lightGray,
    paddingBottom: 5,
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 0.3,
    borderRadius: 3,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInputView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    flex: 0.9,
    height: 43,
    fontFamily: "roboto_regular",
    fontSize: 15,
  },
  inputLine: {
    flexDirection: "row",
    flex: 1,
  },
  checkbox: {
    alignSelf: "center",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    marginTop: Platform.OS === "ios" ? 30 : 20,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
