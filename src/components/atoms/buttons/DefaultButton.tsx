import styled from 'styled-components';
import theme from 'styles/theme';
import { ButtonStyleTypes, DefaultButtonTypes } from 'types/atom';

function DefaultButton({
  handleClick,
  content,
  disabled,
  className,
  type,
  ...rest
}: DefaultButtonTypes & ButtonStyleTypes) {
  return (
    <DefaultButtonAtom
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {content}
    </DefaultButtonAtom>
  );
}

DefaultButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: [theme.color.COLOR_WHITE, theme.color.COLOR_WHITE],
  fontWeight: 500,
  isBtnClick: false,
  bgColor: [theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED],
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
  transition: 0.5s;
  &:hover {
    color: ${({ fontColor }) => fontColor && fontColor[1]};
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.color.COLOR_GRAY};
  }
  &.pagination:hover {
    height: ${({ height }) => height && height + 10}px;
    transform: translateY(-5px);
  }
  &.category {
    box-shadow: 3px 3px 3px
      ${({ isBtnClick }) =>
        isBtnClick ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
    background-color: ${({ isBtnClick }) =>
      isBtnClick
        ? `${theme.color.COLOR_ORANGE_RED}`
        : `${theme.color.COLOR_CORAL}`};
    :hover {
      background-color: ${theme.color.COLOR_ORANGE_RED};
      box-shadow: 3px 8px 3px rgba(0, 0, 0, 0.5);
      margin: 5px 10px 10px 0;
    }
    @media (max-width: ${({ theme: { device } }) =>
      device.mobile.maxWidth}px) {\
      font-size: 1.4rem;
      height: 35px;
    }
  }
`;
