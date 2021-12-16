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
  FlatList,
  Keyboard,
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
import {KeyboardObserverComponent} from '../components/KeyboardObserverComponent';
import LoaderButtonComponent from '../components/LoaderButtonComponent';
import ViewProviderComponent from '../components/ViewProviderComponent';
import {login} from '../store/actions/users';
import {
  DismissKeyboard,
  dismissLoaderButton,
  showLoaderButton,
} from '../utils/utils';
import {ACTIVE_OPACITY} from '../utils/Constants';
import {
  deviceHeight,
  deviceWidth,
  fp,
  hp,
  wp,
} from '../utils/responsive-screen';
import MontserratBold from '../components/Text/MontserratBold';
import MontserratMedium from '../components/Text/MontserratMedium';
import useKeyboardHeight from 'react-native-use-keyboard-height';
import {IMAGES} from '../utils/Images';
// create a component
const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const keyboardHeight = useKeyboardHeight();
  const phoneNumberRef = useRef(null);
  const passwordRef = useRef(null);
  const [securePassword, setSecurePassword] = useState(true);
  const loadingButtonRef = useRef();
  const [isPhoneNumberFocused, setIsPhoneNumberFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // const [phoneNumber, setPhoneNumber] = useState('');
  // const [password, setPassword] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('08027827837');
  const [password, setPassword] = useState('2729');

  // const [phoneNumber, setPhoneNumber] = useState('09087654323');
  // const [password, setPassword] = useState('8940');

  const handlePhoneNumber = (value) => {
    setPhoneNumber(value);
  };
  const handlePassword = (value) => {
    setPassword(value);
  };
  const togglePassword = () => {
    setSecurePassword(!securePassword);
  };

  const gotoForgotPasswordPage = () => {
    navigation.push('ForgotPassword');
  };

  const renderButton = () => {
    return (
      <>
        <LoaderButtonComponent
          buttonRef={loadingButtonRef}
          title={'Sign In'}
          method={makeLoginRequest}
        />

        <View style={{marginBottom: 20}} />
      </>
    );
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
    showLoaderButton(loadingButtonRef);
    dispatch(login(payload));
    dismissLoaderButton(loadingButtonRef);
  };
  const handleClose = () => {
    Keyboard.dismiss();
  };
  const renderInputFields = () => {
    return (
      <>
        <TextInputComponent
          placeholder={'Phone number'}
          handleTextChange={handlePhoneNumber}
          defaultValue={phoneNumber}
          refValue={phoneNumberRef}
          placeholderTextColor={COLOURS.gray5}
          keyboardType={'email-address'}
          length={11}
          heightfigure={50}
          widthFigure={deviceWidth / 1.15}
          props={
            isPhoneNumberFocused
              ? {borderColor: COLOURS.blue, color: COLOURS.textInputColor}
              : {borderColor: COLOURS.zupa_gray_bg}
          }
          handleTextInputFocus={() => setIsPhoneNumberFocused(true)}
          handleBlur={() => setIsPasswordFocused(false)}
          onSubmitEditing={() => passwordRef.current.focus()}
        />

        <View style={{marginVertical: 10}} />

        <TextInputComponent
          placeholder={'Password'}
          handleTextChange={handlePassword}
          defaultValue={password}
          refValue={passwordRef}
          heightfigure={50}
          widthFigure={deviceWidth / 1.15}
          returnKeyType={'done'}
          placeholderTextColor={COLOURS.gray5}
          secureTextEntry
          props={
            isPasswordFocused
              ? {borderColor: COLOURS.blue, color: COLOURS.textInputColor}
              : {borderColor: COLOURS.zupa_gray_bg}
          }
          handleTextInputFocus={() => setIsPasswordFocused(true)}
          handleBlur={() => setIsPasswordFocused(false)}
          onSubmitEditing={makeLoginRequest}
        />
        <View style={{marginVertical: 10}} />
      </>
    );
  };
  const renderBottomRow = () => {
    return (
      <View
        style={[
          styles.signUpPasswordRowView,
          {
            marginBottom:
              keyboardHeight > 0
                ? Platform.OS == 'ios'
                  ? keyboardHeight - hp(150)
                  : 0
                : 0,
          },
        ]}>
        <TouchableOpacity
          activeOpacity={ACTIVE_OPACITY}
          onPress={gotoForgotPasswordPage}>
          <MontserratMedium style={styles.forgotPasswordView}>
            Forgot Password?
          </MontserratMedium>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ViewProviderComponent>
      {/* <ImageBackground source={IMAGES.loginBG} style={styles.image}> */}
        <FlatList
          data={[]}
          keyboardShouldPersistTaps={'handled'}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <DismissKeyboard handleClose={handleClose}>
              <KeyboardObserverComponent>
                <View
                  style={{
                    justifyContent: 'center',
                    height: fp(deviceHeight - wp(125)),
                  }}>
                  <View style={{marginLeft: 25}}>
                    <MontserratBold style={styles.welcomeTextView}>
                      Sign In
                    </MontserratBold>

                    <MontserratMedium style={styles.signInTextView}>
                      Sign in to your account
                    </MontserratMedium>
                  </View>
                  {renderInputFields()}

                  {renderButton()}
                  {renderBottomRow()}
                </View>
              </KeyboardObserverComponent>
            </DismissKeyboard>
          }
          renderItem={null}
          keyExtractor={(item) => item?.id}
        />
      {/* </ImageBackground> */}
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
  image: {
    width: deviceWidth,
    height: deviceHeight,
  },
  welcomeTextView: {
    fontSize: fp(30),
    color: COLOURS.text_color,
  },
  signInTextView: {
    fontSize: fp(14),
    color: COLOURS.textInputColor,
    marginTop: 15,
    marginBottom: 30,
  },

  button: {
    marginBottom: hp(40),
    width: deviceWidth / 1.25,
    height: 50,
    justifyContent: 'center',
    right: -5,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLOURS.blue,
  },

  buttonText: {
    color: COLOURS.white,
    fontSize: fp(16),
  },

  signUpPasswordRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 25,
    marginTop: 10,
  },
  signupView: {
    fontSize: fp(14),
    color: COLOURS.blue,
  },

  forgotPasswordView: {
    fontSize: fp(14),
    color: COLOURS.labelTextColor,
  },
});

//make this component available to the app
export default LoginScreen;
