import React from "react";
import {
    View,
    Image,
    TouchableOpacity,
    Text,
    StyleSheet
} from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"

import {  WelcomeScreen,
    LoginScreen,
    DashboardScreen,
    DeliveryScreen,
    DeliveryDetailScreen,
    DeliveryHistoryScreen } from "../screens"
import { COLORS, FONTS, icons } from "../constants"

const Tab = createBottomTabNavigator()

const Tabs = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Welcome"
                component={WelcomeScreen}
            />
            <Tab.Screen
                name="Portfolio"
                component={WelcomeScreen}
            />
            <Tab.Screen
                name="Transaction"
                component={WelcomeScreen}
            />
            <Tab.Screen
                name="Prices"
                component={WelcomeScreen}
            />
            <Tab.Screen
                name="Settings"
                component={WelcomeScreen}
            />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: COLORS.primary,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    }
})

export default Tabs;