import { MOBILE_MIN_WIDTH, MOBILE_MAX_WIDTH, PC_MAX_WIDTH } from './devices';

const Theme = {
  device: {
    pc: {
      maxWidth: PC_MAX_WIDTH,
      minWidth: MOBILE_MAX_WIDTH,
    },
    mobile: {
      maxWidth: MOBILE_MAX_WIDTH,
      minWidth: MOBILE_MIN_WIDTH,
    },
  },
};

export default Theme;
