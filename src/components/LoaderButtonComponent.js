//import liraries
import React, {Component} from 'react';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';
import {Platform} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOURS} from '../utils/Colours';
import {deviceWidth} from '../utils/responsive-screen';

// create a component
const LoaderButtonComponent = ({buttonRef, title, method,bgColour,radius=10}) => {
  return (
    <TouchableOpacity onPress={method.bind(this)} activeOpacity={0.6}>
      <AnimateLoadingButton
        ref={(c) => (buttonRef.current = c)}
        width={deviceWidth / 1.15}
        height={50}
        title={title}
        onPress={null}
        titleFontFamily={'Montserrat-Bold'}
        titleFontSize={RFValue(14)}
        titleColor={COLOURS.white}
        activityIndicatorColor={COLOURS.white}
        backgroundColor={bgColour}
        borderRadius={radius}
        animationDurationWidth={Platform.OS == 'ios' ? 500 : 600}
      />
    </TouchableOpacity>
  );
};

//make this component available to the app
export default LoaderButtonComponent;
