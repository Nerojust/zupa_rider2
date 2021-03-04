
import React, { useEffect, useReducer, useMemo } from "react";
import AuthNavigation from "../navigation/AuthNavigation";
import { HomeNavigation } from "../navigation/HomeNavigation";
import { Provider, useSelector } from "react-redux";
import Store from "../store/Store";
import { createStackNavigator } from "@react-navigation/stack";

const AppNav = createStackNavigator();
export const AppStack = ({ userToken }) => (
  <Provider store={Store}>
    <AppNav.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      {userToken ? (
        <AppNav.Screen name="Home" component={HomeNavigation} />
      ) : (
        <AppNav.Screen name="Auth" component={AuthNavigation} />
      )}
    </AppNav.Navigator>
  </Provider>
);
