import {
  mobileBannerItems,
  pcBannerItems,
  BANNER_ITEM_SIZE,
} from 'constants/content';

export const setPCSlides = () => {
  const addedStart = [];
  const addedEnd = [];
  let index = 0;
  while (index < BANNER_ITEM_SIZE) {
    addedEnd.push(pcBannerItems[index % BANNER_ITEM_SIZE]);
    addedStart.unshift(
      pcBannerItems[BANNER_ITEM_SIZE - 1 - (index % BANNER_ITEM_SIZE)],
    );
    index += 1;
  }
  return [...addedStart, ...pcBannerItems, ...addedEnd];
};

export const setMobileSlides = () => {
  const addedStart = [];
  const addedEnd = [];
  let index = 0;
  while (index < BANNER_ITEM_SIZE) {
    addedEnd.push(mobileBannerItems[index % BANNER_ITEM_SIZE]);
    addedStart.unshift(
      mobileBannerItems[BANNER_ITEM_SIZE - 1 - (index % BANNER_ITEM_SIZE)],
    );
    index += 1;
  }
  return [...addedStart, ...mobileBannerItems, ...addedEnd];
};
