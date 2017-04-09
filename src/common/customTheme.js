import {
  fade
} from 'material-ui/utils/colorManipulator';
import {
  yellow600,
  yellowA700,
  grey100,
  grey200,
  grey300,
  grey400,
  grey500,
  red500,
  white,
  darkBlack,
  fullBlack,
  green900
} from 'material-ui/styles/colors';

export default {
  flatButton: {
    primaryTextColor: white,
    primaryBackgroundColor: green900,
    fontWeight: "bold",
  },
  raisedButton: {
    primaryTextColor: fullBlack,
    primaryBackgroundColor: green900,
    fontWeight: "bold",
  },
  spacing: {
    iconSize: 24,
    desktopGutter: 24,
    desktopGutterMore: 32,
    desktopGutterLess: 16,
    desktopGutterMini: 8,
    desktopKeylineIncrement: 64,
    desktopDropDownMenuItemHeight: 32,
    desktopDropDownMenuFontSize: 15,
    desktopDrawerMenuItemHeight: 48,
    desktopSubheaderHeight: 48,
    desktopToolbarHeight: 56
  },
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: yellow600,
    primary2Color: yellowA700,
    primary3Color: grey400,
    primary4Color: grey200,
    accent1Color: red500,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: 'black',
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: yellow600,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
};
