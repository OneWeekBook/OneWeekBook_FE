import { ChangeEvent } from 'react';

export interface BannerButtonTypes {
  handleClick: (idx: number) => void;
  direct: string;
  imageSrc: string;
}

export interface DefaultButtonTypes {
  handleClick?: () => void;
  content?: string;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
}

export interface ImageButtonTypes {
  handleClick: () => void;
  type?: 'button' | 'submit';
  src: string;
}

export interface MenuButtonTypes extends ImageButtonTypes {
  content: string;
}

export interface ButtonStyleTypes {
  fontSize?: number;
  fontColor?: string[];
  fontWeight?: number;
  bgColor?: string | string[];
  imgSize?: number;
  isBtnClick?: boolean;
  width?: number | string;
  height?: number;
}

export interface IconType {
  score: number;
}

export interface IconStyleType {
  imageSize: number;
}

export interface BannerImageTypes {
  newItemWidth: number;
  imageSrc: string;
}

export interface DefaultImageTypes {
  imageSrc: string;
  imageAlt: string;
  className?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export interface ImageStyleTypes {
  pc: number[];
  tablet?: number[];
  mobile?: number[];
}

export interface BorderInputTypes {
  type: string;
  maxLength?: number;
  placeholder: string;
  value: string;
  pattern?: string;
  disabled?: boolean;
  mref?: React.RefObject<HTMLInputElement>;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (
    event: React.KeyboardEvent<Element>,
    ref?: React.RefObject<HTMLInputElement>,
  ) => void;
}

export interface DefaultInputTypes {
  value: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export interface ReviewInputTypes {
  value: string;
  handleBlur: () => void;
}

export interface InputStyleTypes {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

export interface DefaultLabelTypes {
  content: string;
  subContent?: string;
}

export interface LabelStyleTypes {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  flexGap?: number;
  reactive?: boolean;
  align?: string;
}

export interface LinkTypes {
  content: string;
  handleClick?: () => void;
}

export interface DefaultLinkTypes extends LinkTypes {
  to: string;
  replace?: boolean;
}

export interface LinkStyleTypes {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export interface TagTypes {
  content: string;
  src: string;
}

export interface TagStyleTypes {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  imgSize?: number;
}

export interface DefaultTextTypes {
  content: string | number;
  subContent?: string | number;
  className?: string;
}

export interface DataTextTypes {
  before?: string;
  data: string | number;
  after?: string;
}

export interface ErrorTypes {
  error: string;
  align?: string;
}

export interface TextStyleTypes {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  padding?: number;
  align?: string;
  reactive?: boolean;
  bgColor?: string;
  border?: number;
}
