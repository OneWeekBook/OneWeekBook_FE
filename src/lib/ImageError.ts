import React from 'react';

export const getImgErr = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
) => {
  event.currentTarget.src = '/assets/func/book.png';
  event.currentTarget.className = 'error';
};
