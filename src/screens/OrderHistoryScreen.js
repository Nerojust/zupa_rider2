//import liraries
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { COLORS, FONTS, SIZES } from "../utils/theme";
import Order from "../components/Order";
// create a component
const OrderHistoryScreen = ({ navigation }) => {
  const dataArray = [
    {
      id: 1,
      name: "Mr Okon ",
      address: "address here",
      phoneNumber: "0809379793794",
      status: true,
    },
    {
      id: 2,
      name: "Baratiit 1",
      address: "address here",
      phoneNumber: "0809379793794",
      status: true,
    },
    {
      id: 3,
      name: "Nerojust 2",
      address: "address here",
      phoneNumber: "0809379793794",
      status: true,
    },
    {
      id: 4,
      name: "Nerojust 3",
      address: "address here",
      phoneNumber: "0809379793794",
      status: true,
    },
  ];
  const renderItem = ({ item }) => (
    <Order
      name={item.name}
      address={item.address}
      phoneNumber={item.phoneNumber}
      status={item.status}
      onPressNavigate={() => Alert.alert("clicked")}
      onPressCall={() => Alert.alert("clicked")}
    />
  );
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={COLORS.blue}
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
      />
      {dataArray.length > 1 ? (
        <FlatList
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <View style={styles.parentView}>
          <Text style={styles.nameTextview}>Hello Lawrence!</Text>

          <Image
            source={require("../assets/images/rider.png")}
            resizeMode={"contain"}
            style={styles.image}
          />
          <Text style={styles.noOrderTextview}>
            You have no orders assigned for today
          </Text>
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
    fontSize: 23,
    fontWeight: "500",
    fontFamily:
      Platform.OS == "ios" ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
    flex: 0.5,
  },
});

//make this component available to the app
export default OrderHistoryScreen;
