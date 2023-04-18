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
  imgPC?: number[];
  imgMobile?: number[];
};

export type DefaultBtnOptionTypes = {
  component?: ElementType;
  className?: string;
  type?: string;
  disabled?: boolean;
  title: string;
  isHover: boolean;
  onClick?: (e: any) => void;
};

export type DefaultBtnStyleTypes = {
  pc: number[];
  mobile?: number[];
  bgColor?: string;
  color?: string;
  margin?: number[];
  marginM?: number[];
  padding?: number[];
  fontSize?: number[];
  fontWeight?: number;
  hoverBgColor?: string;
  hoverColor?: string;
  disabledColor?: string;
};
