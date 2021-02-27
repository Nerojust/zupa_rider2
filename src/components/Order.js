//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

import { COLORS, FONTS, SIZES } from "../utils/theme";
import CardView from "react-native-cardview";

// create a component
const Order = ({
  name,
  address,
  phoneNumber,
  status,
  onPressNavigate,
  onPressCall,
}) => {
  return (
    <CardView
      cardElevation={3}
      cardMaxElevation={2}
      cornerRadius={5}
      style={{ marginBottom: 15 }}
    >
      <View style={styles.bg_view}>
        <View style={styles.mainView}>
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
            {!status ? (
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
            ) : (
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
        </View>

        <View style={{ flex: 0.5 }}>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.clickButtonView}
              onPress={onPressNavigate}
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
                justifyContent: "center", alignItems: "center",
              }}
            />
            <TouchableOpacity
              style={styles.clickButtonView}
              onPress={onPressCall}
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
      </View>
    </CardView>
  );
};

// define your styles
const styles = StyleSheet.create({
  parentView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    //paddingHorizontal: 10,
  },
  bg_view: {
    width: SIZES.width - 20,
    height: SIZES.width / 2.4,
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },
  mainView: {
    paddingTop: 10,
    paddingHorizontal: 15,
    flex: 1,
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
});

//make this component available to the app
export default Order;
