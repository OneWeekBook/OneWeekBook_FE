import { ElementType } from 'react';

export interface ImgBtnOptionTypes {
  component?: ElementType;
  className?: string;
  type?: string;
  onClick: (e: MouseEvent) => void;
}

export interface ImgBtnStyleTypes {
  pc: number[];
  mobile?: number[];
  bgColor?: string;
  margin?: number[];
  marginM?: number[];
}

export interface ImgBtnImageTypes {
  src: string;
  alt: string;
  imgPC?: number[];
  imgMobile?: number[];
}

export interface DefaultBtnOptionTypes {
  component?: ElementType;
  className?: string;
  type?: string;
  disabled?: boolean;
  title: string;
  isHover: boolean;
  onClick?: (e: MouseEvent) => void;
}

export interface DefaultBtnStyleTypes {
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
}

export interface SearchInputOptionTypes {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  handleFetch: (search: string) => void;
}

export interface SearchInputStyleTypes {
  border: string;
  borderRadius: number;
  fontSize: number;
  padding: number[];
  focusBorder: string;
}
