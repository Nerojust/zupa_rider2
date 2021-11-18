import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  DashboardScreen,
  OrderDetailScreen,
  OrderHistoryDetailScreen,
  OrderHistoryScreen,
} from '../../screens';
import {horizontalAnimation} from '../Animation';

const OrderHistory = createStackNavigator();

export const OrderHistoryStackNavigator = () => {
  return (
    <OrderHistory.Navigator
      initialRouteName="OrderHistory"
      screenOptions={horizontalAnimation}>
      <OrderHistory.Screen name="OrderHistory" component={OrderHistoryScreen} />
      <OrderHistory.Screen name="OrderHistoryDetails" component={OrderHistoryDetailScreen} />
    
    </OrderHistory.Navigator>
  );
};
