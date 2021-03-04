/**
 * @format
 */
import * as React from "react";
import { AppRegistry, LogBox } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import { name as appName } from "./app.json";

export default function Main() {
  LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
