import styled from 'styled-components';

interface ButtonProps {
  handleClick?: () => void;
  content: string;
  src: string;
  type?: 'button' | 'submit';
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  bgColor?: string[];
  imgSize?: number;
}

function MenuButton({
  handleClick,
  content,
  src,
  type,
  ...rest
}: ButtonProps & StyleProps) {
  return (
    <MenuButtonAtom type={type} onClick={handleClick} {...rest}>
      <img src={src} alt="menu img" />
      <p>{content}</p>
    </MenuButtonAtom>
  );
}

MenuButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: '#f07055',
  fontWeight: 500,
  bgColor: ['#fff', '#fff'],
};

export default MenuButton;

const MenuButtonAtom = styled.button<StyleProps>`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  border: none;
  background-color: ${({ bgColor }) => bgColor && `${bgColor[0]}`};
  &:hover {
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
  img {
    width: ${({ imgSize }) => imgSize}rem;
  }
  p {
    color: ${({ fontColor }) => fontColor};
    font-size: ${({ fontSize }) => fontSize}rem;
    font-weight: ${({ fontWeight }) => fontWeight};
  }
`;
