import {PropTypes} from 'prop-types';
import React, {Component, useState, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  UIManager,
} from 'react-native';

// Import necessary libraries

export const KeyboardObserverComponent = ({children}) => {
  const {State: TextInputState} = TextInput;
  const [shift, setShift] = useState(new Animated.Value(0));

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    const hideSubscription = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleKeyboardDidShow = (event) => {
    // Introduce a slight delay
    setTimeout(() => {
      const {height: windowHeight} = Dimensions.get('window');
      const keyboardHeight = event.endCoordinates.height;
      const currentlyFocusedFieldRef = TextInputState.currentlyFocusedInput();

      try {
        if (currentlyFocusedFieldRef) {
          currentlyFocusedFieldRef.measure(
            (originX, originY, width, height, pageX, pageY) => {
              const fieldHeight = height;
              const fieldTop = pageY;
              const gap =
                windowHeight - keyboardHeight - (fieldTop + fieldHeight);

              if (gap >= 0) {
                return;
              }

              // Use requestAnimationFrame for smoother animation
              requestAnimationFrame(() => {
                Animated.timing(shift, {
                  toValue: Platform.OS === 'ios' ? gap - 20 : gap + 60,
                  duration: 300,
                  useNativeDriver: true,
                }).start();
              });
            },
          );
        }
      } catch (error) {
        console.log('keyboard open error', error);
      }
    }, 100); // Adjust the delay as needed
  };

  const handleKeyboardDidHide = () => {
    // Introduce a slight delay
    setTimeout(() => {
      try {
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
          Animated.timing(shift, {
            toValue: 0,
            duration: 120,
            useNativeDriver: true,
          }).start();
        });
      } catch (error) {
        console.log('keyboard hide error', error);
      }
    }, 100); // Adjust the delay as needed
  };

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: shift}]}]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    left: 0,
    // position: "absolute",
    //top: 0,
    width: '100%',
  },
});
