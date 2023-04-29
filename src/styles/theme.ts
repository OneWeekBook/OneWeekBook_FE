export const MOBILE_MIN_WIDTH = 375;
export const MOBILE_MAX_WIDTH = 768;
export const PC_MIN_WIDTH = 1000;
export const PC_MAX_WIDTH = 1440;

const color = {
  COLOR_NONE: 'transparent',
  COLOR_BLACK: 'black',
  COLOR_WHITE: 'white',
  COLOR_ANTIQUE_WHITE: 'antiquewhite',
  COLOR_RED: 'red',
  COLOR_GRAY: 'gray',
  COLOR_DIM_GRAY: 'dimgray',
  COLOR_CORAL: 'coral',
  COLOR_ORANGE_RED: 'orangered',
  COLOR_LEMON_CHIFFON: 'lemonchiffon',
  COLOR_GOLD: 'gold',
  COLOR_SIENNA: 'sienna',
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
