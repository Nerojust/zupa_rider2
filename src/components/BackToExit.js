import * as React from "react";
import { useEffect, useState } from "react";
import { Platform, BackHandler, ToastAndroid } from "react-native";

export const ExecuteDoubleTapAndroid = (props) => {
  const { message } = props;
  const [exitApp, setExitApp] = useState(0);
  
  const backAction = () => {
    setTimeout(() => {
      setExitApp(0);
    }, 2000); // 2 seconds to tap second-time

    if (exitApp === 0) {
      setExitApp(exitApp + 1);

      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else if (exitApp === 1) {
      BackHandler.exitApp();
    }
    return true;
  };
//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener(
//       "hardwareBackPress",
//       backAction
//     );
//     return () => backHandler.remove();
//   });


useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", backAction);
  });
  return <></>;
};

export default function DoubleTapToClose(props) {
  const { message = "Press back again to exit" } = props;
  return Platform.OS !== "ios" ? (
    <ExecuteDoubleTapAndroid message={message} />
  ) : (
    <></>
  );
}
