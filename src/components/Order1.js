//import liraries
import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {COLOURS} from '../utils/Colours';
import {SIZES} from '../utils/Sizes';
import MontserratSemiBold from './Text/MontserratSemiBold';
import {deviceWidth, fp, hp} from '../utils/responsive-screen';
import MontserratBold from './Text/MontserratBold';
import {IMAGES} from '../utils/Images';
import MontserratMedium from './Text/MontserratMedium';

// create a component
const Order1 = ({
  name,
  address,
  phoneNumber,
  status,
  onPressNavigate,
  onPressCall,
  onPressView,
  date,
  pressStart,
  statusMessage,
}) => {
  return (
    <View style={styles.containerView}>
      {/* header row */}
      <View style={styles.countView}>
        <MontserratSemiBold style={styles.orderCountText}>
          1 Order
        </MontserratSemiBold>

        {statusMessage == 'pending' ? (
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={pressStart}
            style={styles.startRideView}>
            <MontserratSemiBold style={styles.startRideText}>
              Start ride
            </MontserratSemiBold>
          </TouchableOpacity>
        ) : statusMessage == 'started' ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.inProgressView}>
            <MontserratSemiBold style={styles.inProgressText}>
              In progress
            </MontserratSemiBold>
          </TouchableOpacity>
        ) : null}
      </View>

      {/* card details section */}
      <TouchableOpacity
        style={styles.mainView(statusMessage)}
        onPress={onPressView}
        activeOpacity={0.6}>
        <View style={styles.nameViewContainer}>
          <MontserratBold numberOfLines={3} style={[styles.nameView]}>
            {name}
          </MontserratBold>

          {status == 'completed' ? (
            <Image
              source={IMAGES.successImage}
              resizeMode={'contain'}
              style={styles.completedImage}
            />
          ) : null}
        </View>

        <MontserratMedium style={styles.addressView} numberOfLines={3}>
          {address}
        </MontserratMedium>

        <MontserratMedium style={styles.phoneNumber}>
          {phoneNumber}
        </MontserratMedium>

        <View style={styles.timeClickView}>
          <MontserratSemiBold style={styles.dateView}>
            {date}
          </MontserratSemiBold>

          {/* location */}
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 38,
              backgroundColor: COLOURS.circleBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 90,
            }}
            onPress={onPressNavigate}>
            <Image
              source={IMAGES.location}
              resizeMode={'contain'}
              style={{
                width: 17,
                height: 17,
              }}
            />
          </TouchableOpacity>

          {/* call icon */}
          <TouchableOpacity
            style={{
              width: 44,
              height: 44,
              borderRadius: 38,
              backgroundColor: COLOURS.circleBg,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 20,
            }}
            onPress={onPressCall}>
            <Image
              source={IMAGES.call}
              resizeMode={'contain'}
              style={{
                width: 17,
                height: 17,
              }}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  containerView: {
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mainView: (statusMessage) => ({
    width: deviceWidth * 0.88,
    height: hp(170),
    paddingLeft: 20,
    backgroundColor: statusMessage == 'started' ? COLOURS.blue : COLOURS.white,
    borderRadius: 20,
    paddingHorizontal: 10,
    justifyContent: 'center',
    paddingBottom: 20,
  }),
  actionRowView: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
    color: COLOURS.blue,
  },
  timeClickView: {
    flexDirection: 'row',
    flex: 0.2,
    alignItems: 'center',
  },
  inProgressView: {
    width: 70,
    height: 25,
    backgroundColor: COLOURS.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  orderCountText: {
    fontSize: fp(15),
    color: COLOURS.riderTextColour,
    flex: 1,
  },
  countView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  startRideView: {
    width: 80,
    height: 30,
    backgroundColor: COLOURS.blue,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  startRideText: {
    fontSize: fp(13),
    color: COLOURS.white,
  },
  inProgressText: {
    fontSize: fp(12),
    color: COLOURS.blue,
  },
  completedImage: {
    width: 20,
    height: 20,
    opacity: 0.75,
    alignSelf: 'flex-end',
  },
  iconImageView: {
    flexDirection: 'row',
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  clickButtonView: {
    flex: 0.5,
    width: SIZES.width - 20,
    height: SIZES.width / 8,
    backgroundColor: COLOURS.lightGray5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameViewContainer: {
    flexDirection: 'row',
    marginTop: 7,
    justifyContent: 'space-between',
    flex: 0.25,
  },
  nameView: {fontSize: fp(19), fontWeight: 'bold'},
  phoneNumber: {fontSize: fp(16), flex: 0.2},
  addressView: {
    fontSize: fp(15),
    paddingVertical: 5,
    color: COLOURS.gray1,
    flex: 0.2,
  },
  imageStyle: {
    width: 15,
    height: 20,
    opacity: 0.75,
    tintColor: COLOURS.blue,
  },
  dateView: {
    fontSize: fp(15),
    fontWeight: 'normal',
    marginTop: 3,
    color: COLOURS.gray1,
  },
});

//make this component available to the app
export default Order1;
