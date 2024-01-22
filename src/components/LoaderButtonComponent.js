// import libraries
import React from 'react';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLOURS} from '../utils/Colours';
import {deviceWidth, fp} from '../utils/responsive-screen';

// create a component
const LoaderButtonComponent = ({
  buttonRef,
  title,
  method,
  bgColour,
  radius,
}) => {
  const buttonWidth = deviceWidth / 1.15;
  const animationDurationWidth = Platform.OS === 'ios' ? 500 : 600;

  return (
    <TouchableOpacity onPress={() => method()} activeOpacity={0.6}>
      <AnimateLoadingButton
        ref={(c) => (buttonRef.current = c)}
        width={buttonWidth}
        height={50}
        title={title}
        titleFontFamily={'Montserrat-Bold'}
        titleFontSize={fp(15)}
        titleColor={COLOURS.white}
        activityIndicatorColor={COLOURS.white}
        backgroundColor={bgColour}
        borderRadius={radius}
        animationDurationWidth={animationDurationWidth}
      />
    </TouchableOpacity>
  );
};

// set default props
LoaderButtonComponent.defaultProps = {
  bgColour: COLOURS.blue,
  radius: 10,
};

// make this component available to the app
export default LoaderButtonComponent;
