//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {COLOURS} from '../utils/Colours';

// create a component
const CircleImageComponent = ({
  image,
  onPress,
  isText = false,
  style,
  isWhatsapp = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.locationView, {...style}]}
      onPress={onPress}>
      {isWhatsapp ? (
        <Image
          source={image}
          resizeMode={'contain'}
          style={{
            width: 19,
            height: 19,
            tintColor: COLOURS.white,
          }}
        />
      ) : isText ? (
        <Image
          source={image}
          resizeMode={'contain'}
          style={{
            width: 19,
            height: 19,
            tintColor:COLOURS.blue
          }}
        />
      ) : (
        <Image
          source={image}
          resizeMode={'contain'}
          style={{
            width: 17,
            height: 17,
          }}
        />
      )}
    </TouchableOpacity>
  );
};

// define your styles
const styles = StyleSheet.create({
  locationView: {
    width: 44,
    height: 44,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//make this component available to the app
export default CircleImageComponent;
