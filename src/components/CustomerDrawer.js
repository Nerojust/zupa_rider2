import React from "react";
import { Drawer, Text } from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Platform,
  SafeAreaView,
} from "react-native";
import { COLORS, SIZES, FONTS } from "../utils/theme";

export function CustomDrawerContent(props) {
  return (
    <SafeAreaView style={styles.drawerBg}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => props.navigation.toggleDrawer()}>
          <Image
            source={require("../assets/icons/home.png")}
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.taskText}>{"Zupa Rider"}</Text>
        <Image
          source={require("../assets/icons/next.png")}
          style={{
            width: 20,
            height: 20,
            tintColor: COLORS.lightGray,
            opacity: 0.4,
          }}
        />
      </View>
      <View style={styles.drawerBg2}>
        <DrawerContentScrollView {...props}>
          <Drawer.Section>
            <View style={styles.line} />
            <DrawerItem
              icon={({}) => (
                <Image
                  source={require("../assets/icons/invisible.png")}
                  style={styles.imageStyle}
                />
              )}
              label="Discover"
              labelStyle={styles.labelColor}
              onPress={() => {
                props.navigation.navigate("todo");
              }}
            />
            <View style={styles.line} />
            <DrawerItem
              icon={({}) => (
                <Image
                  source={require("../assets/icons/star.png")}
                  style={styles.imageStyle}
                />
              )}
              label="UI kit"
              labelStyle={styles.labelColor}
              onPress={() => {
                props.navigation.navigate("uikit");
              }}
            />
            <View style={styles.line} />
          </Drawer.Section>
        </DrawerContentScrollView>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Platform.OS === "ios" ? 14 : 12,
    backgroundColor: COLORS.gray1,
    paddingHorizontal: 17,
    marginBottom: Platform.OS == "ios" ? -13 : 5,
  },

  taskText: {
    color: COLORS.white,
    opacity: 0.8,
    fontSize: 25,
    fontFamily:
      Platform.OS == "android" ? FONTS.ROBOTO_MEDIUM : FONTS.ROBOTO_MEDIUM_IOS,
  },
  labelColor: {
    color: COLORS.gray1,
    fontFamily:
      Platform.OS == "android" ? FONTS.ROBOTO_MEDIUM : FONTS.ROBOTO_MEDIUM_IOS,
    opacity: 0.6,
  },
  drawerBg: {
    flex: 1,
    backgroundColor: COLORS.lightGray2,
    //opacity: 0.9,
  },
  drawerBg2: {
    flex: 1,
    //backgroundColor: Colors.LIGHT_GRAY4,
    tintColor: COLORS.darkslateblue,
    //opacity: 0.8,
  },
  line: {
    // borderBottomWidth: StyleSheet.hairlineWidth,
    width: SIZES.width,
    height: 0.5,
    backgroundColor: COLORS.lightGray2,
  },
  imageStyle: {
    width: 20,
    height: 20,
    opacity: 0.4,
    tintColor: COLORS.lightGray2,
  },
  menuIcon: {
    width: 25,
    height: 25,
    tintColor: COLORS.lightGray2,
  },
});
