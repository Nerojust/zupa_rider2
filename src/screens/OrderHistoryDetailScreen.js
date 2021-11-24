//import liraries
import React, {Component, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Button,
  Platform,
  Alert,
  SafeAreaView,
} from 'react-native';
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';
import {SIZES} from '../utils/Sizes';
import DisplayButton from '../components/Button1';
import SendSMS from 'react-native-sms';
import call from 'react-native-phone-call';
import openMap from 'react-native-open-maps';
import {createOpenLink} from 'react-native-open-maps';
import {dialNumber, getTodaysDate} from '../utils/utils';
import ViewProviderComponent from '../components/ViewProviderComponent';
import {BackViewHeader} from '../components/Header';
import {deviceWidth, fp} from '../utils/responsive-screen';
import {IMAGES} from '../utils/Images';
import MontserratSemiBold from '../components/Text/MontserratSemiBold';
import CircleImageComponent from '../components/CircleImage';
import LoaderButtonComponent from '../components/LoaderButtonComponent';

// create a component
const OrderHistoryDetailScreen = ({route, navigation}) => {
  const name = route.params.name;
  const address = route.params.address;
  const phoneNumber = route.params.phoneNumber;
  const status = route.params.status;
  const date = route.params.date;
  var loadingButtonRef = useRef();
  const orderId = route.params.id;
  console.log('order id', orderId);
  const parentId = route.params.parentId;
  const parentStatus = route.params.parentStatus;
  //console.log("parent status ", parentStatus);
  console.log('parent id ', parentId);
  const end = address;
  const travelType = 'drive';
  const [hasDataLoaded, setHasDataLoaded] = useState(false);
  const openLocation = createOpenLink({travelType, end, provider: 'google'});

  const sendWhatsappMessage = () => {
    let whatsAppMessage = `Hello ${name} I will be delivering your package today. Please be on standby. Thank you`;
    let URL =
      'whatsapp://send?text=' + whatsAppMessage + '&phone=234' + phoneNumber;

    Linking.openURL(URL)
      .then((data) => {
        console.log('WhatsApp Opened', data);
      })
      .catch((error) => {
        alert('Oops! seems whatsapp is not installed on your device');
        console.log('No whatsapp app found', error);
      });
  };

  const sendTextMessage = () => {
    SendSMS.send(
      {
        body: `Hello ${name}, I will be delivering your package today. Please be on standby. Thank you`,
        recipients: [phoneNumber],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
      },
      (completed, cancelled, error) => {
        console.log(
          'SMS Callback: completed: ' +
            completed +
            ' cancelled: ' +
            cancelled +
            ' error: ' +
            error,
        );
      },
    );
  };

  const renderOrderDetails = () => {
    return (
      <View
        style={{
          //flex: 1,
          marginTop: 15,
          paddingHorizontal: 30,
        }}>
        <MontserratSemiBold style={{fontSize: fp(15), color: COLOURS.gray5}}>
          Customer Name
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{
            fontSize: fp(17),
            color: COLOURS.textInputColor,
            marginTop: 3,
          }}>
          {name}
        </MontserratSemiBold>
        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 13}}>
          Date
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{
            fontSize: fp(15),
            color: COLOURS.textInputColor,
            marginTop: 4,
          }}>
          {getTodaysDate(date)}
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 15}}>
          Location
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{
            fontSize: fp(15),
            color: COLOURS.textInputColor,
            marginTop: 4,
          }}>
          {address}
        </MontserratSemiBold>

        <MontserratSemiBold
          style={{fontSize: fp(15), color: COLOURS.gray5, marginTop: 17}}>
          Phone Number
        </MontserratSemiBold>
        <MontserratSemiBold
          style={{fontSize: 15, color: COLOURS.textInputColor, marginTop: 4}}>
          {phoneNumber}
        </MontserratSemiBold>
      </View>
    );
  };
  const renderActionbuttons = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={openLocation}
            style={{
              //flex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 30,
            }}>
            <CircleImageComponent
              image={IMAGES.location}
              onPress={openLocation}
              style={{
                backgroundColor: COLOURS.lightPurple,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Navigate
            </MontserratSemiBold>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => dialNumber(phoneNumber)}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              right: 20,
            }}>
            <CircleImageComponent
              image={IMAGES.call}
              onPress={() => dialNumber(phoneNumber)}
              style={{
                backgroundColor: COLOURS.lightPurple,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Call
            </MontserratSemiBold>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 30,
          }}>
          <TouchableOpacity
            onPress={sendTextMessage}
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'center',

              marginLeft: 30,
            }}>
            <CircleImageComponent
              image={IMAGES.text}
              isText
              onPress={sendTextMessage}
              style={{
                backgroundColor: COLOURS.lightPurple,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Text
            </MontserratSemiBold>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={sendWhatsappMessage}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              //justifyContent: 'center',
              flex: 1,
              //right: 20,
            }}>
            <CircleImageComponent
              image={IMAGES.whatsapp}
              onPress={sendWhatsappMessage}
              isWhatsapp
              style={{
                backgroundColor: COLOURS.green,
                marginRight: 10,
              }}
            />
            <MontserratSemiBold style={{color: COLOURS.zupaBlue}}>
              Whatsapp
            </MontserratSemiBold>
          </TouchableOpacity>
        </View>
      </>
    );
  };
  const renderCompleteButtons = () => {
    return (
      <>
        {parentStatus == 'completed' && status == 'completed' ? (
          <View style={{marginTop: 30}}>
            <LoaderButtonComponent
              buttonRef={loadingButtonRef}
              title={'Completed'}
              method={() => null}
              bgColour={COLOURS.green3}
              radius={30}
            />
          </View>
        ) : null}
      </>
    );
  };
  return (
    <ViewProviderComponent>
      <BackViewHeader
        backText={'History Details'}
        image={IMAGES.arrowLeft}
        onLeftPress={() => navigation.goBack()}
        // style={{width: deviceWidth, borderBottomWidth: 0}}
      />
      <>
        {renderOrderDetails()}
        {renderActionbuttons()}
        {renderCompleteButtons()}
      </>
    </ViewProviderComponent>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLOURS.zupa_rider_bg,
  },
});

//make this component available to the app
export default OrderHistoryDetailScreen;
