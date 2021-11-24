import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {COLOURS} from '../utils/Colours';
import {IMAGES} from '../utils/Images';
import {deviceHeight, fp} from '../utils/responsive-screen';
import MontserratBold from './Text/MontserratBold';
import MontserratSemiBold from './Text/MontserratSemiBold';

export const BackViewHeader = ({
  onClose,
  onLeftPress,
  onRightPress,
  backText,
  shouldDisplayIcon = false,
  handleLogout,
  style,
  imageRight = IMAGES.zupaLogo,
  image,
  imageStyle,
}) => {
  return (
    <View style={[styles.exitView]}>
      <TouchableOpacity
        onPress={onLeftPress}
        style={{flex: 0.2, paddingLeft: 15}}>
        <Image
          source={image}
          resizeMode={'contain'}
          style={{width: 21, height: 21}}
        />
      </TouchableOpacity>
      <MontserratBold
        style={{fontSize: fp(19), flex: 1.3, color: COLOURS.textInputColor}}
        numberOfLines={1}>
        {backText}
      </MontserratBold>

      <View
        style={{
          flexDirection: 'row',
          flex: 0.25,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {shouldDisplayIcon ? (
          <TouchableOpacity
            activeOpacity={0.4}
            style={style}
            onPress={onRightPress}>
            <Image
              source={imageRight}
              resizeMode={'contain'}
              style={[
                {width: 20, height: 20, tintColor: COLOURS.gray4},
                imageStyle,
              ]}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exitText: {
    fontSize: 18,
    color: COLOURS.textInputColor,
    flex: 0.9,
  },
  exitView: {
    flexDirection: 'row',
    // paddingLeft: wp(40),
    paddingVertical: Platform.OS == 'android' ? deviceHeight * 0.02 : 13,
    alignItems: 'center',
    backgroundColor: COLOURS.white,
    borderBottomWidth: 0.4,
    borderBottomColor: COLOURS.lightGray,
  },
});
