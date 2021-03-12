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

import { COLORS, FONTS, SIZES } from "../utils/theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

// create a component
const Order = ({
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
    <>
      <TouchableWithoutFeedback style={styles.mainView} onPress={onPressView}>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Text
            ellipsizeMode={"tail"}
            numberOfLines={1}
            style={[styles.nameView, { flex: 1 }]}
          >
            {name}
          </Text>
          {status == "pending" ? (
            <View
              style={{
                width: 20,
                height: 20,
                alignSelf: "flex-end",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: COLORS.gray,
              }}
            />
          ) : status == "ready for dispatch" ? (
            <View
              style={{
                width: 20,
                height: 20,
                alignSelf: "flex-end",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: COLORS.gray,
              }}
            />
          ) : status == "completed" ? (
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
          ) : (
            <View
              style={{
                width: 20,
                height: 20,
                alignSelf: "flex-end",
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: COLORS.red,
              }}
            />
          )}
        </View>
        <Text
          style={styles.addressView}
          ellipsizeMode={"tail"}
          numberOfLines={2}
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

      <View style={{ flex: 0.5 }}>
        <View style={{ flexDirection: "row" }}>
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
              height: "100%",
              width: 0.5,
              backgroundColor: COLORS.lightGray,
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
    </>
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
    marginTop: 6,
    width: SIZES.width - 20,
    height: SIZES.width /3.3,
    backgroundColor: COLORS.lightGray4,
    paddingHorizontal: 15,

    justifyContent: "center",
  },
  actionRowView: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
    color: COLORS.blue,
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
    height: SIZES.width / 7,
    backgroundColor: COLORS.lightGray5,
    justifyContent: "center",
    alignItems: "center",
  },
  nameView: { fontSize: 18, fontWeight: "bold" },
  phoneNumber: { fontSize: 15, fontWeight: "bold" },
  addressView: { fontSize: 14, paddingVertical: 7, color: COLORS.gray1 },
  imageStyle: {
    width: 15,
    height: 20,
    opacity: 0.75,
    tintColor: COLORS.blue,
  },
  dateView: {
    fontSize: 11,
    fontWeight: "normal",
    marginTop: 5,
    color: COLORS.gray1,
  },
});

//make this component available to the app
export default Order;
