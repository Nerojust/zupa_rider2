import "react-native-gesture-handler";
import React, { useEffect, useReducer, useMemo } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext } from "./src/utils/Context";
import { initialState } from "./src/store/State";
import { loginReducer } from "./src/store/reducers/LoginReducer";

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  //returns the new state and a dispatch action
  const [loginState, dispatch] = useReducer(loginReducer, initialState);
  //console.log("Login state is ", loginState);
  const authContext = useMemo(
    () => ({
      signIn: async (responseJson) => {
        //details passed from signinscreen
        dispatch({
          type: "LOGIN",
          token: responseJson.jwt,
        });
      },

      signOut: async () => {
        dispatch({
          type: "LOGOUT",
          token: null,
          //isLoggedIn: false,
        });
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
