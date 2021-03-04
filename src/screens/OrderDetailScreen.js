//import liraries
<<<<<<< HEAD
import React, { Component, useState } from "react";
=======
import React, { Component } from "react";
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
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
<<<<<<< HEAD

import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Urls";
import { useDispatch, useSelector } from "react-redux";
import { saveOrder, setError } from "../store/Actions";
import { handleError } from "../utils/utils";

=======
// create a component
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
const OrderDetailScreen = ({ route, navigation }) => {
  const name = route.params.name;
  const address = route.params.address;
  const phoneNumber = route.params.phoneNumber;
  const status = route.params.status;
<<<<<<< HEAD
  const orderId = route.params.id;
  const [isLoading, setIsLoading] = useState(false);
  const [isMarkComplete, setIsMarkComplete] = useState(false);
  const dispatch = useDispatch();

  const loginData = useSelector((state) => state.login.loginResults);
=======

>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
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

  const userLocation = { latitude: 6.5886839, longitude: 3.2888395 };
  //const openUserLocation = createOpenLink(userLocation);
  //const openLocation = createOpenLink({ ...userLocation, zoom: 30 });
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
<<<<<<< HEAD

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
  const showLoader = () => {
    setIsLoading(true);
  };
  const dismissLoader = () => {
    setIsLoading(false);
  };
  const performPatchRequest = () => {
    showLoader();
    // console.log("order id", orderId);
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
        //console.log("response is ", responseJson);
        if (responseJson) {
          if (!responseJson.code) {
            getOrders();
          } else {
            dispatch(setError(responseJson.message));
          }
        } else {
          dispatch(setError(responseJson.message));
        }
      })
      .catch((error) => {
        setIsLoading(false);
        handleError(error);
        console.log("here oooo", error);
        dismissLoader();
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
            alert("Update is successful");
            setIsMarkComplete(true);
          } else {
            alert(responseJson.message);
          }
        } else {
          alert(responseJson.message);
        }

        dismissLoader();
      })
      .catch((error) => {
        console.log("error", error);
        handleError(error);
        dismissLoader();
      });
    //dismissLoader();
  };

  return (
    <View style={styles.container}>
      <LoadingDialog loading={isLoading} />
=======
  return (
    <View style={styles.container}>
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
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
          left={115}
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
<<<<<<< HEAD
      {!isMarkComplete ? (
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
      ) : null}
=======
      <View style={{ marginTop: 30 }}>
        <DisplayButton
          text="Mark as Complete"
          onPress={() => Alert.alert("Completed")}
          color={COLORS.darkGreen}
          left={80}
          //image={require("../assets/icons/success.png")}
          //tintColor={COLORS.gray}
        />
      </View>
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
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
