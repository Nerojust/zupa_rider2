import "react-native-gesture-handler";
import React, { useEffect } from "react";
import {
  WelcomeScreen,
  LoginScreen,
  DashboardScreen,
  DeliveryScreen,
  DeliveryDetailScreen,
  DeliveryHistoryScreen,
} from "./src/screens";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "react-native-splash-screen";
import Tabs from "./src/navigation/tabs";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"Welcome"}
      >
        <Stack.Screen name="Welcome" component={Tabs} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
