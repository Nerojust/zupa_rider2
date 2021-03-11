/**
 * @format
 */
import * as React from "react";
import { AppRegistry, LogBox } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

export default function Main() {
  LogBox.ignoreLogs([
    "Animated: `useNativeDriver`",
    "Warning: DatePickerIOS has been merged with DatePickerAndroid and will be removed in a future release",
    "Warning: componentWillReceiveProps has been renamed",
  ]);
  return <App />;
}

AppRegistry.registerComponent(appName, () => Main);
