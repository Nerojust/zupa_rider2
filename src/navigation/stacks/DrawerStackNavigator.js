import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  DashboardScreen,
  OrderDetailScreen,
  OrderHistoryDetailScreen,
  OrderHistoryScreen,
} from '../../screens';
import {horizontalAnimation} from '../Animation';
import {OrderHistoryStackNavigator} from './OrderHistoryNavigator';
import {CustomDrawerContent} from '../../components/CustomerDrawer';
import { getTodaysDate } from '../../utils/utils';
import { DrawerActions } from '@react-navigation/routers';
import { COLORS, FONTS } from '../../utils/theme';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const Drawer = createDrawerNavigator();

export const DrawerStackNavigator = ({navigation}) => {
  return (
    <Drawer.Navigator
      //initialRouteName="Dashboard"
      drawerPosition={'left'}
      drawerType={'slide'}
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
     
     
     <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          title: getTodaysDate(),
          headerShown: true,
          animationEnabled: false,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0,
            backgroundColor: COLORS.blue,
          },
          headerTintColor: COLORS.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
            fontFamily:
              Platform.OS == "android"
                ? FONTS.ROBOTO_MEDIUM
                : FONTS.ROBOTO_MEDIUM_IOS,
          },
          headerTitleAlign: "center",
          gestureEnabled: true,

          headerLeft: () => (
            <>
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.toggleDrawer());
                }}
              >
                <Image
                  source={require("../../assets/icons/menu.png")}
                  style={styles.menuIcon}
                />
              </TouchableOpacity>
            </>
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
const styles = StyleSheet.create({
  menuIcon: {
    width: 25,
    height: 25,
    marginLeft: 15,
    tintColor: COLORS.white,
  },
  chatIcon: {
    width: 20,
    height: 20,
    marginRight: 15,
    tintColor: COLORS.LIGHT_GRAY4,
  },
});