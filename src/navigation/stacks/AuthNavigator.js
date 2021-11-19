import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { WelcomeScreen, LoginScreen, ForgotPasswordScreen } from "../../screens";
import { horizontalAnimation } from '../Animation';

const Auth = createStackNavigator();

export const AuthStackNavigator = () => {
  return (
    <Auth.Navigator
      initialRouteName="Login"
      screenOptions={horizontalAnimation}
    >
      <Auth.Screen name="Login" component={LoginScreen} />
      <Auth.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Auth.Navigator>
  );
};
