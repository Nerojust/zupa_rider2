//import liraries
import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';
import {SIZES} from '../utils/Sizes';
import {AuthContext} from '../utils/Context';
import {useDispatch} from 'react-redux';
import TogglePasswordEye from '../components/TogglePassword';
import TextInputComponent from '../components/TextInputComponent';
import AnimateLoadingButton from 'react-native-animate-loading-button';
import TextInputComponent2 from '../components/TextInputComponent2';

import ViewProviderComponent from '../components/ViewProviderComponent';
import {login} from '../store/actions/users';

// create a component
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState('08000000000');
  const [password, setPassword] = useState('2729');
  const phoneNumberRef = useRef(null);
  const pinRef = useRef(null);
  const [securePassword, setSecurePassword] = useState(true);
  const loadingButton = useRef();

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
  };
  const handlePin = (value) => {
    setPassword(value);
  };
  const togglePassword = () => {
    setSecurePassword(!securePassword);
  };

  const gotoForgotPasswordPage = () => {
    navigation.push('ForgotPassword');
  };

  const handleRefFocus = () => {
    pinRef.current.focus();
  };
  const dismissLoader = () => {
    if (loadingButton.current) {
      loadingButton.current.showLoading(false);
    }
  };
  const showLoader = () => {
    loadingButton.current.showLoading(true);
  };

  const makeLoginRequest = () => {
    //validate entry
    if (!phoneNumber || !password) {
      return alert('please enter your phone number and password');
    }
    var payload = {
      phoneNumber: phoneNumber,
      pin: password,
    };
    showLoader();
    dispatch(login(payload));
    dismissLoader();
  };

  // const getOrders = (token, loginData) => {
  //   var myHeaders = new Headers();
  //   myHeaders.append('Content-Type', 'application/json');
  //   myHeaders.append('Authorization', 'Bearer ' + token);

  //   var requestOptions = {
  //     method: 'GET',
  //     headers: myHeaders,
  //     redirect: 'follow',
  //   };
  //   fetch(GET_RIDER_REQUESTS, requestOptions)
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       if (responseJson) {
  //         if (!responseJson.code) {
  //           var newOrderList = [];
  //           for (let i = 0; i < responseJson.length; i++) {
  //             const element = responseJson[i];
  //             if (element.status != 'completed') {
  //               newOrderList.push(element);
  //             }
  //           }
  //           dispatch(saveOrder(newOrderList));
  //           console.log('login orders saved to redux');
  //           if ((loginData && newOrderList) || loginData) {
  //             dismissLoader();
  //             dispatch(loginUser(loginData));
  //             signIn(loginData);
  //           }
  //         } else {
  //           alert(responseJson.message);
  //         }
  //       } else {
  //         alert(responseJson.message);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //       dismissLoader();
  //       handleError(error);
  //     });
  // };

  return (
    <ViewProviderComponent>
      <ImageBackground
        source={require('../assets/images/auth_bg.png')}
        style={styles.image}>
        <View style={styles.parentView}>
          <Image
            source={require('../assets/icons/zupa.png')}
            resizeMode={'contain'}
            style={styles.logoImage}
          />

          <View style={styles.emailAndPasswordView}>
            <TextInputComponent
              placeholder={'Phone number'}
              handleTextChange={handlePhoneNumber}
              defaultValue={phoneNumber}
              refInput={phoneNumberRef}
              onSubmitEditing={handleRefFocus}
              keyboardType={'email-address'}
              secureTextEntry={false}
              returnKeyType="next"
            />
            <View style={styles.passwordRowView}>
              <View
                style={{
                  flex: 1,
                }}>
                <TextInputComponent2
                  placeholder={'Password'}
                  handleTextChange={handlePin}
                  defaultValue={password}
                  refInput={pinRef}
                  keyboardType={'default'}
                  returnKeyType="done"
                  secureTextEntry={securePassword ? true : false}
                />
              </View>
              <TouchableOpacity
                style={styles.toggleView}
                onPress={togglePassword}>
                <TogglePasswordEye securePassword={securePassword} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={gotoForgotPasswordPage}
              activeOpacity={0.8}>
              <Text style={styles.forgotPasswordView}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={{marginTop: 18}}>
              <AnimateLoadingButton
                ref={(c) => (loadingButton.current = c)}
                width={Platform.OS == 'ios' ? 300 : 290}
                height={50}
                title="Login"
                titleWeight={'700'}
                titleFontFamily={
                  Platform.OS == 'ios'
                    ? FONTS.MONTSERRAT_MEDIUM_IOS
                    : FONTS.MONTSERRAT_MEDIUM
                }
                titleFontSize={16}
                titleColor={COLOURS.white}
                activityIndicatorColor={COLOURS.white}
                backgroundColor={COLOURS.blue}
                borderRadius={10}
                onPress={makeLoginRequest.bind(this)}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </ViewProviderComponent>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: "center",
    //backgroundColor: COLOURS.white,
  },
  parentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //width: SIZES.width - 70,

    marginHorizontal: 35,
  },
  image: {width: SIZES.width, height: SIZES.height},
  logoImage: {width: Platform.OS == 'ios' ? 170 : 170, height: 40},
  emailAndPasswordView: {
    alignSelf: 'center',
    marginTop: 20,
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
    color: COLOURS.black,
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontFamily:
      Platform.OS == 'ios' ? FONTS.ROBOTO_REGULAR_IOS : FONTS.ROBOTO_REGULAR,
  },
  passwordRowView: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: SIZES.width / 1.25,
  },
  signRowView: {
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 45,
  },
  forgotPasswordView: {
    color: COLOURS.blue,
    marginTop: 30,
    fontSize: 13,
    alignSelf: 'flex-end',
    fontFamily:
      Platform.OS == 'ios' ? FONTS.ROBOTO_REGULAR_IOS : FONTS.ROBOTO_REGULAR,
  },
});

//make this component available to the app
export default LoginScreen;
