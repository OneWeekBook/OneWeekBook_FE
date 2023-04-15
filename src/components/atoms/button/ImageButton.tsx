import styled from 'styled-components';

interface ButtonProps {
  handleClick: () => void;
  type?: 'button' | 'submit';
  src: string;
  alt: string;
}

interface StyleProps {
  bgColor?: string;
  imgSize?: number;
}

function ImageButton({
  type,
  handleClick,
  src,
  alt,
  ...rest
}: ButtonProps & StyleProps) {
  return (
    <ImageButtonAtom type={type} onClick={handleClick} {...rest}>
      <img src={src} alt={alt} />
    </ImageButtonAtom>
  );
}

ImageButton.defaultProps = {
  bgColor: 'white',
};

export default ImageButton;

const ImageButtonAtom = styled.button<StyleProps>`
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  img {
    width: ${({ imgSize }) => imgSize}rem;
  }
`;
