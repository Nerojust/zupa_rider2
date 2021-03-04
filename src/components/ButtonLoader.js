import React, { PureComponent, useRef, useCallback } from "react";
import { View } from "react-native";
import AnimateLoadingButton from "react-native-animate-loading-button";

const LoadingButton = (props) => {
  const loadingButton = useRef();

  const _onPressHandler = useCallback(() => {
    loadingButton.current.showLoading(true); // mock

    setTimeout(() => {
      loadingButton.current.showLoading(false);
    }, 2000);
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "rgb(255,255,255)",
        justifyContent: "center",
      }}
    >
      <AnimateLoadingButton
        ref={(c) => (loadingButton.current = c)}
        width={300}
        height={50}
        title="BUTTON"
        titleFontSize={16}
        titleColor="rgb(255,255,255)"
        backgroundColor="rgb(29,18,121)"
        borderRadius={4}
        onPress={_onPressHandler.bind(this)}
      />
    </View>
  );
};

export default LoadingButton;
