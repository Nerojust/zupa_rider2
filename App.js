import "react-native-gesture-handler";
import React, { useEffect, useReducer, useMemo } from "react";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { HomeNavigation } from "./src/navigation/HomeNavigation";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import Store from "./src/store/Store";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "./src/utils/Context";
import { initialState } from "./src/store/State";
import { loginReducer } from "./src/store/reducers/LoginReducer";
import { deleteValue, storeValue } from "./src/utils/utils";
import { LoginScreen } from "./src/screens";

const AppNav = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const AppStack = ({ userToken }) => {
    return (
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
  };

  //returns the new state and a dispatch action
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  console.log("Login state is ", loginState);
  const authContext = useMemo(
    () => ({
      signIn: async (responseJson) => {
        //details passed from signinscreen
        dispatch({
          type: "LOGIN",
          token: responseJson.jwt,
        });
        storeValue("loginstate", {
          isLoggedIn: true,
          loginPayload: responseJson,
        });
      },

      signOut: async () => {
        dispatch({
          type: "LOGOUT",
          token: null,
          //isLoggedIn: false,
        });
        deleteValue("loginstate");
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppStack userToken={loginState.userToken} />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
