//import liraries
import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  OrdersScreen,
  OrderDetailScreen,
  OrderHistoryScreen,
} from "../screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { CustomDrawerContent } from "../components/CustomerDrawer";
import {
  createDrawerNavigator,
  useIsDrawerOpen,
} from "@react-navigation/drawer";
import { COLORS, FONTS } from "../utils/theme";
import { DrawerActions } from "@react-navigation/native";
const Drawer = createDrawerNavigator();
const Home = createStackNavigator();
const OrderStack = createStackNavigator();

const DashboardStackScreen = ({ navigation }) => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Home.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />
    </Home.Navigator>
  );
};
const OrdersStackScreen = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerShown: false,
        headerStyle: {
          backgroundColor: COLORS.appGreen,
        },
        headerTintColor: COLORS.white,
        headerTitleStyle: {
          fontWeight: "normal",
        },
      }}
    >
      <OrderStack.Screen
        name="Orders"
        component={OrdersScreen}
        options={{
          title: "Orders",
        }}
      />
      <OrderStack.Screen
        name="OrderDetails"
        component={OrdersDetails}
        options={{
          title: "Order Details",
          animationEnabled: false,
        }}
      />
    </OrderStack.Navigator>
  );
};

// create a component
export const HomeNavigation = ({ navigation }) => {
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return date + "-" + month + "-" + year; //format: dd-mm-yyyy;
  };
  let date = getCurrentDate();
  console.log("date", date);
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerPosition={"left"}
      drawerType={"slide"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          title: new Date().toDateString(),
          headerShown: true,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 23,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() =>
                  navigation.dispatch(DrawerActions.toggleDrawer())
                }
              >
                <Image
                  source={require("../assets/icons/menu.png")}
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </>
          ),
        }}
      />
      <Drawer.Screen name="Orders" component={OrdersStackScreen} />
      <Drawer.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  menuIcon: {
    width: 25,
    height: 25,
    marginLeft: 15,
    tintColor: COLORS.white,
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    tintColor: COLORS.LIGHT_GRAY4,
  },
});
