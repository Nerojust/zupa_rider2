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
<<<<<<< HEAD
  OrderHistoryDetailScreen,
=======
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
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
<<<<<<< HEAD
import { getTodaysDate, handleBackPress } from "../utils/utils";
const Drawer = createDrawerNavigator();
const Home = createStackNavigator();
const History = createStackNavigator();

const DrawerStackScreen = ({ navigation }) => {
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      drawerPosition={"left"}
      drawerType={"slide"}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: getTodaysDate(),
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
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

      {/* <Drawer.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          title: "Order History",
          animationEnabled: false,
        }}
      /> */}
    </Drawer.Navigator>
  );
};
const HistoryStackScreen = ({ navigation }) => {
  return (
    <History.Navigator
      screenOptions={{
        headerShown: true,
        animationEnabled: false,
      }}
    >
      <History.Screen
        name="OrderHistory"
        component={OrderHistoryScreen}
        options={{
          title: "Rider History",
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
        }}
      />
      <History.Screen
        name="OrderHistoryDetails"
        component={OrderHistoryDetailScreen}
        options={{
          title: "History Details",
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
        }}
      />
    </History.Navigator>
  );
};
// create a component
export const HomeNavigation = ({ navigation }) => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: true,
        animationEnabled: false,
      }}
    >
      <Home.Screen
        name="Dashboard"
        component={DrawerStackScreen}
        options={{
          title: "Dashboard",
          headerShown: false,
        }}
      />
      <Home.Screen
        name="OrderDetails"
        component={OrderDetailScreen}
        options={{
          title: "Order Details",
=======
import { getTodaysDate } from "../utils/utils";
const Drawer = createDrawerNavigator();
const Home = createStackNavigator();
const OrderStack = createStackNavigator();

const DashboardStackScreen = ({ navigation }) => {
  return (
    <Home.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Home.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: "Dashboard",
        }}
      />
      <Home.Screen name="Orders" component={OrdersStackScreen} />
      <Home.Screen name="OrderHistory" component={OrderHistoryScreen} />
    </Home.Navigator>
  );
};
const OrdersStackScreen = () => {
  return (
    <OrderStack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
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
        component={OrderDetailScreen}
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
          title: getTodaysDate(),
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
<<<<<<< HEAD
        }}
      />
      <Home.Screen
        name="OrderHistory"
        component={HistoryStackScreen}
        options={{
          title: "Rider History",
          headerShown: false,
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
        }}
      />
    </Home.Navigator>
=======
          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
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
    </Drawer.Navigator>
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
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
