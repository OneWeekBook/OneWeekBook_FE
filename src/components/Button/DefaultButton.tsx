import styled, { css } from 'styled-components';
import { DefaultBtnOptionTypes, DefaultBtnStyleTypes } from 'types/components';

function DefaultButton({
  component,
  className,
  type,
  disabled,
  title,
  isHover,
  onClick,
  pc,
  mobile,
  bgColor,
  color,
  margin,
  marginM,
  padding,
  fontSize,
  fontWeight,
  hoverBgColor,
  hoverColor,
  disabledColor,
}: React.PropsWithChildren<DefaultBtnOptionTypes & DefaultBtnStyleTypes>) {
  return (
    <Button
      type={type}
      as={component}
      className={className}
      pc={pc}
      mobile={mobile}
      bgColor={bgColor}
      color={color}
      margin={margin}
      marginM={marginM}
      padding={padding}
      disabled={disabled}
      fontSize={fontSize}
      fontWeight={fontWeight}
      isHover={isHover}
      hoverBgColor={hoverBgColor}
      hoverColor={hoverColor}
      disabledColor={disabledColor}
      onClick={onClick}
    >
      {title}
    </Button>
  );
}

DefaultButton.defaultProps = {
  component: 'button',
  type: 'button',
  color: 'black',
  bgColor: 'white',
  fontSize: [16, 16],
  fontWeight: 500,
  margin: [0, 0, 0, 0],
  padding: [0, 0, 0, 0],
  marginM: [0, 0, 0, 0],
  isHover: false,
};

export default DefaultButton;

const Button = styled.button<{
  pc: number[];
  mobile: number[];
  color?: string;
  bgColor?: string;
  border?: string;
  borderRadius?: number;
  fontSize?: number[];
  fontWeight?: number;
  margin: number[];
  padding: number[];
  marginM: number[];
  isHover: boolean;
  hoverBgColor?: string;
  hoverColor?: string;
  disabledColor?: string;
}>`
  ${(props) =>
    props.pc[0] === 0
      ? css`
          width: 100%;
        `
      : css`
          width: ${props.pc[0]}px;
        `}
  ${(props) =>
    props.isHover &&
    css`
      :hover {
        background-color: ${props.hoverBgColor};
        color: ${props.hoverColor};
      }
    `}
    ${(props) =>
    props.disabled &&
    css`
      :disabled {
        background-color: ${props.disabledColor};
      }
    `}
  height: ${({ pc }) => pc[1]}px;
  border: none;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  transition: 0.5s;
  color: ${({ color }) => color};
  font-size: ${({ fontSize }) => fontSize && fontSize[0]}px;
  font-weight: ${({ fontWeight }) => fontWeight};
  margin: ${({ margin }) =>
    `${margin[0]}px ${margin[1]}px ${margin[2]}px ${margin[3]}px`};
  padding: ${({ padding }) =>
    `${padding[0]}px ${padding[1]}px ${padding[2]}px ${padding[3]}px`};
`;
