//import liraries
import React, { Component, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Button,
  Platform,
  Alert,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import DisplayButton from "../components/Button1";
import SendSMS from "react-native-sms";
import call from "react-native-phone-call";
import openMap from "react-native-open-maps";
import { createOpenLink } from "react-native-open-maps";
import AnimateLoadingButton from "react-native-animate-loading-button";

import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Urls";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder, setError } from "../store/Actions";
import { handleError } from "../utils/utils";

const OrderDetailScreen = ({ route, navigation }) => {
  const name = route.params.name;
  const address = route.params.address;
  const phoneNumber = route.params.phoneNumber;
  const status = route.params.status;
  const orderId = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkComplete, setIsMarkComplete] = useState(false);
  const dispatch = useDispatch();
  const loadingButton = useRef();
  const loginData = useSelector((state) => state.login.loginResults);
  const start = "Here";
  const end = address;
  const travelType = "drive";

  const dialNumber = () => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };

  const openLocation = createOpenLink({ travelType, end, provider: "google" });

  const sendTextMessage = () => {
    SendSMS.send(
      {
        body: `Hello ${name}, I will be delivering your package today. Please be on standby. Thank you`,
        recipients: [phoneNumber],
        successTypes: ["sent", "queued"],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          "SMS Callback: completed: " +
            completed +
            " cancelled: " +
            cancelled +
            " error: " +
            error
        );
      }
    );
  };
  const handleNothing = () => {};
  const handleComplete = () => {
    Alert.alert(
      "Order Alert",
      "Do you want to comfirm order?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("cancel Pressed");
          },
        },
        {
          text: "Yes",
          onPress: () => {
            performPatchRequest();
          },
        },
      ],
      { cancelable: true }
    );
  };

  const performPatchRequest = () => {
    loadingButton.current.showLoading(true);

    fetch(GET_RIDER_REQUESTS + "/" + orderId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + loginData.jwt,
      },
      body: JSON.stringify({
        status: "completed",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (!responseJson.code) {
            getOrders();
          } else {
            if (loadingButton.current) {
              loadingButton.current.showLoading(false);
            }
            dispatch(setError(responseJson.message));
          }
        } else {
          if (loadingButton.current) {
            loadingButton.current.showLoading(false);
          }
          dispatch(setError(responseJson.message));
        }
      })
      .catch((error) => {
        handleError(error);
        console.log("here oooo", error);
        if (loadingButton.current) {
          loadingButton.current.showLoading(false);
        }
      });
  };

  const getOrders = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + loginData.jwt);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(GET_RIDER_REQUESTS, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (!responseJson.code) {
            dispatch(saveOrder(responseJson[0].dispatch_orders));

            setIsMarkComplete(true);
          } else {
            setIsMarkComplete(false);
            dispatch(setError(responseJson.message));
          }
        } else {
          dispatch(setError(responseJson.message));
          setIsMarkComplete(false);
        }
        if (loadingButton.current) {
          loadingButton.current.showLoading(false);
        }
      })
      .catch((error) => {
        console.log("error", error);
        handleError(error);
        setIsMarkComplete(false);
        if (loadingButton.current) {
          loadingButton.current.showLoading(false);
        }
      });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          //flex: 1,
          flexDirection: "row",
          marginTop: 35,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 5,
        }}
      >
        <>
          <Image
            source={require("../assets/icons/pin.png")}
            resizeMode={"contain"}
            style={{
              width: 18,
              height: 15,
              flex: 0.27,
            }}
          />
          <Text style={{ fontSize: 16, flex: 1.2, left: -10 }}>{address}</Text>
        </>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          alignSelf: "flex-start",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 28,
        }}
      >
        <Image
          source={require("../assets/icons/smartphone.png")}
          resizeMode={"contain"}
          style={{ width: 18, height: 15, marginRight: 15 }}
        />
        <Text style={{ fontSize: 16 }}>{phoneNumber}</Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <DisplayButton
          text="Navigate"
          onPress={openLocation}
          color={COLORS.gray}
          left={110}
          image={require("../assets/icons/pin.png")}
          tintColor={COLORS.white}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <DisplayButton
          text="Call"
          onPress={dialNumber}
          color={COLORS.blue}
          left={130}
          image={require("../assets/icons/phone.png")}
          tintColor={COLORS.white}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <DisplayButton
          text="Text"
          onPress={sendTextMessage}
          color={COLORS.secondary}
          left={130}
          image={require("../assets/icons/smartphone.png")}
          tintColor={COLORS.white}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        {!isMarkComplete ? (
          <AnimateLoadingButton
            ref={(c) => (loadingButton.current = c)}
            width={Platform.OS == "ios" ? 300 : 290}
            height={50}
            //borderWidth={30}
            title="Mark Complete"
            titleWeight={"700"}
            titleFontFamily={
              Platform.OS == "ios"
                ? FONTS.MONTSERRAT_MEDIUM_IOS
                : FONTS.MONTSERRAT_MEDIUM
            }
            titleFontSize={18}
            titleColor={COLORS.white}
            activityIndicatorColor={COLORS.white}
            backgroundColor={COLORS.blue}
            borderRadius={10}
            onPress={handleComplete.bind(this)}
          />
        ) : (
          <AnimateLoadingButton
            ref={(c) => (loadingButton.current = c)}
            width={Platform.OS == "ios" ? 300 : 290}
            height={50}
            //borderWidth={30}

            title="Completed"
            titleWeight={"700"}
            titleFontFamily={
              Platform.OS == "ios"
                ? FONTS.MONTSERRAT_MEDIUM_IOS
                : FONTS.MONTSERRAT_MEDIUM
            }
            titleFontSize={18}
            titleColor={COLORS.white}
            activityIndicatorColor={COLORS.white}
            backgroundColor={COLORS.darkGreen}
            borderRadius={10}
            onPress={handleNothing.bind(this)}
          />
        )}
      </View>

      {/* {!isMarkComplete ? (
        <View style={{ marginTop: 30 }}>
          <DisplayButton
            text="Mark as Complete"
            onPress={handleComplete}
            color={COLORS.darkGreen}
            left={80}
            //image={require("../assets/icons/success.png")}
            //tintColor={COLORS.gray}
          />
        </View>
      ) : null} */}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
});

//make this component available to the app
export default OrderDetailScreen;
