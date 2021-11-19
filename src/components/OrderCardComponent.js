//import liraries
import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {COLOURS} from '../utils/Colours';
import {SIZES} from '../utils/Sizes';
import MontserratSemiBold from './Text/MontserratSemiBold';
import {deviceWidth, fp, hp} from '../utils/responsive-screen';
import MontserratBold from './Text/MontserratBold';
import {IMAGES} from '../utils/Images';
import MontserratMedium from './Text/MontserratMedium';

// create a component
const OrderCardComponent = ({
  name,
  address,
  phoneNumber,
  status,
  onPressNavigate,
  onPressCall,
  onPressView,
  date,
  statusMessage,
}) => {
  return (
    <View style={styles.containerView}>
      {/* card details section */}
      <TouchableOpacity
        style={styles.mainView(statusMessage)}
        onPress={onPressView}
        activeOpacity={0.6}>
        <View style={styles.nameViewContainer}>
          <MontserratBold
            numberOfLines={3}
            style={styles.nameText(statusMessage)}>
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

        <MontserratMedium
          style={styles.addressView(statusMessage)}
          numberOfLines={4}>
          {address}
        </MontserratMedium>

        <MontserratMedium style={styles.phoneNumber(statusMessage)}>
          {phoneNumber}
        </MontserratMedium>

        <View style={styles.timeClickView}>
          <MontserratSemiBold style={styles.dateView(statusMessage)}>
            {date}
          </MontserratSemiBold>

          {/* location */}
          <TouchableOpacity
            style={styles.locationView(statusMessage)}
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
            style={styles.callView(statusMessage)}
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
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  mainView: (statusMessage) => ({
    width: deviceWidth * 0.88,
    height: hp(185),
    backgroundColor: statusMessage == 'started' ? COLOURS.blue : COLOURS.white,
    borderRadius: 43,
    paddingHorizontal: 30,
    justifyContent: 'center',
    paddingBottom: 20,
    paddingTop: 10,
  }),
  locationView: (statusMessage) => ({
    width: 44,
    height: 44,
    borderRadius: 38,
    backgroundColor:
      statusMessage == 'started' ? COLOURS.circleBg : COLOURS.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
  }),
  callView: (statusMessage) => ({
    width: 44,
    height: 44,
    borderRadius: 38,
    backgroundColor:
      statusMessage == 'started' ? COLOURS.circleBg : COLOURS.lightPurple,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 20,
  }),
  actionRowView: {
    fontSize: 14,
    marginRight: 12,
    color: COLOURS.blue,
  },
  timeClickView: {
    flexDirection: 'row',
    flex: 0.4,
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
  nameViewContainer: {
    flexDirection: 'row',
    marginTop: 7,
    justifyContent: 'space-between',
    flex: 0.2,
  },
  nameText: (statusMessage) => ({
    fontSize: fp(18),
    color: statusMessage == 'started' ? COLOURS.white : COLOURS.textInputColor,
  }),
  phoneNumber: (statusMessage) => ({
    fontSize: fp(17),
    flex: 0.2,
    color:
      statusMessage == 'started' ? COLOURS.lightGray : COLOURS.textInputColor,
  }),
  addressView: (statusMessage) => ({
    fontSize: fp(14),
    paddingVertical: 5,
    color: statusMessage == 'started' ? COLOURS.white : COLOURS.textInputColor,
    flex: 0.5,
  }),
  dateView: (statusMessage) => ({
    fontSize: fp(14),
    color: statusMessage == 'started' ? COLOURS.white : COLOURS.textInputColor,
  }),
});

//make this component available to the app
export default OrderCardComponent;
