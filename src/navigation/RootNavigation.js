import React, { useEffect, useReducer, useMemo } from "react";
import AuthNavigation from "../navigation/AuthNavigation";
import { HomeNavigation } from "../navigation/HomeNavigation";
import { Provider, useSelector } from "react-redux";
import { store, persistor } from "../store/Store";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingDialog from "../components/LoadingDialog";
import { PersistGate } from "redux-persist/integration/react";

const AppNav = createStackNavigator();
export const AppStack = ({ state }) => {
  const renderLoading = () => <LoadingDialog loading={true} />;

  //console.log("state is ", state)
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={renderLoading()}>
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
      </PersistGate>
    </Provider>
  );
};
