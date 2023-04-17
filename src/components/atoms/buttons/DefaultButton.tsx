import styled from 'styled-components';
import theme from 'styles/theme';
import { ButtonStyleTypes, DefaultButtonTypes } from 'types/atom';

function DefaultButton({
  handleClick,
  content,
  disabled,
  type,
  ...rest
}: DefaultButtonTypes & ButtonStyleTypes) {
  return (
    <DefaultButtonAtom
      type={type}
      onClick={handleClick}
      disabled={disabled}
      {...rest}
    >
      {content}
    </DefaultButtonAtom>
  );
}

DefaultButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: ['white', 'white'],
  fontWeight: 500,
  isBtnClick: false,
  bgColor: [theme.color.COLOR_CORAL, theme.color.COLOR_TOMATO],
  width: 120,
  height: 40,
};

export default DefaultButton;

const DefaultButtonAtom = styled.button<ButtonStyleTypes>`
  cursor: pointer;
  color: ${({ fontColor }) => fontColor && fontColor[0]};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  width: ${({ width }) => (width === 'auto' ? '100%' : `${width}px`)};
  height: ${({ height }) => height}px;
  border: none;
  border-radius: 5px;
  background-color: ${({ bgColor, isBtnClick }) =>
    isBtnClick ? bgColor && `${bgColor[1]}` : bgColor && `${bgColor[0]}`};
  &:hover {
    color: ${({ fontColor }) => fontColor && fontColor[1]};
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
  &:disabled {
    background-color: #a9a9a9;
  }
`;
