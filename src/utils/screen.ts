import { Dimensions } from "react-native";

/**
 * standard values use in design (Figma)
 */
export const STANDARD_WIDTH = 375;
export const STANDARD_HEIGHT = 667;

const { width, height } = Dimensions.get("window");
const [shortDimension, longDimension] =
  width < height ? [width, height] : [height, width];
const STANDARD_WINDOW = { width: STANDARD_WIDTH, height: STANDARD_HEIGHT };

const isLargeView = shortDimension >= 600;
const isTabletMode = shortDimension / longDimension > 0.7;

/**
 *
  Sometimes you don't want to scale everything in a linear manner, that's where moderate scale comes in.
  The cool thing about it is that you can control the resize factor (default is 0.5).
  If normal scale will increase your size by +2X, moderateScale will only increase it by +X, for example:
  ➡️ responsiveWidth(10) = 20
  ➡️ responsiveHeight(10) = 15
  ➡️ responsiveFontSize(10, 0.1) = 11
 * @param {*} size Number
 * @param {*} factor Number : default = 0.5
 */

const widthRatio = shortDimension / STANDARD_WINDOW.width;
const heightRatio = longDimension / STANDARD_WINDOW.height;
export const responsiveWidth = (size: number) =>
  (shortDimension / STANDARD_WINDOW.width) * size;
export const responsiveHeight = (size: number) =>
  (longDimension / STANDARD_WINDOW.height) * size;
export const responsiveFontSize = (size: number, factor = 0.5) =>
  size + (responsiveHeight(size) - size) * factor;

const Screen = {
  width,
  height,
  widthRatio,
  heightRatio,
  isLargeView,
  isTabletMode,
  keyBoardH: 216,
  rateImage: 9 / 16,
};

export default Screen;
