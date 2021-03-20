//import liraries
import React from "react";
import { WelcomeScreen, LoginScreen, ForgotPasswordScreen } from "../screens";
import { createStackNavigator } from "@react-navigation/stack";

const Auth = createStackNavigator();

// create a component
const AuthScreen = ({ navigation }) => {
  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: false,
      }}
    >
      <Auth.Screen name="Welcome" component={WelcomeScreen} />
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{
          title: "Reset",
          headerShown: true,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      />
    </Auth.Navigator>
  );
};

//make this component available to the app
export default AuthScreen;
