import {
  MOBILE_MIN_WIDTH,
  MOBILE_MAX_WIDTH,
  PC_MAX_WIDTH,
  PC_MIN_WIDTH,
} from './devices';

const color = {
  COLOR_NONE: 'transparent',
  COLOR_BLACK: 'black',
  COLOR_WHITE: 'white',
  COLOR_ANTIQUE_WHITE: 'antiquewhite',
  COLOR_RED: 'red',
  COLOR_GRAY: 'gray',
  COLOR_DIM_GRAY: 'dimgray',
  COLOR_CORAL: 'coral',
  COLOR_TOMATO: 'tomato',
  COLOR_LEMON_CHIFFON: 'lemonchiffon',
  COLOR_GOLD: 'gold',
  COLOR_SIENNA: 'sienna',
  COLOR_MAIN: '#f07055',
  COLOR_SUB_ONE: '#faf39e',
  COLOR_SUB_TWO: '#7ca7d3',
  COLOR_LAYOUT_ONE: '#8e7d74',
  COLOR_LAYOUT_TWO: '#f7b7a9',
  COLOR_LAYOUT_THREE: '#707070',
  COLOR_FONT_ONE: '#a25b5b',
  COLOR_FONT_TWO: '#322a25',
  COLOR_FONT_THREE: '#7ca7d3',
  COLOR_FONT_FIVE: '#ad8b73',
};

const Theme = {
  color,
  device: {
    pc: {
      maxWidth: PC_MAX_WIDTH,
      minWidth: PC_MIN_WIDTH,
    },
    mobile: {
      maxWidth: MOBILE_MAX_WIDTH,
      minWidth: MOBILE_MIN_WIDTH,
    },
  },
};

export default Theme;
