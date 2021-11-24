import React, {useContext} from 'react';
import {Drawer, Text} from 'react-native-paper';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import {AuthContext} from '../utils/Context';
import {useDispatch} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';
import {COLOURS} from '../utils/Colours';
import {FONTS} from '../utils/Fonts';

import {SIZES} from '../utils/Sizes';
import {logoutUser} from '../store/actions/users';
import {IMAGES} from '../utils/Images';
import MontserratBold from './Text/MontserratBold';
import {deviceWidth, fp} from '../utils/responsive-screen';
import ViewProviderComponent from './ViewProviderComponent';

export function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  return (
    <ViewProviderComponent>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={IMAGES.zupaLogo}
            style={[
              styles.menuIcon,
              {tintColor: COLOURS.lightGray, width: 30, height: 30},
            ]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={IMAGES.cancel}
            style={[
              styles.menuIcon,
              {tintColor: COLOURS.white, width: 20, height: 20},
            ]}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.drawerBodyView}>
        <DrawerContentScrollView {...props}>
          <Drawer.Section>
            <View
              style={{
                width: deviceWidth,
                height: 55,
                backgroundColor: COLOURS.zupaBlue,
                justifyContent: 'center',
                paddingLeft:10
              }}>
              <DrawerItem
                icon={() => (
                  <Image
                    source={IMAGES.shipping}
                    style={styles.deliverImageIcon}
                  />
                )}
                label="Order History"
                labelStyle={styles.labelColor}
                onPress={() => {
                  props.navigation.dispatch(DrawerActions.closeDrawer());
                  props.navigation.push('OrderHistory');
                }}
              />
            </View>
          </Drawer.Section>

          <Drawer.Section>
            <View
              style={{
                width: deviceWidth,
                height: 55,
                backgroundColor: COLOURS.zupaBlue,
                justifyContent: 'center',
                paddingLeft:10
              }}>
              <DrawerItem
                icon={() => (
                  <Image
                    source={IMAGES.logout}
                    style={styles.logoutImageIcon}
                  />
                )}
                label="Sign out"
                labelStyle={styles.signOutText}
                onPress={() => {
                  Alert.alert(
                    'Logout',
                    'Do you want to logout?',
                    [
                      {
                        text: 'No',
                        onPress: () => {
                          console.log('cancel Pressed');
                        },
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          dispatch(logoutUser());
                        },
                      },
                    ],
                    {cancelable: true},
                  );
                }}
              />
            </View>
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>

      <View style={styles.footerView}>
        <MontserratBold style={{fontSize: fp(13), color: COLOURS.white}}>
          Version 1.0.1
        </MontserratBold>
      </View>
    </ViewProviderComponent>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:40,
    backgroundColor: COLOURS.blue,
    paddingHorizontal: 17,
    //marginBottom: Platform.OS == 'ios' ? 13 : 35,
  },

  taskText: {
    color: COLOURS.blue,
    opacity: 0.8,
    fontSize: 23,
    fontFamily:
      Platform.OS == 'android' ? FONTS.ROBOTO_MEDIUM : FONTS.ROBOTO_MEDIUM_IOS,
  },
  labelColor: {
    color: COLOURS.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: fp(15),
    // opacity: 0.6,
    //left:-8,
  },
  signOutText: {
    color: COLOURS.white,
    fontFamily: 'Montserrat-Bold',
    fontSize: fp(15),
    left:-5
  },
  drawerBg: {
    //flex: 1,
    //backgroundColor: COLOURS.white,
    //opacity: 0.9,
  },
  drawerBodyView: {
    flex: 3,
    backgroundColor: COLOURS.blue,
    //tintColor: COLOURS.darkslateblue,
    //opacity: 0.8,
  },
  line: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    width: SIZES.width,
    height: 0.5,
    backgroundColor: COLOURS.lightGray,
  },
  imageStyle: {
    width: 20,
    height: 20,
    opacity: 0.75,
    tintColor: COLOURS.blue,
  },
  deliverImageIcon: {
    width: 20,
    height: 20,
    //opacity: 0.4,
    tintColor: COLOURS.white,
  },
  logoutImageIcon: {
    width: 23,
    height: 23,
    //opacity: 0.4,
    tintColor: COLOURS.white,
    //paddingLeft:20
  },
  menuIcon: {
    width: 85,
    height: 55,
    //tintColor: COLOURS.white,
  },
  menuIcon1View: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.3,
    marginBottom: Platform.OS == 'ios' ? 0 : 20,
  },
  footerView: {
    backgroundColor: COLOURS.blue,
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
