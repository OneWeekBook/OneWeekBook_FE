export interface BannerButtonTypes {
  handleClick: (idx: number) => void;
  direct: string;
  imageSrc: string;
}

export interface DefaultButtonTypes {
  handleClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => void;
  content?: string | number;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  imageSrc?: string;
}

export interface StarImageType {
  score: number;
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

export interface BorderInputTypes {
  type: string;
  maxLength?: number;
  placeholder: string;
  value: string;
  pattern?: string;
  disabled?: boolean;
  mref?: React.RefObject<HTMLInputElement>;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (
    event: React.KeyboardEvent<Element>,
    ref?: React.RefObject<HTMLInputElement>,
  ) => void;
}

export interface DefaultInputTypes {
  type?: string;
  value: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

export interface ReviewInputTypes {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export interface DefaultLabelTypes {
  content: string;
  subContent?: string;
}

export interface LinkTypes {
  imageSrc?: string;
  content: string;
  handleClick?: () => void;
}

export interface DefaultLinkTypes extends LinkTypes {
  to: string;
  replace?: boolean;
}

export interface TimerTextTypes {
  emailDone: boolean;
  setEmailDone: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DefaultTextTypes {
  content: string | number;
  className?: string;
}

export interface ErrorTypes {
  error: string;
  align?: string;
}

export interface MultiTextTypes {
  imageSrc: string;
  imageAlt: string;
  content: string | number;
  className?: string;
}

/* Style Types */

export interface ButtonStyleTypes {
  fontSize: number;
  fontColor: string | string[];
  fontWeight: number;
  backgroundColor: string | string[];
  imageSize?: number;
  isBtnClick: boolean;
  width: number | string;
  height: number;
}

export interface InputStyleTypes {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
}

export interface ImageStyleTypes {
  pc: number[];
  tablet?: number[];
  mobile?: number[];
}

export interface LinkStyleTypes {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
}

export interface LabelStyleTypes {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  flexGap?: number;
  reactive?: boolean;
  align?: string;
}

export interface TextStyleTypes {
  imageSize?: number;
  flex?: string;
  fontSize?: number;
  fontColor?: string[] | string;
  fontWeight?: number;
  padding?: number;
  align?: string;
  reactive?: boolean;
  bgColor?: string;
  border?: number;
}
