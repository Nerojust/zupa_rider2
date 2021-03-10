import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#583FE8", // Light purple
  secondary: "#5D2DFD", // Dark purple
  white: "#ffffff",
  black: "#000000",
  green: "#37E39F",
  red: "#F9A8BA",
  gray1: "#6A6A6A",
  lightGray: "#dbdbdb",
  lightGray1: "#f5f6fa",
  darkGreen: "#008900",
  green1: "#629d62",
  green2: "#4eb14e",
  green3: "#75a176",
  green4: "#008900",
  light_green: "#ceddd9",
  lightGray2: "#E6E6E6",
  lightGray3: "#cbd2d0",
  lightGray4: "#f2f2f2",
  lightGray5: "#EBEFF4",
  lightGray6: "#EBEFF4",
  gray: "gray",
  offWhite: "#00000040",
  red: "red",
  lightPink: "#ff00ff",
  blue: "blue",
  darkslateblue: "darkslateblue",
  modalBg: "#00000099",
  modalBg1: "#00000029",
  blue: "#505DF1",
  white_transparent: "#00ffff",
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
  MONTSERRAT_BOLD: "Montserrat-Bold",
  MONTSERRAT_SEMIBOLD: "Montserrat-SemiBold",
  MONTSERRAT_BLACK: "Montserrat-Black",
  MONTSERRAT_EXTRA_LIGHT: "Montserrat-ExtraLight",
  MONTSERRAT_LIGHT: "Montserrat-Light",
  MONTSERRAT_THIN: "Montserrat-Thin",
  ROBOTO_BLACK: "roboto_black",
  ROBOTO_REGULAR: "roboto_regular",
  ROBOTO_THIN: "roboto_thin",
  ROBOTO_MEDIUM: "roboto_medium",
  //VARELA_ROUND_REGULAR: "Varela-Round",


  MONTSERRAT_EXTRABOLD_IOS: "Montserrat-ExtraBold",
  MONTSERRAT_MEDIUM_IOS: "Montserrat-Medium",
  MONTSERRAT_REGULAR_IOS: "Montserrat-Regular",
  MONTSERRAT_BOLD_IOS: "Montserrat-Bold",
  MONTSERRAT_SEMIBOLD_IOS: "Montserrat-SemiBold",
  MONTSERRAT_BLACK_IOS: "Montserrat-Black",
  MONTSERRAT_EXTRA_LIGHT_IOS: "Montserrat-ExtraLight",
  MONTSERRAT_LIGHT_IOS: "Montserrat-Light",
  MONTSERRAT_THIN_IOS: "Montserrat-Thin",
  ROBOTO_BLACK_IOS: "roboto-black",
  ROBOTO_REGULAR_IOS: "roboto-regular",
  ROBOTO_THIN_IOS: "roboto-thin",
  ROBOTO_MEDIUM_IOS: "roboto-medium",
  //VARELA_ROUND_REGULAR_IOS: "Varela-Round",
};

export default { COLORS, SIZES, FONTS };
