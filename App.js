import "react-native-gesture-handler";
import React, { useEffect } from "react";
import AuthNavigation from "./src/navigation/AuthNavigation";
import {HomeNavigation} from "./src/navigation/HomeNavigation";
import SplashScreen from "react-native-splash-screen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

const AppNav = createStackNavigator();
const AppStack = ({navigation}) => (
  <NavigationContainer>
    <AppNav.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AppNav.Screen name="Auth" component={AuthNavigation} />
      <AppNav.Screen name="Home" component={HomeNavigation} />
    </AppNav.Navigator>
  </NavigationContainer>
);

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return <AppStack />;
};

export default App;
