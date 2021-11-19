import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import SplashScreen from "react-native-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { AppStack } from "./src/navigation/RootNavigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Platform, StyleSheet } from "react-native";
import { COLOURS } from "./src/utils/Colours";
import { Provider } from "react-redux";
import { store } from "./src/store/root.store";

const App = () => {
  useEffect(async () => {
    setTimeout(() => SplashScreen.hide(), 1000);
  }, []);

  return (
    <NavigationContainer>
      <Provider store={store}>
        <SafeAreaProvider style={sheet.container}>
          <AppStack />
        </SafeAreaProvider>
      </Provider>
    </NavigationContainer>
  );
};

const sheet = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLOURS.white }
});

export default App;
