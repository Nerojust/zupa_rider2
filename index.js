/**
 * @format
 */
import * as React from "react";
<<<<<<< HEAD
import { AppRegistry, LogBox } from "react-native";
=======
import { AppRegistry } from "react-native";
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
import { Provider as PaperProvider } from "react-native-paper";
import App from "./App";
import { name as appName } from "./app.json";

export default function Main() {
<<<<<<< HEAD
  LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
=======
>>>>>>> a4200550e55f78e0d61d1bffddf20331dd979464
  return (
    <PaperProvider>
      <App />
    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
