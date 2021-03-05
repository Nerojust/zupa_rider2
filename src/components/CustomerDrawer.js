import React, { useContext } from "react";
import { Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
  Alert,
} from "react-native";
import { AuthContext } from "../utils/Context";
import { useDispatch } from "react-redux";
import { DrawerActions } from "@react-navigation/native";
import { COLORS, SIZES, FONTS } from "../utils/theme";
import { logoutUser } from "../store/Actions";

export function CustomDrawerContent(props) {
  const dispatch = useDispatch();
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.drawerBg}>
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => props.navigation.toggleDrawer()}
        >
          <Image
            source={require("../assets/icons/zupa.png")}
            style={styles.menuIcon}
            resizeMode={"contain"}
          />
        </TouchableOpacity>
        <Text style={styles.taskText}>{"Rider"}</Text>
      </View>

      <View style={styles.menuIcon1View}>
        <Image
          source={require("../assets/images/rider.png")}
          style={styles.menuIcon}
          resizeMode={"contain"}
        />
      </View>
      <View style={styles.drawerBg2}>
        <DrawerContentScrollView {...props}>
          {/* <Drawer.Section>
          <View>
            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
                marginTop: 30,
                marginHorizontal: 20,
                alignItems: "center",
              }}
              onPress={() => {
                props.navigation.push("Dashboard");
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              <Image
                source={require("../assets/icons/home.png")}
                style={styles.imageStyle1}
              />

              <Text
                style={{
                  marginLeft: 27,
                  color: COLORS.blue,
                  alignSelf: "center",
                }}
              >
                Home
              </Text>
            </View>
            <View
              style={{
                flex: 0.3,
                flexDirection: "row",
                marginTop: 30,
                marginHorizontal: 20,
                alignItems: "center",
              }}
              onPress={() => {
                console.log("clicked 2")
                props.navigation.push("OrderHistory");
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
            >
              <Image
                source={require("../assets/icons/deliver.png")}
                style={styles.imageStyle1}
              />

              <Text
                style={{
                  marginLeft: 27,
                  color: COLORS.blue,
                  alignSelf: "center",
                }}
              >
                Order History
              </Text>
            </View>
          </View>
          </Drawer.Section> */}
          <Drawer.Section>
            {/* <View style={styles.line} />
            <DrawerItem
              icon={({}) => (
                <Image
                  source={require("../assets/icons/home.png")}
                  style={styles.imageStyle1}
                />
              )}
              activeOpacity={0.8}
              label="Home"
              labelStyle={styles.labelColor}
              onPress={() => {
                props.navigation.push("Dashboard");
                props.navigation.dispatch(DrawerActions.closeDrawer());
              }}
            /> */}
            <View style={styles.line} />
            <DrawerItem
              icon={() => (
                <Image
                  source={require("../assets/icons/deliver.png")}
                  style={styles.imageStyle1}
                />
              )}
              //activeOpacity={0.8}
              label="Order History"
              labelStyle={styles.labelColor}
              onPress={() => {
                
                props.navigation.dispatch(DrawerActions.closeDrawer());
                props.navigation.push("OrderHistory");
              }}
            />
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>
      <View>
        <Drawer.Section>
          <DrawerItem
            icon={({}) => (
              <Image
                source={require("../assets/icons/logout.png")}
                style={styles.imageStyle}
              />
            )}
            label="Logout"
            labelStyle={styles.labelColor}
            onPress={() => {
              Alert.alert(
                "Logout",
                "Do you want to logout?",
                [
                  {
                    text: "No",
                    onPress: () => {
                      console.log("cancel Pressed");
                    },
                  },
                  {
                    text: "Yes",
                    onPress: () => {
                      // props.navigation.navigate("Login");
                      // dispatch(logoutUser());
                      signOut();
                    },
                  },
                ],
                { cancelable: true }
              );
            }}
          />
        </Drawer.Section>
      </View>
      <View style={styles.footerView}>
        <Text style={{ fontSize: 10, color: COLORS.gray }}>Version 1.0.0</Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 0 : 0,
    backgroundColor: COLORS.lightGray5,
    paddingHorizontal: 17,
    marginBottom: Platform.OS == "ios" ? 13 : 35,
  },

  taskText: {
    color: COLORS.blue,
    opacity: 0.8,
    fontSize: 23,
    fontFamily:
      Platform.OS == "android" ? FONTS.ROBOTO_MEDIUM : FONTS.ROBOTO_MEDIUM_IOS,
  },
  labelColor: {
    color: COLORS.black,
    fontFamily:
      Platform.OS == "android" ? FONTS.ROBOTO_MEDIUM : FONTS.ROBOTO_MEDIUM_IOS,
    opacity: 0.6,
  },
  drawerBg: {
    flex: 1,
    backgroundColor: COLORS.white,
    //opacity: 0.9,
  },
  drawerBg2: {
    flex: 3,
    //backgroundColor: Colors.LIGHT_GRAY4,
    tintColor: COLORS.darkslateblue,
    //opacity: 0.8,
  },
  line: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    width: SIZES.width,
    height: 0.5,
    backgroundColor: COLORS.lightGray,
  },
  imageStyle: {
    width: 20,
    height: 20,
    opacity: 0.75,
    tintColor: COLORS.blue,
  },
  imageStyle1: {
    width: 23,
    height: 22,
    //opacity: 0.4,
    tintColor: COLORS.blue,
  },
  menuIcon: {
    width: 85,
    height: 55,
    //tintColor: COLORS.white,
  },
  menuIcon1View: {
    justifyContent: "center",
    alignItems: "center",
    flex: 0.3,
    marginBottom: Platform.OS == "ios" ? 0 : 20,
  },
  footerView: { flex: 0.2, justifyContent: "center", alignItems: "center" },
});
