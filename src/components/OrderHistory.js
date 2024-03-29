//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";

import { COLOURS } from "../utils/Colours";
import { FONTS } from "../utils/Fonts";
import { SIZES } from "../utils/Sizes";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// create a component
const Order1 = ({
  name,
  address,
  phoneNumber,
  status,
  onPressNavigate,
  onPressCall,
  onPressView,
  date,
}) => {
  return (
    <View style={{ justifyContent: "center", marginBottom: 10 }}>
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 5,
            paddingHorizontal: 20,
            backgroundColor: COLOURS.blue,
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: COLOURS.white,
              //marginBottom: 50,
              fontFamily:
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_MEDIUM_IOS
                  : FONTS.ROBOTO_MEDIUM,
            }}
          >
           1 TRIP
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: COLOURS.white,
              //marginBottom: 50,
              fontFamily:
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_MEDIUM_IOS
                  : FONTS.ROBOTO_MEDIUM,
            }}
          >
           1 Order
          </Text>
          
        </View>
      </>

      <View>
        <TouchableWithoutFeedback style={styles.mainView} onPress={onPressView}>
          <View style={styles.nameViewContainer}>
            <Text
              ellipsizeMode={"tail"}
              numberOfLines={1}
              style={[styles.nameView,{flex:  0.85}]}
            >
              {name}
            </Text>
            {status == "completed" ? (
              <Image
                source={require("../assets/icons/success.png")}
                resizeMode={"contain"}
                style={{
                  width: 20,
                  height: 20,
                  opacity: 0.75,
                  alignSelf: "flex-end",
                }}
              />
            ) : null}
          </View>
          <Text
            style={styles.addressView}
            ellipsizeMode={"tail"}
            numberOfLines={1}
          >
            {address}
          </Text>

          <Text selectable={true} style={styles.phoneNumber}>
            {phoneNumber}
          </Text>

          <Text selectable={true} style={styles.dateView}>
            {date}
          </Text>
        </TouchableWithoutFeedback>
      </View>

      <View style={{ flexDirection: "row", height: SIZES.width / 7.3 }}>
        <TouchableOpacity
          style={styles.clickButtonView}
          onPress={onPressNavigate}
          activeOpacity={0.8}
        >
          <View style={styles.iconImageView}>
            <Text style={styles.actionRowView}>Navigate</Text>
            <Image
              source={require("../assets/icons/pin.png")}
              resizeMode={"contain"}
              style={styles.imageStyle}
            />
          </View>
        </TouchableOpacity>

        <View
          style={{
            //height: "100%",
            width: 0.5,
            height: "90%",
            backgroundColor: COLOURS.lightGray,
            //marginVertical: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <TouchableOpacity
          style={styles.clickButtonView}
          onPress={onPressCall}
          activeOpacity={0.8}
        >
          <View style={styles.iconImageView}>
            <Text style={styles.actionRowView}>Call</Text>
            <Image
              source={require("../assets/icons/smartphone.png")}
              resizeMode={"contain"}
              style={styles.imageStyle}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  parentView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  mainView: {
    //marginTop: 6,
    width: SIZES.width - 20,
    height: SIZES.width / 3.3,
    //paddingVertical:20 ,
    backgroundColor: COLOURS.lightGray4,
    paddingHorizontal: 15,
    justifyContent: "center",
    //flex: 1,
  },
  actionRowView: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 12,
    color: COLOURS.blue,
  },
  iconImageView: {
    flexDirection: "row",
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  clickButtonView: {
    flex: 0.5,
    width: SIZES.width - 20,
    height: SIZES.width / 8,
    backgroundColor: COLOURS.lightGray5,
    justifyContent: "center",
    alignItems: "center",
  },
  nameViewContainer: {
    flexDirection: "row",
    marginTop: 7,
    width:SIZES.width
    //flex: 0.6,
  },
  nameView: { fontSize: 15, fontWeight: "bold" },
  phoneNumber: { fontSize: 14, fontWeight: "bold", flex: 0.5 },
  addressView: {
    fontSize: 12,
    paddingVertical: 5,
    color: COLOURS.gray1,
    //flex: 1,
  },
  imageStyle: {
    width: 15,
    height: 20,
    opacity: 0.75,
    tintColor: COLOURS.blue,
  },
  dateView: {
    fontSize: 11,
    fontWeight: "normal",
    marginTop: 3,
    color: COLOURS.gray1,
    flex: 0.4,
  },
});

//make this component available to the app
export default Order1;
