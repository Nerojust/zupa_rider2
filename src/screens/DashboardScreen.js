//import liraries
import React, { useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  BackHandler,
  SafeAreaView,
} from "react-native";
import { createOpenLink } from "react-native-open-maps";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import Order from "../components/Order";
import Order1 from "../components/Order1";
import * as Animatable from "react-native-animatable";
import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Urls";

import { useDoubleBackPressExit } from "../utils/utils";
import { useSelector } from "react-redux";

import {
  dialNumber,
  getReadableDateAndTime,
  getValue,
  handleError,
} from "../utils/utils";
import DoubleTapToClose from "../components/BackToExit";

// create a component
const DashboardScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [isJourneyStarted, setIsJourneyStarted] = useState(false);
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");
  const fullURL = GET_RIDER_REQUESTS + "/?status=pending";
  let name = "Nerojust Adjeks";
  let phone = "08012345678";
  let address = "Necom House";
  const travelType = "drive";

  const [orderArray, setOrderArray] = useState([]);
  const [isResultOrderEmpty, setIsResultOrderEmpty] = useState(false);
  const loginData = useSelector((state) => state.login.loginResults);

  useEffect(() => {
    if (loginData.jwt) {
      getOrders();
    }
  }, [loginData.jwt]);

  // useDoubleBackPressExit(() => {
  //   // user has pressed "back" twice. Do whatever you want!
  //   console.log("close now");
  //   BackHandler.exitApp();
  // });

  // const isCurrentScreenInitialOne = (state) => {
  //   const route = state.routes[state.index];
  //   if (route.state) {
  //     // Dive into nested navigators
  //     return isCurrentScreenInitialOne(route.state);
  //   }
  //   return state.index === 0;
  // };

  const showLoader = () => {
    setIsLoading(true);
  };
  const dismissLoader = () => {
    setIsLoading(false);

    setRefreshing(false);
  };
  const onRefresh = useCallback(() => {
    setOrderArray([]);

    getOrders();
  }, []);

  const renderBatchList = (item, data) => {
    if (item.order) {
      let address1 =
        item.order && item.order.customer
          ? item.order.customer.address
          : address;
      //console.log("address1", address1)
      let end = address1;
      return (
        <Order
          name={item.order.customer.name ? item.order.customer.name : name}
          address={item.order.customer ? item.order.customer.address : address}
          phoneNumber={
            item.order.customer ? item.order.customer.phoneNumber : phone
          }
          status={item.status}
          date={getReadableDateAndTime(item.updatedAt)}
          onPressNavigate={createOpenLink({
            travelType,
            end,
            provider: "google",
          })}
          onPressCall={() =>
            dialNumber(
              item.order.customer ? item.order.customer.phoneNumber : phone
            )
          }
          onPressView={() =>
            navigation.navigate("OrderDetails", {
              id: item.id,
              name: item.order.customer ? item.order.customer.name : name,
              address: item.order.customer
                ? item.order.customer.address
                : address,
              phoneNumber: item.order.customer
                ? item.order.customer.phoneNumber
                : phone,
              status: item.status,
              date: item.updatedAt,
              parentId: data.id,
            })
          }
        />
      );
    }
  };
  const renderItem = (data) => {
    if (data.dispatch_orders && data.dispatch_orders.length > 1) {
      return (
        <FlatList
          data={data.dispatch_orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => renderBatchList(item, data)}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                  backgroundColor: COLORS.blue1,
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    color: COLORS.white,
                    //marginBottom: 50,
                    fontFamily:
                      Platform.OS == "ios"
                        ? FONTS.ROBOTO_MEDIUM_IOS
                        : FONTS.ROBOTO_MEDIUM,
                  }}
                >
                  Batch Order
                </Text>
                {!isOrderLoading && data.status == "pending" ? (
                  <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                      console.log("batch start id is", data.id);
                      handleStartJourneyDialog(data.id);
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLORS.white,
                        fontFamily:
                          Platform.OS == "ios"
                            ? FONTS.ROBOTO_MEDIUM_IOS
                            : FONTS.ROBOTO_MEDIUM,
                      }}
                    >
                      Start
                    </Text>
                  </TouchableOpacity>
                ) : !isOrderLoading && data.status == "started" ? (
                  <TouchableOpacity activeOpacity={0.8}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: COLORS.white,
                        fontFamily:
                          Platform.OS == "ios"
                            ? FONTS.ROBOTO_MEDIUM_IOS
                            : FONTS.ROBOTO_MEDIUM,
                      }}
                    >
                      In progress
                    </Text>
                  </TouchableOpacity>
                ) : null}
                {/* {isOrderLoading ? (
                  <ActivityIndicator size="small" color={COLORS.white} />
                ) : null} */}
              </View>
            </>
          }
        />
      );
    }

    let item = data.dispatch_orders ? data.dispatch_orders[0] : {};

    if (item.order) {
      let address1 =
        item.order && item.order.customer
          ? item.order.customer.address
          : address;
      //console.log("address1", address1)
      let end = address1;
      return (
        <Order1
          name={item.order.customer.name ? item.order.customer.name : name}
          address={item.order.customer ? item.order.customer.address : address}
          phoneNumber={
            item.order.customer ? item.order.customer.phoneNumber : phone
          }
          status={item.status}
          date={getReadableDateAndTime(item.updatedAt)}
          onPressNavigate={createOpenLink({
            travelType,
            end,
            provider: "google",
          })}
          onPressCall={() =>
            dialNumber(
              item.order.customer ? item.order.customer.phoneNumber : phone
            )
          }
          statusMessage={data.status}
          isJourneyStarted={isJourneyStarted}
          isOrderLoading={isOrderLoading}
          pressStart={() => {
            console.log("Start id is", data.id);
            handleStartJourneyDialog(data.id);
          }}
          onPressView={() =>
            navigation.navigate("OrderDetails", {
              id: item.id,
              name: item.order.customer ? item.order.customer.name : name,
              address: item.order.customer
                ? item.order.customer.address
                : address,
              phoneNumber: item.order.customer
                ? item.order.customer.phoneNumber
                : phone,
              status: item.status,
              date: item.updatedAt,
              parentId: data.id,
            })
          }
        />
      );
    }
  };
  const handleStartJourneyDialog = (data_id) => {
    Alert.alert(
      "Trip Alert",
      "Do you want to start this trip?",
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
            console.log("Start id is", data_id);
            startJourneyRequest(data_id);
          },
        },
      ],
      { cancelable: true }
    );
  };
  const getOrders = () => {
    setLoadingMessage("Fetching your orders for today...");
    setTimeout(() => {
      showLoader();
    }, 0);

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
            if (responseJson.length > 0) {
              //newOrderList.push(responseJson);
              // var completeCount = 0;
              // for (let i = 0; i < responseJson.length; i++) {
              //   const element = responseJson[i];
              //   if(element.status != "completed"){
              //     newOrderList.push(element)
              //   }
              //   // for (let j = 0; j < element.dispatch_orders.length; j++) {
              //   //   const childDispatch = element.dispatch_orders[j];
              //   //   if (element.dispatch_orders.length == 1) {
              //   //     if (childDispatch.status != "completed") {
              //   //       newOrderList.push(element);
              //   //     }
              //   //   }
              //   //   if (element.dispatch_orders.length >1) {
              //   //     if (childDispatch.status != "completed") {
              //   //       newOrderList.push(element);
              //   //     }
              //   //   }
              //   // }
              // }

              setOrderArray(responseJson);
              setLoadingMessage("");
              if (orderArray) {
                dismissLoader();
              }
            } else {
              setIsResultOrderEmpty(true);
            }
            // console.log("new array is ", newArray);
          } else {
            alert(responseJson.message);
          }
        } else {
          alert(responseJson.message);
        }
        setRefreshing(false);
        dismissLoader();
        setLoadingMessage("");
      })
      .catch((error) => {
        console.log("error block", error);
        handleError(error);
        setRefreshing(false);

        setLoadingMessage("");
        dismissLoader();
      });
    dismissLoader();
  };
  const startJourneyRequest = (dispatchId) => {
    setLoadingMessage("Starting trip for this order");
    setIsLoading(true);
    fetch(GET_RIDER_REQUESTS + "/" + dispatchId, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + loginData.jwt,
      },
      body: JSON.stringify({
        status: "started",
        model: "dispatch",
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (!responseJson.code) {
            setLoadingMessage("");
            getOrders();
          } else {
            dispatch(setError(responseJson.message));
          }
        } else {
          dispatch(setError(responseJson.message));
        }
        setIsLoading(false);
        setLoadingMessage("");
      })
      .catch((error) => {
        handleError(error);
        setIsLoading(false);
        setLoadingMessage("");
        console.log("start journey error: ", error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      {/* <DoubleTapToClose /> */}
      <LoadingDialog loading={isLoading} message={loadingMessage} />

      <>
        {!isLoading && orderArray && orderArray.length > 0 ? (
          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              marginHorizontal: 5,
              marginBottom: 5,
              fontFamily:
                Platform.OS == "ios"
                  ? FONTS.ROBOTO_MEDIUM_IOS
                  : FONTS.ROBOTO_MEDIUM,
            }}
          >
            Hi, {loginData.rider.name},{"\n"} you have new order/s
          </Text>
        ) : null}

        {orderArray && orderArray.length > 0 ? (
          <Animatable.View
            animation="fadeInUp"
            duraton="500"
            style={{ flex: 1 }}
          >
            <FlatList
              data={orderArray}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item, index) => item.id + index}
              renderItem={({ item, index }) => renderItem(item)}
              showsVerticalScrollIndicator={false}
            />
          </Animatable.View>
        ) : isResultOrderEmpty ? (
          <View style={styles.parentView}>
            <Text style={styles.nameTextview}>
              Hello {loginData.rider.name}!
            </Text>

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
      </>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: "center",
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
