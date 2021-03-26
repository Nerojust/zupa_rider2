import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "./src/utils/Context";
import { deleteValue, getValue, storeValue } from "./src/utils/utils";
import { Platform } from "react-native";

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "RESTORE_TOKEN":
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case "SIGN_IN":
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case "SIGN_OUT":
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );
  const [stateToken, setStateToken] = useState("");

  let loginDataApp = {};
  useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place

    const getDataFromStorage = async () => {
      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');

        getValue("loginState").then((result) => {
          loginDataApp = JSON.parse(result);
          if (loginDataApp) {
            let userToken = loginDataApp.jwt;
            //console.log("token inside is ", userToken);
            setStateToken(userToken);
          }
        });
      } catch (e) {
        // Restoring token failed
        console.log("error restoring", e);
      }

      // After restoring token, we may need to validate it in production apps
      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      if (stateToken) {
        Platform.OS === "ios"
          ? console.log("State token is refreshed for IOS")
          : console.log("State token is refreshed for Android");

        dispatch({ type: "RESTORE_TOKEN", token: stateToken });
      }
    };

    getDataFromStorage();

    setTimeout(() => {
      SplashScreen.hide();
    }, 150);
  }, [stateToken]);

  //console.log("Login state is ", loginState);
  const authContext = React.useMemo(
    () => ({
      signIn: async (responseJson) => {
        // In a production app, we need to send some data (usually username, password) to server and get a token
        // We will also need to handle errors if sign in failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: responseJson.jwt });
        storeValue("loginState", responseJson);
      },
      signOut: () => {
        dispatch({ type: "SIGN_OUT" });
        deleteValue("loginState");
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: "SIGN_IN", token: "dummy-auth-token" });
      },
    }),

    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <SafeAreaProvider>
          <AppStack state={state} />
        </SafeAreaProvider>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
