import { ElementType } from 'react';

export type ImgBtnOptionTypes = {
  component?: ElementType;
  className?: string;
  type?: string;
  onClick: (e: any) => void;
};

export type ImgBtnStyleTypes = {
  pc: number[];
  mobile?: number[];
  bgColor?: string;
  margin?: number[];
  marginM?: number[];
};

export type ImgBtnImageTypes = {
  src: string;
  alt: string;
};
