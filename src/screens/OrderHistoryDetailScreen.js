//import liraries
import React, { Component } from "react";
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
import { COLORS, FONTS, SIZES } from "../utils/theme";
import DisplayButton from "../components/Button1";
import SendSMS from "react-native-sms";
import call from "react-native-phone-call";
import openMap from "react-native-open-maps";
import { createOpenLink } from "react-native-open-maps";
import { getTodaysDate } from "../utils/utils";

// create a component
const OrderHistoryDetailScreen = ({ route, navigation }) => {
  const name = route.params.name;
  const address = route.params.address;
  const phoneNumber = route.params.phoneNumber;
  const status = route.params.status;
  const date = route.params.date;

  console.log("status ", status);
  const end = address;
  const travelType = "drive";

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
          <Text style={{ fontSize: 15, flex: 1.9, left: -10 }}>{address}</Text>
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
          style={{ width: 13, height: 13,   flex: 0.37,}}
        />
        <Text style={{ fontSize: 15,flex: 1.9, left: -10  }}>{phoneNumber}</Text>
      </View>

      <View style={{ marginTop: 40 }}>
        <DisplayButton
          text="Navigate"
          onPress={openLocation}
          color={COLORS.blue}
          left={SIZES.width / 3 - 5}
          image={require("../assets/icons/pin.png")}
          tintColor={COLORS.white}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <DisplayButton
          text="Call"
          onPress={() => dialNumber(phoneNumber)}
          color={COLORS.blue}
          left={SIZES.width / 3 - 5}
          image={require("../assets/icons/phone.png")}
          tintColor={COLORS.white}
        />
      </View>
      <View style={{ marginTop: 30 }}>
        <DisplayButton
          text="Text"
          onPress={sendTextMessage}
          color={COLORS.blue}
          left={SIZES.width / 3 - 5}
          image={require("../assets/icons/smartphone.png")}
          tintColor={COLORS.white}
        />
      </View>
      {status == "completed" ? (
        <View style={{ marginTop: 30 }}>
          <DisplayButton
            text="Completed"
            color={COLORS.green1}
            left={SIZES.width / 3 - 5}
          />
        </View>
      ) : null}
    </SafeAreaView>
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
export default OrderHistoryDetailScreen;
