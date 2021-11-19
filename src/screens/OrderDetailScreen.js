//import liraries
import React, { Component, useRef, useEffect, useState } from "react";
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
  SafeAreaView,
} from "react-native";
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';
import {SIZES} from '../utils/Sizes';
import DisplayButton from "../components/Button1";
import SendSMS from "react-native-sms";
import openMap from "react-native-open-maps";
import { createOpenLink } from "react-native-open-maps";
import AnimateLoadingButton from "react-native-animate-loading-button";

import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Api";
import { useDispatch, useSelector } from "react-redux";
import { dialNumber, getTodaysDate, handleError } from "../utils/utils";

const OrderDetailScreen = ({ route, navigation }) => {
  const name = route.params.name;
  const address = route.params.address;
  const phoneNumber = route.params.phoneNumber;
  const status = route.params.status;
  //console.log("child status", status);
  const orderId = route.params.id;
  console.log("order id", orderId);
  const date = route.params.date;
  const parentId = route.params.parentId;
  const parentStatus = route.params.parentStatus;
  //console.log("parent status ", parentStatus);
  console.log("parent id ", parentId);
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkComplete, setIsMarkComplete] = useState(false);
  const dispatch = useDispatch();
  const loadingButton = useRef();
  const loginData = useSelector((state) => state.login.loginResults);
  const orderData = useSelector((state) => state.orders.orders);
  // console.log("order redux", orderData);

  const end = address;
  const travelType = "drive";
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
  const sendWhatsappMessage = () => {
    let whatsAppMessage = `Hello ${name} I will be delivering your package today. Please be on standby. Thank you`;
    let URL =
      "whatsapp://send?text=" + whatsAppMessage + "&phone=234" + phoneNumber;

    Linking.openURL(URL)
      .then((data) => {
        console.log("WhatsApp Opened", data);
      })
      .catch((error) => {
        alert("Oops! seems whatsapp is not installed on your device");
        console.log("No whatsapp app found", error);
      });
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
            console.log("journey status is " + parentStatus);
            if (parentStatus == "started") {
              performPatchRequest();
            } else {
              alert("Start trip first");
              navigation.goBack();
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * This performs the completed patch for a single order
   */
  const performPatchRequest = () => {
    console.log("order id", orderId);
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
        console.log("patch error ", error);
        dispatch(setError(error));
        if (loadingButton.current) {
          loadingButton.current.showLoading(false);
        }
      });
  };

  /**
   * this handles the parent status update to completed thus ending the journey
   */
  const endTrip = () => {
    console.log("parent id", parentId);
    fetch(GET_RIDER_REQUESTS + "/" + parentId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + loginData.jwt,
      },
      body: JSON.stringify({
        status: "completed",
        model: "dispatch",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (!responseJson.code) {
            console.log("Trip ended");
            setIsMarkComplete(true);
            // if (loadingButton.current) {
            //   loadingButton.current.showLoading(false);
            // }
          } else {
            setIsMarkComplete(false);
            dispatch(setError(responseJson.message));
          }
        } else {
          setIsMarkComplete(false);

          dispatch(setError(responseJson.message));
        }
        // if (loadingButton.current) {
        //   loadingButton.current.showLoading(false);
        // }
      })
      .catch((error) => {
        handleError(error);
        if (loadingButton.current) {
          loadingButton.current.showLoading(false);
        }
        setIsMarkComplete(false);
        console.log("start journey error: ", error);
      });
  };

  const getOrders = (isLoop) => {
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
            var count = 0;
            for (let i = 0; i < responseJson.length; i++) {
              const oneOrder = responseJson[i];
              if (oneOrder.id == parentId) {
                console.log("Found the match order and parent");
                if (
                  oneOrder.dispatch_orders &&
                  oneOrder.dispatch_orders.length > 1
                ) {
                  console.log("dispatch is more than 1, batch");
                  for (let j = 0; j < oneOrder.dispatch_orders.length; j++) {
                    const childOrder = oneOrder.dispatch_orders[j];
                    if (childOrder.status == "completed") {
                      count++;
                    }
                    if (count == oneOrder.dispatch_orders.length) {
                      console.log("Count is " + count);
                      console.log(
                        "count is equal to the dispatch length, so end trip for batch"
                      );
                      endTrip();
                    }
                  }
                } else if (oneOrder.dispatch_orders.length == 1) {
                  console.log("dispatch is a single order and is equal to 1");

                  for (let k = 0; k < oneOrder.dispatch_orders.length; k++) {
                    const childOrder = oneOrder.dispatch_orders[k];
                    if (childOrder.status == "completed") {
                      console.log(
                        "single order is completed already, start end trip"
                      );
                      endTrip();
                    }
                  }
                }
              }
            }
            getOrdersAgain();
            if (loadingButton.current) {
              loadingButton.current.showLoading(false);
            }

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
  const getOrdersAgain = () => {
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
            var newOrderList = [];
            for (let i = 0; i < responseJson.length; i++) {
              const element = responseJson[i];
              if (element.status != "completed") {
                newOrderList.push(element);
                //console.log("call done");
              }
            }
            dispatch(saveOrder(newOrderList));
            //console.log("2nd call orders saved to redux");
          } else {
            alert(responseJson.message);
          }
        } else {
          alert(responseJson.message);
        }
      })
      .catch((error) => {
        console.log("error", error);
        dismissLoader();
        handleError(error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          //flex: 1,
          flexDirection: "row",
          marginTop: 15,
          alignItems: "center",
          justifyContent: "flex-start",
          paddingHorizontal: 5,
        }}
      >
        <>
          <Image
            source={require("../assets/icons/calendar.png")}
            resizeMode={"contain"}
            style={{
              width: 13,
              height: 13,
              flex: 0.37,
            }}
          />
          <Text
            selectable={true}
            style={{ fontSize: 15, flex: 1.9, left: -10 }}
          >
            {getTodaysDate(date)}
          </Text>
        </>
      </View>
      <View
        style={{
          //flex: 1,
          flexDirection: "row",
          marginTop: 17,
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
              width: 13,
              height: 13,
              flex: 0.37,
            }}
          />
          <Text
            selectable={true}
            style={{ fontSize: 15, flex: 1.9, left: -10 }}
          >
            {address}
          </Text>
        </>
      </View>

      <View
        style={{
          flexDirection: "row",
          marginTop: 20,
          alignSelf: "flex-start",
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 5,
        }}
      >
        <Image
          source={require("../assets/icons/smartphone.png")}
          resizeMode={"contain"}
          style={{ width: 13, height: 13, flex: 0.37 }}
        />
        <Text selectable={true} style={{ fontSize: 15, flex: 1.9, left: -10 }}>
          {phoneNumber}
        </Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <DisplayButton
          text="Navigate"
          onPress={openLocation}
          color={COLOURS.blue}
          left={SIZES.width / 3 - 5}
          width={SIZES.width - 70}
          //image={require("../assets/icons/pin.png")}
          tintColor={COLOURS.lightGray3}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <DisplayButton
          text="Call"
          onPress={() => dialNumber(phoneNumber)}
          color={COLOURS.blue}
          width={SIZES.width - 70}
          left={SIZES.width / 3 - 5}
          //image={require("../assets/icons/phone.png")}
          tintColor={COLOURS.lightGray3}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "center",
          alignItems: "center",
          width: SIZES.width - 70,
        }}
      >
        <View style={{ flex: 1, marginRight: 3 }}>
          <DisplayButton
            text="Text"
            onPress={sendTextMessage}
            color={COLOURS.blue}
            image={require("../assets/icons/smartphone.png")}
            tintColor={COLOURS.lightGray3}
          />
        </View>
        <View style={{ flex: 1, marginLeft: 3 }}>
          <DisplayButton
            text="Whatsapp"
            onPress={sendWhatsappMessage}
            color={COLOURS.blue}
            //left={SIZES.width / 3 - 5}
            image={require("../assets/icons/smartphone.png")}
            tintColor={COLOURS.lightGray3}
          />
        </View>
      </View>
      {status == "completed" ? (
        <View style={{ marginTop: 30 }}>
          <DisplayButton
            text="Completed"
            color={COLOURS.green1}
            left={SIZES.width / 3 - 5}
          />
        </View>
      ) : (
        <View style={{ marginTop: 30, width: SIZES.width - 70 }}>
          {!isMarkComplete ? (
            <AnimateLoadingButton
              ref={(c) => (loadingButton.current = c)}
              width={SIZES.width - 70}
              height={50}
              title="Mark Complete"
              titleWeight={"700"}
              titleFontFamily={
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_BLACK_IOS
                  : FONTS.ROBOTO_MEDIUM
              }
              titleFontSize={17}
              titleColor={COLOURS.white}
              activityIndicatorColor={COLOURS.white}
              backgroundColor={COLOURS.blue}
              borderRadius={10}
              onPress={handleComplete.bind(this)}
            />
          ) : (
            <AnimateLoadingButton
              ref={(c) => (loadingButton.current = c)}
              width={SIZES.width - 70}
              height={50}
              title="Completed"
              titleWeight={"700"}
              titleFontFamily={
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_BLACK_IOS
                  : FONTS.ROBOTO_MEDIUM
              }
              titleFontSize={18}
              titleColor={COLOURS.white}
              activityIndicatorColor={COLOURS.white}
              backgroundColor={COLOURS.green3}
              borderRadius={10}
              onPress={handleNothing.bind(this)}
            />
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: "center",
    backgroundColor: COLOURS.white,
  },
  dateView: {
    fontSize: 15,
    fontWeight: "normal",
    marginTop: 15,
    color: COLOURS.gray1,
    alignSelf: "flex-start",
    marginLeft: 30,
  },
});

//make this component available to the app
export default OrderDetailScreen;
