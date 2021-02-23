import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#7F5DF0", // Light purple
  secondary: "#5D2DFD", // Dark purple
  white: "#ffffff",
  black: "#000000",
  green: "#37E39F",
  red: "#F9A8BA",
  gray1: "#6A6A6A",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
  darkGreen: "#0e5743",
  light_green: "#ceddd9",
  lightGray2: "#E6E6E6",
  lightGray3: "#cbd2d0",
  lightGray4: "#f2f2f2",
  gray: "gray",
  offWhite: "#00000040",
  red: "red",
  lightPink: "#ff00ff",
  blue: "blue",
  darkslateblue: "darkslateblue",
  modalBg: "#00000040",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
/**
 * handles fonts for the whole application
 */
export const FONTS = {
  MONTSERRAT_EXTRABOLD: "Montserrat-ExtraBold",
  MONTSERRAT_MEDIUM: "Montserrat-Medium",
  MONTSERRAT_REGULAR: "Montserrat-Regular",
  ROBOTO_BLACK: "roboto_black",
  ROBOTO_REGULAR: "roboto_regular",
  ROBOTO_THIN: "roboto_thin",
  ROBOTO_MEDIUM: "roboto_medium",

  MONTSERRAT_EXTRABOLD_IOS: "Montserrat-ExtraBold",
  MONTSERRAT_MEDIUM_IOS: "Montserrat-Medium",
  MONTSERRAT_REGULAR_IOS: "Montserrat-Regular",
  ROBOTO_BLACK_IOS: "roboto-black",
  ROBOTO_REGULAR_IOS: "roboto-regular",
  ROBOTO_THIN_IOS: "roboto-thin",
  ROBOTO_MEDIUM_IOS: "roboto-medium",
};

export default { COLORS, SIZES, FONTS };
