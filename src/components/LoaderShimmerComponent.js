import React from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import Shimmer from 'react-native-shimmer';
import {COLOURS} from '../utils/Colours';
import {deviceHeight, deviceWidth, fp} from '../utils/responsive-screen';
import ProductSansBold from './Text/ProductSansBold';

const LoaderShimmerComponent = ({
  isLoading,
  isFullScreen,
  loadingMessage,
  extraMessage,
}) => {
  if (isLoading) {
    return (
      <View style={[styles.container, isFullScreen && {height: deviceHeight}]}>
        <Shimmer
          animating={isLoading}
          duration={2000}
          direction={'right'}
          opacity={0.03}
          animationOpacity={1}>
          <ProductSansBold
            style={{color: COLOURS.textInputColor, fontSize: fp(15)}}>
            Please wait while we
          </ProductSansBold>
        </Shimmer>
        <Shimmer
          animating={isLoading}
          duration={2000}
          direction={'right'}
          opacity={0.02}
          animationOpacity={1}>
          <ProductSansBold
            style={{color: COLOURS.textInputColor, fontSize: fp(15)}}>
            {loadingMessage || 'load your data'}
          </ProductSansBold>
        </Shimmer>
        <Shimmer
          animating={isLoading}
          duration={2000}
          direction={'right'}
          opacity={0.02}
          animationOpacity={1}>
          <ProductSansBold
            style={{color: COLOURS.textInputColor, fontSize: fp(15)}}>
            {extraMessage}
          </ProductSansBold>
        </Shimmer>
      </View>
    );
  }
  return null;
};
const styles = StyleSheet.create({
  container: {
    //bottom: 10,
    height: deviceHeight,
    width: deviceWidth,
    backgroundColor: 'rgba(255,255,255,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});

export default LoaderShimmerComponent;
