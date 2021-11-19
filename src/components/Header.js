import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Animated,
  CheckBox,
  Image,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import ProductSansBold from '../components/Text/ProductSansBold';
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';
import {SIZES} from '../utils/Fonts';
import {IMAGES} from '../utils/Images';
import {deviceHeight, fp} from '../utils/responsive-screen';
import MontserratMedium from './Text/MontserratMedium';

export const BackViewHeader = ({
  onClose,
  onLeftPress,
  backText,
  shouldDisplayIcon,
  handleLogout,
  style,
  image,
}) => {
  return (
    <View style={[styles.exitView]}>
      <TouchableOpacity
        onPress={onLeftPress}
        style={{flex: 0.2, paddingLeft: 15}}>
        <Image
          source={image}
          resizeMode={'contain'}
          style={{width: 25, height: 18}}
        />
      </TouchableOpacity>
      <MontserratMedium
        style={{fontSize: fp(18), flex: 1.3, color: COLOURS.gray2}}
        numberOfLines={1}>
        {backText}
      </MontserratMedium>

      <View
        style={{
          flexDirection: 'row',
          flex: 0.2,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {shouldDisplayIcon ? (
          <TouchableOpacity
            activeOpacity={0.4}
            style={style}
            onPress={handleLogout}>
            <Image
              source={IMAGES.zupaLogo}
              resizeMode={'contain'}
              style={{width: 25, height: 25}}
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
