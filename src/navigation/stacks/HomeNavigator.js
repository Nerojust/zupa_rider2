import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DashboardScreen,
  OrderDetailScreen,
  OrderHistoryDetailScreen,
  OrderHistoryScreen,
} from '../../screens';
import {horizontalAnimation} from '../Animation';
import {OrderHistoryStackNavigator} from './OrderHistoryNavigator';
import { DrawerStackNavigator } from './DrawerStackNavigator';

const Home = createStackNavigator();

export const HomeStackNavigator = () => {
  return (
    <Home.Navigator
      initialRouteName="Dashboard"
      screenOptions={horizontalAnimation}>
      <Home.Screen name="Dashboard" component={DrawerStackNavigator} />
      <Home.Screen name="OrderDetails" component={OrderDetailScreen} />
      <Home.Screen name="OrderHistory" component={OrderHistoryStackNavigator} />
    </Home.Navigator>
  );
};
