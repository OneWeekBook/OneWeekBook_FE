import styled from 'styled-components';

interface ButtonProps {
  handleClick?: () => void;
  content: string;
  src: string;
  alt: string;
  type?: 'button' | 'submit';
}

interface StyleProps {
  fontSize?: number;
  fontColor?: string;
  fontWeight?: number;
  bgColor?: string[];
  imgSize?: number;
}

function DefaultButton({
  handleClick,
  content,
  src,
  alt,
  type,
  ...rest
}: ButtonProps & StyleProps) {
  return (
    <MenuButtonAtom type={type} onClick={handleClick} {...rest}>
      <img src={src} alt={alt} />
      <p>{content}</p>
    </MenuButtonAtom>
  );
}

DefaultButton.defaultProps = {
  type: 'button',
  fontSize: 1.6,
  fontColor: '#f07055',
  fontWeight: 500,
  bgColor: ['#fff', '#fff'],
};

export default DefaultButton;

const MenuButtonAtom = styled.button<StyleProps>`
  display: flex;
  gap: 5px;
  color: ${({ fontColor }) => fontColor};
  font-size: ${({ fontSize }) => fontSize}rem;
  font-weight: ${({ fontWeight }) => fontWeight};
  background-color: ${({ bgColor }) => bgColor && `${bgColor[0]}`};
  &:hover {
    background-color: ${({ bgColor }) => bgColor && `${bgColor[1]}`};
  }
  img {
    width: ${({ imgSize }) => imgSize}rem;
  }
`;
