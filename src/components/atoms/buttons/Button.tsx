import styled from 'styled-components';
import theme from 'styles/theme';
import { ButtonStyleTypes, DefaultButtonTypes } from 'types/atom';

function DefaultButton({
  handleClick,
  content,
  disabled,
  className,
  imageSrc,
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
      <img src={imageSrc} alt="button img" />
      <p>{content}</p>
    </DefaultButtonAtom>
  );
}

DefaultButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: [theme.color.COLOR_WHITE, theme.color.COLOR_WHITE],
  fontWeight: 500,
  isBtnClick: false,
  backgroundColor: [theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED],
  width: 120,
  height: 40,
};

export default DefaultButton;

const DefaultButtonAtom = styled.button<ButtonStyleTypes>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  width: ${({ width }) =>
    width === 'auto' ? 'auto' : width === 'full' ? '100%' : `${width}px`};
  height: ${({ height }) => height}px;
  border: none;
  border-radius: 5px;
  background-color: ${({ backgroundColor, isBtnClick }) =>
    isBtnClick ? `${backgroundColor[1]}` : `${backgroundColor[0]}`};
  transition: 0.5s;
  p {
    color: ${({ fontColor, isBtnClick }) =>
      isBtnClick ? `${fontColor[1]}` : `${fontColor[0]}`};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
  img {
    width: ${({ imageSize }) => imageSize}px;
    height: ${({ imageSize }) => imageSize}px;
  }
  &:hover {
    color: ${({ fontColor }) => fontColor[1]};
    background-color: ${({ backgroundColor }) => `${backgroundColor[1]}`};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.color.COLOR_GRAY};
  }
  &.pagination:hover {
    height: ${({ height }) => height + 20}px;
    transform: translateY(-10px);
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
    @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
      font-size: 1.4rem;
      height: 35px;
    }
  }
`;
