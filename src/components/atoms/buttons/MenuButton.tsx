import styled from 'styled-components';
import theme from 'styles/theme';
import { ButtonStyleTypes, MenuButtonTypes } from 'types/atom';

function MenuButton({
  handleClick,
  className,
  content,
  src,
  type,
  ...rest
}: MenuButtonTypes & ButtonStyleTypes) {
  return (
    <MenuButtonAtom
      type={type}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      <img src={src} alt="menu img" />
      <p>{content}</p>
    </MenuButtonAtom>
  );
}

MenuButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: theme.color.COLOR_CORAL,
  fontWeight: 500,
  bgColor: [theme.color.COLOR_NONE, theme.color.COLOR_NONE],
};

export default MenuButton;

const MenuButtonAtom = styled.button<ButtonStyleTypes>`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: none;
  background-color: ${({ bgColor, isBtnClick }) =>
    isBtnClick ? bgColor && `${bgColor[1]}` : bgColor && `${bgColor[0]}`};
  &:hover {
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
  img {
    width: ${({ imgSize }) => imgSize}px;
  }
  p {
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
  &.likemenu {
    padding: 5px 10px;
    border-radius: 5px;
  }
`;
