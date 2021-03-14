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
  quantityPress,
}) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", marginBottom: 10 }}>
      <View>
        <TouchableWithoutFeedback style={styles.mainView} onPress={onPressView}>
          <View style={styles.nameViewContainer}>
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
      <TouchableOpacity
        onPress={quantityPress}
        activeOpacity={0.7}
        style={{
          top: Platform.OS == "ios" ? -105 : -100,
          left:
            Platform.OS == "ios" ? SIZES.width / 2 + 103 : SIZES.width / 2 + 97,
        }}
      >
        {/* <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              color: COLORS.gray1,
              fontWeight: "300",
              marginRight: 7,
              fontSize: 14,
            }}
          >
            Qty
          </Text>
          <View
            style={{
              width: 20,
              height: 20,
              alignSelf: "flex-end",
              borderRadius: 10,
              borderWidth: 0.5,
              justifyContent: "center",
              alignItems: "center",
              borderColor: COLORS.blue,
              backgroundColor: COLORS.blue,
            }}
          >
            <Text style={{ color: COLORS.white, fontWeight: "bold" }}>3</Text>
          </View>
        </View> */}
      </TouchableOpacity>
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
    backgroundColor: COLORS.lightGray4,
    paddingHorizontal: 15,
    justifyContent: "center",
    flex: 1,
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
    height: SIZES.width / 8,
    backgroundColor: COLORS.lightGray5,
    justifyContent: "center",
    alignItems: "center",
  },
  nameViewContainer: {
    flexDirection: "row",
    marginTop: 7,
    flex: 0.6,
  },
  nameView: { fontSize: 16, fontWeight: "bold" },
  phoneNumber: { fontSize: 15, fontWeight: "bold", flex: 0.5 },
  addressView: {
    fontSize: 13,
    paddingVertical: 5,
    color: COLORS.gray1,
    //flex: 1,
  },
  imageStyle: {
    width: 15,
    height: 20,
    opacity: 0.75,
    tintColor: COLORS.blue,
  },
  dateView: {
    fontSize: 11,
    fontWeight: "normal",
    marginTop: 3,
    color: COLORS.gray1,
    flex: 0.4,
  },
});

//make this component available to the app
export default Order;
