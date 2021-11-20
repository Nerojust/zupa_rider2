//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,TouchableOpacity,Image } from 'react-native';

// create a component
const CircleImageComponent = ({image, onPress,style}) => {
    return (
        <TouchableOpacity
            style={[styles.locationView,{...style}]}
            onPress={onPress}>
            <Image
              source={image}
              resizeMode={'contain'}
              style={{
                width: 17,
                height: 17,
              }}
            />
          </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    locationView:{
        width: 44,
        height: 44,
        borderRadius: 38,
    
        alignItems: 'center',
        justifyContent: 'center',
        //marginLeft: 80,
      },
});

//make this component available to the app
export default CircleImageComponent;
