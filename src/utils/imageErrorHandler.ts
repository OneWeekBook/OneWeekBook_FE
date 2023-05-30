import React from 'react';
import { FUNC_IMAGE } from 'constants/image';

export const imageErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  event.currentTarget.src = FUNC_IMAGE.BOOK;
  event.currentTarget.className = 'error';
};
