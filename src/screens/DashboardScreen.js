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
import Order from "../components/Order";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";
import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Urls";
import { useSelector } from "react-redux";
import call from "react-native-phone-call";
import { handleBackPress, handleError } from "../utils/utils";
import { saveOrder } from "../store/Actions";
// create a component
const DashboardScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const loginData = useSelector((state) => state.login.loginResults);
  //console.log("login data is ", loginData)
  var dataArray = useSelector((state) => state.orders.orders);
  //console.log("dashboard redux is", dataArray);
  let newArray = [];
  let responseArray = dataArray;

  for (const item in responseArray) {
    if (Object.hasOwnProperty.call(responseArray, item)) {
      const data = responseArray[item];
      if (data.status == "pending") {
        //console.log("data o", data);
        newArray.push(data);
      }
    }
  }
  let name = "Nerojust Adjeks";
  let phone = "08012345678";
  let address = "Necom House";
  const travelType = "drive";

  const [orderArray, setOrderArray] = useState([]);
  const [isResultOrderEmpty, setIsResultOrderEmpty] = useState(false);

  useEffect(() => {
    showLoader();
    setTimeout(() => {
      getOrders();
      dismissLoader();
    }, 2000);
  }, [isResultOrderEmpty]);

  //handleBackPress();

  const showLoader = () => {
    setIsLoading(true);
  };
  const dismissLoader = () => {
    setIsLoading(false);
  };
  const onRefresh = useCallback(() => {
    //setRefreshing(true);
    newArray.length = 0;
    //setOrderArray([]);
    showLoader();
    setTimeout(() => {
      getOrders();
      dismissLoader();
      setRefreshing(false);
    }, 2000);
    setRefreshing(false);
  }, []);

  const dialNumber = (phoneNumber) => {
    const args = {
      number: phoneNumber, // String value with the number to call
      prompt: true, // Optional boolean property. Determines if the user should be prompt prior to the call
    };

    call(args).catch(console.error);
  };
  const renderItem = (item) => {
    let address1 = item.order.deliveryLocation
      ? item.order.deliveryLocation.address
      : address;
    //console.log("address1", address1)
    let end = address1;
    return (
      <Order
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
        onPressNavigate={createOpenLink({
          travelType,
          end,
          provider: "google",
        })}
        onPressCall={() =>
          dialNumber(
            item.order.recipient ? item.order.recipient.phoneNumber : phone
          )
        }
        onPressView={() =>
          navigation.navigate("OrderDetails", {
            //screen: "OrderDetails",
            id: item.id,
            name: item.order.recipient ? item.order.recipient.name : name,
            address: item.order.deliveryLocation
              ? item.order.deliveryLocation.address
              : address,
            phoneNumber: item.order.recipient
              ? item.order.recipient.phoneNumber
              : phone,
            status: item.order.status,
          })
        }
      />
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
            //newArray.length = 0;
            //dispatch(saveOrder(responseJson[0].dispatch_orders));

            setOrderArray(responseJson[0].dispatch_orders);

            setRefreshing(false);
            //console.log("new array is ", newArray);
          } else {
            alert(responseJson.message);
          }
        } else {
          alert(responseJson.message);
        }
        setRefreshing(false);
        // dismissLoader();
      })
      .catch((error) => {
        console.log("error", error);
        handleError(error);
        //dismissLoader();
        setRefreshing(false);
      });
    // dismissLoader();
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <LoadingDialog
        loading={isLoading}
        message={"Fetching your orders for today..."}
      />

      {!isLoading && orderArray && orderArray.length > 0 ? (
        <Text
          style={{
            fontSize: 15,
            paddingVertical: 20,
            marginHorizontal: 20,
            fontFamily:
              Platform.OS == "ios"
                ? FONTS.ROBOTO_MEDIUM_IOS
                : FONTS.ROBOTO_MEDIUM,
          }}
        >
          Hi, {loginData.rider.name},{"\n"} you have new order/s
        </Text>
      ) : null}

      {!isLoading && orderArray.length > 0 ? (
        <Animatable.View animation="fadeIn" duraton="1500" style={{ flex: 1 }}>
          <FlatList
            data={orderArray}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item) => item.order.id}
            renderItem={({ item, index }) => renderItem(item)}
            showsVerticalScrollIndicator={false}
          />
        </Animatable.View>
      ) : !isLoading && orderArray.length == 0 ? (
        <View style={styles.parentView}>
          <Text style={styles.nameTextview}>Hello {loginData.rider.name}!</Text>

          <Image
            source={require("../assets/images/rider.png")}
            resizeMode={"contain"}
            style={styles.image}
          />
          <Text style={styles.noOrderTextview}>
            You have no orders {"\n"} assigned for today
          </Text>
        </View>
      ) : null}
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
    height: SIZES.width / 3,
  },
  noOrderTextview: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    //marginTop:50
  },
  nameTextview: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    flex: 0.5,
  },
});

//make this component available to the app
export default DashboardScreen;
