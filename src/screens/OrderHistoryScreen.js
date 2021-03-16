//import liraries
import React, { Component, useEffect, useCallback, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Button,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import Dialog, {
  DialogFooter,
  DialogButton,
  DialogContent,
  SlideAnimation,
  DialogTitle,
} from "react-native-popup-dialog";
import { createOpenLink } from "react-native-open-maps";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import Order from "../components/Order";
import * as Animatable from "react-native-animatable";
import { useDispatch } from "react-redux";
import LoadingDialog from "../components/LoadingDialog";
import { GET_RIDER_REQUESTS } from "../utils/Urls";
import { useSelector } from "react-redux";
import DatePicker from "react-native-datepicker";
import NoConnection from "../components/NoConnection";
import {
  checkNetworkConnection,
  dialNumber,
  getReadableDateAndTime,
  getTodaysDate,
  handleBackPress,
  handleError,
  isNetworkAvailable,
} from "../utils/utils";
import { saveOrder, saveSearchState } from "../store/Actions";
// create a component
const OrderHistoryScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const loginData = useSelector((state) => state.login.loginResults);
  //console.log("login data is ", loginData)
  var isSearch = useSelector((state) => state.search.isSearchClicked);
  //console.log("redux search", isSearch);
  var dataArray = useSelector((state) => state.orders.orders);
  //console.log("dashboard redux is", dataArray);
  const [isNetworkAvailable, setisNetworkAvailable] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  let todaysDate = new Date();

  let name = "Nerojust Adjeks";
  let phone = "08012345678";
  let address = "Necom House";
  const travelType = "drive";
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [orderArray, setOrderArray] = useState([]);
  const [isResultOrderEmpty, setIsResultOrderEmpty] = useState(false);

  useEffect(() => {
    getOrders();
  }, []);

  //handleBackPress();

  const showLoader = () => {
    setIsLoading(true);
  };
  const dismissLoader = () => {
    setIsLoading(false);
  };
  const onRefresh = useCallback(() => {
    setOrderArray([]);
    getOrders();
  }, []);
  const renderItem = (data) => {
    let item = data.dispatch_orders[0];
    //console.log("Item is ", item);

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
            navigation.navigate("OrderHistoryDetails", {
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
            })
          }
        />
      );
    }
  };
  const getOrders = (url) => {
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
    let urlAdd = url ? url : "/?status=completed";
    let fullUrl = GET_RIDER_REQUESTS + urlAdd;
    console.log("url is", fullUrl);
    fetch(fullUrl, requestOptions)
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson) {
          if (!responseJson.code) {
            if (responseJson.length > 0) {
              console.log("Array size is", responseJson.length);
              setOrderArray(responseJson);
              if (orderArray) {
                dismissLoader();
              }
            } else {
              setIsResultOrderEmpty(true);
            }
            if (refreshing) {
              setRefreshing(false);
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
      })
      .catch((error) => {
        console.log("error", error);
        handleError(error);
        setRefreshing(false);
      });
    dismissLoader();
  };
  const handleDismissDialog = () => {
    if (isDialogVisible) {
      setIsDialogVisible(false);
    }
  };
  const handleRefreshPage = () => {
    getOrders();
  };
  const handleSearch = () => {
    if (startDate != "" && startDate != null) {
      if (endDate != "" && endDate != null) {
        if (startDate.localeCompare(endDate)) {
          setOrderArray([]);
          setIsDialogVisible(false);
          showLoader();

          setTimeout(() => {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", "Bearer " + loginData.jwt);

            var requestOptions = {
              method: "GET",
              headers: myHeaders,
              redirect: "follow",
            };

            fetch(
              GET_RIDER_REQUESTS +
                "/?status=completed&startDate=" +
                startDate +
                "&endDate=" +
                endDate,
              requestOptions
            )
              .then((response) => response.json())
              .then((responseJson) => {
                if (responseJson) {
                  if (!responseJson.code) {
                    if (responseJson.length > 0) {
                      console.log(
                        "Date query array length is",
                        responseJson.length
                      );
                      console.log("Date query array is", responseJson);
                      setOrderArray(responseJson);
                      if (orderArray) {
                        dismissLoader();
                      }
                    } else {
                      console.log("Result is empty for search");
                      setOrderArray([]);
                      setIsResultOrderEmpty(true);
                    }
                    if (refreshing) {
                      setRefreshing(false);
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
              })
              .catch((error) => {
                console.log("error", error);
                handleError(error);
                setRefreshing(false);
              });
            dismissLoader();
          }, 0);

          setTimeout(() => {
            dismissLoader();
          }, 0);
          setStartDate("");
          setEndDate("");
        } else {
          alert("Both dates can not be the same");
        }
      } else {
        alert("End date is required");
      }
    } else {
      alert("Start date is required");
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      <LoadingDialog loading={isLoading} message={"Fetching your orders..."} />

      <Dialog
        visible={isDialogVisible}
        dialogAnimation={
          new SlideAnimation({
            slideFrom: "top",
          })
        }
        onTouchOutside={handleDismissDialog}
        dialogTitle={
          <Text
            style={{
              alignSelf: "center",
              fontSize: 15,
              paddingVertical: 20,
              fontWeight: "bold",
            }}
          >
            Select Date Range
          </Text>
        }
        footer={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                color: COLORS.gray,
                alignSelf: "center",
                fontWeight: "bold",
              }}
              onPress={handleDismissDialog}
            >
              Cancel
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: COLORS.blue,
                alignSelf: "center",
              }}
              onPress={handleSearch}
            >
              Search
            </Text>
          </View>
        }
      >
        <DialogContent>
          <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            <View
              style={{
                marginRight: 10,
                height: 50,
                backgroundColor: COLORS.lightGray1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <DatePicker
                style={{ width: 100 }}
                date={startDate}
                mode="date"
                placeholder="Start date"
                format="YYYY-MM-DD"
                minDate="2020-01-01"
                androidMode={"spinner"}
                maxDate={todaysDate}
                confirmBtnText="Confirm"
                showIcon={false}
                cancelBtnText="Cancel"
                customStyles={{
                  // dateIcon: {
                  //   position: "absolute",
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  // },
                  dateInput: {
                    borderColor: COLORS.transparent,
                  },
                }}
                onDateChange={(date) => {
                  setStartDate(date);
                }}
              />
            </View>
            <View
              style={{
                marginLeft: 10,
                height: 50,
                backgroundColor: COLORS.lightGray1,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 5,
              }}
            >
              <DatePicker
                style={{ width: 100 }}
                date={endDate}
                mode="date"
                placeholder="End date"
                format="YYYY-MM-DD"
                minDate="2020-01-01"
                androidMode={"spinner"}
                maxDate={todaysDate}
                confirmBtnText="Confirm"
                showIcon={false}
                cancelBtnText="Cancel"
                customStyles={{
                  // dateIcon: {
                  //   position: "absolute",
                  //   left: 0,
                  //   top: 4,
                  //   marginLeft: 0,
                  // },
                  dateInput: {
                    borderColor: COLORS.transparent,
                  },
                }}
                onDateChange={(date) => {
                  setEndDate(date);
                }}
              />
            </View>
          </View>
        </DialogContent>
      </Dialog>

      <>
        {!isLoading && orderArray && orderArray.length > 0 ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              paddingVertical: 15,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                flex: 1,
                marginLeft: 15,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.gray1,
                  marginRight: 3,
                  fontFamily:
                    Platform.OS == "ios"
                      ? FONTS.ROBOTO_MEDIUM_IOS
                      : FONTS.ROBOTO_MEDIUM,
                }}
              >
                Total count:
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily:
                    Platform.OS == "ios"
                      ? FONTS.ROBOTO_MEDIUM_IOS
                      : FONTS.ROBOTO_MEDIUM,
                }}
              >
                {orderArray.length}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => setIsDialogVisible(true)}
              style={{
                flex: 0.5,
                flexDirection: "row",
                justifyContent: "center",
              }}
              activeOpacity={0.75}
            >
              <Text
                style={{
                  color: COLORS.gray1,
                  marginRight: Platform.OS == "ios" ? 5 : 10,
                  fontSize: 13,
                }}
              >
                Search
              </Text>
              <Image
                source={require("../assets/icons/search.png")}
                style={styles.searchIcon}
              />
            </TouchableOpacity>
          </View>
        ) : null}

        {!isLoading && orderArray && orderArray.length > 0 ? (
          <Animatable.View
            animation="fadeInUp"
            duraton="1500"
            style={{ flex: 1 }}
          >
            <FlatList
              data={orderArray}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item) => item.dispatch_orders[0].id}
              renderItem={({ item, index }) => renderItem(item)}
              initialNumToRender={2}
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
              No record found
            </Text>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                width: 100,
                height: 50,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: COLORS.blue,
                borderRadius: 10,
                marginTop: 20,
              }}
              onPress={() => handleRefreshPage()}
            >
              <Text style={styles.refreshTextview}>Refresh</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </>
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
  refreshTextview: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    color: COLORS.white,
  },
  nameTextview: {
    fontSize: 18,
    fontWeight: "400",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    flex: 0.5,
  },
  searchIcon: {
    width: 19,
    height: 19,
    // alignSelf: "flex-end",
    tintColor: COLORS.lightGray3,
  },
});

//make this component available to the app
export default OrderHistoryScreen;
