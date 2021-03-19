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
    "Warning: DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release",
    "Warning: componentWillReceiveProps has been renamed",
    "Require cycle: node_modules/react-native-popup-dialog/dist/type.js",
    "Require cycle: node_modules/react-native/Libraries/Network/fetch.js"
  ]);
  return <App />;
}

AppRegistry.registerComponent(appName, () => Main);
