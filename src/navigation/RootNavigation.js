import React, { useEffect, useReducer, useMemo } from "react";
import AuthNavigation from "../navigation/AuthNavigation";
import { HomeNavigation } from "../navigation/HomeNavigation";
import { Provider, useSelector } from "react-redux";
import Store from "../store/Store";
import { createStackNavigator } from "@react-navigation/stack";

const AppNav = createStackNavigator();
export const AppStack = ({ state }) => {
  //console.log("state is ", state)
  return (
    <Provider store={Store}>
      <AppNav.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: false,
        }}
      >
        {state.userToken == null ? (
          <AppNav.Screen
            name="Auth"
            component={AuthNavigation}
            options={{
              //title: "Sign in",
              // When logging out, a pop animation feels intuitive
              animationTypeForReplace: state.isSignout ? "pop" : "push",
            }}
          />
        ) : (
          <AppNav.Screen name="Home" component={HomeNavigation} />
        )}
      </AppNav.Navigator>
    </Provider>
  );
};
