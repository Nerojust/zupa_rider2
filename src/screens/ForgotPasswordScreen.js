//import liraries
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  SafeAreaView,
} from 'react-native';
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';
import {SIZES} from '../utils/Sizes';
import email from 'react-native-email';
import ViewProviderComponent from '../components/ViewProviderComponent';
import {BackViewHeader} from '../components/Header';
import {deviceWidth, fp} from '../utils/responsive-screen';
import {IMAGES} from '../utils/Images';
import MontserratMedium from '../components/Text/MontserratMedium';
import MontserratBold from '../components/Text/MontserratBold';

// create a component
const ForgotPasswordScreen = ({navigation}) => {
  const sendEmail = () => {
    const to = ['hello@zupa.ng']; // string or array of email addresses
    email(to, {
      // Optional additional arguments
      // cc: ["bazzy@moo.com", "doooo@daaa.com"], // string or array of email addresses
      // bcc: "mee@mee.com", // string or array of email addresses
      subject: '',
      body: '',
    }).catch(console.error);
  };
  return (
    <ViewProviderComponent>
      <BackViewHeader
        backText={'Reset Password'}
        image={IMAGES.arrowLeft}
        onLeftPress={() => navigation.goBack()}
        style={{width: deviceWidth, borderBottomWidth: 0}}
      />
    
        <View style={{marginTop: 30, paddingHorizontal:30}}>
          <MontserratMedium
            style={{
              color: COLOURS.textInputColor,
              fontSize: fp(15),
              textAlign: 'center',
            }}>
            To get a new password, please send an email to our admin using the
            email address below.
          </MontserratMedium>
          <TouchableOpacity activeOpacity={0.6} onPress={sendEmail}>
            <MontserratBold
              style={{
                //flex: 0.7,
                color: COLOURS.blue,
                marginTop: 20,
                fontSize: fp(18),
                alignSelf: 'center',
              }}>
              hello@zupa.ng
            </MontserratBold>
          </TouchableOpacity>
        </View>
      
    </ViewProviderComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOURS.zupa_rider_bg,
  },
  parentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //width: SIZES.width - 70,

    marginHorizontal: 35,
  },
  logoImage: {width: Platform.OS == 'ios' ? 190 : 170, height: 40},
  emailAndPasswordView: {
    alignSelf: 'center',
    marginTop: 10,
  },
  toggleView: {
    backgroundColor: COLOURS.lightGray5,
    flex: 0.2,
    justifyContent: 'center',
    top: 10,
    left: -1,
    height: 50,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  signUp: {
    color: COLOURS.blue,
    fontSize: 15,
    fontWeight: '300',
    alignSelf: 'center',
    fontFamily:
      Platform.OS == 'ios' ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
  },
  passwordRowView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  signRowView: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  forgotPasswordView: {
    color: COLOURS.primary,
    marginTop: 30,
    fontSize: 14,
    alignSelf: 'flex-end',
    fontFamily:
      Platform.OS == 'ios' ? FONTS.ROBOTO_MEDIUM_IOS : FONTS.ROBOTO_MEDIUM,
  },
});

//make this component available to the app
export default ForgotPasswordScreen;
