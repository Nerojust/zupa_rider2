//import liraries
import React, { Component, useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
} from "react-native";

import { createOpenLink } from "react-native-open-maps";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import Order1 from "../components/Order1";

import { useDispatch } from "react-redux";
import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Urls";
import { useSelector } from "react-redux";
import call from "react-native-phone-call";
import { getReadableDateAndTime, getTodaysDate, handleError } from "../utils/utils";
import { saveOrder } from "../store/Actions";
// create a component
const OrderHistoryScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const loginData = useSelector((state) => state.login.loginResults);
  //console.log("login data is ", loginData)
  var dataArray = useSelector((state) => state.orders.orders);
  console.log("order redux is", dataArray);
  let newArray = [];
  for (const item in dataArray) {
    if (Object.hasOwnProperty.call(dataArray, item)) {
      const data = dataArray[item];
      //console.log("data o", data)
      if (data.status != "pending") newArray.push(data);
    }
  }
  //console.log("new array",newArray)

  let name = "Nerojust Adjeks";
  let phone = "08012345678";
  let address = "Necom House";
  let end = address;
  const travelType = "drive";

  const showLoader = () => {
    setIsLoading(true);
  };
  const dismissLoader = () => {
    setIsLoading(false);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    //showLoader();
    dispatch(saveOrder([]));
    getOrders();
    dismissLoader();
    setRefreshing(false);
  }, []);

  const renderItem = (item) => {
    return (
      <TouchableOpacity activeOpacity={0.4}>
        <Order1
          name={item.order.recipient ? item.order.recipient.name : name}
          address={
            item.order.deliveryLocation
              ? item.order.deliveryLocation.address
              : address
          }
          phoneNumber={
            item.order.recipient ? item.order.recipient.phoneNumber : phone
          }
          status={item.status}
          date={getTodaysDate(item.updatedAt)}
          onPressNavigate={openLocation}
          onPressCall={() =>
            dialNumber(
              item.order.recipien ? item.order.recipien.phoneNumber : phone
            )
          }
          onPressView={() =>
            navigation.navigate("OrderHistoryDetails", {
              id: item.order.id,
              name: item.order.recipient ? item.order.recipient.name : name,
              address: item.order.deliveryLocation
                ? item.order.deliveryLocation.address
                : address,
              phoneNumber: item.order.recipient
                ? item.order.recipient.phoneNumber
                : phone,
              status: item.status,
            })
          }
        />
      </TouchableOpacity>
    );
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
            dispatch(
              saveOrder(
                responseJson[0].dispatch_distribution.dispatches[0]
                  .dispatch_orders
              )
            );
            //console.log("data array ", dataArray);
          } else {
            alert(responseJson.message);
          }
        } else {
          alert(responseJson.message);
        }
        setRefreshing(false);
        dismissLoader();
      })
      .catch((error) => {
        console.log("error", error);
        handleError(error);
        dismissLoader();
        setRefreshing(false);
      });
    dismissLoader();
  };

  const dialNumber = (phoneNumber) => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };

  const openLocation = createOpenLink({ travelType, end, provider: "google" });

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <LoadingDialog loading={isLoading} />

      {newArray && newArray.length > 0 ? (
        <FlatList
          data={newArray}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          keyExtractor={(item) => item.order.id}
          renderItem={({ item, index }) => renderItem(item)}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.parentView}>
          <Text style={styles.nameTextview}>Hi, {loginData.rider.name}!</Text>

          <Image
            source={require("../assets/images/rider.png")}
            resizeMode={"contain"}
            style={styles.image}
          />
          <Text style={styles.noOrderTextview}>You have no order history</Text>
        </View>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
  parentView: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 10,
  },
  bg_view: {
    width: SIZES.width - 20,
    height: SIZES.width / 2.4,
    backgroundColor: COLORS.white,
    justifyContent: "center",
  },
  mainView: { padding: 13, flex: 0.7, justifyContent: "center" },
  actionRowView: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 12,
    color: COLORS.blue,
  },
  iconImageView: {
    flexDirection: "row",
    flex: 1,
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
  addressView: { fontSize: 14, paddingVertical: 7 },
  imageStyle: {
    width: 15,
    height: 20,
    opacity: 0.75,
    tintColor: COLORS.blue,
  },
  image: {
    top: -100,
    width: SIZES.width,
    height: SIZES.width / 2.5,
  },
  noOrderTextview: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    //marginTop:50
  },
  nameTextview: {
    fontSize: 18,
    fontWeight: "500",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    flex: 0.5,
  },
});

//make this component available to the app
export default OrderHistoryScreen;
