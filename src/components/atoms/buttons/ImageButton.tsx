import styled from 'styled-components';
import { ButtonStyleTypes, ImageButtonTypes } from 'types/atom';

function ImageButton({
  type,
  handleClick,
  src,
  ...rest
}: ImageButtonTypes & ButtonStyleTypes) {
  return (
    <ImageButtonAtom type={type} onClick={handleClick} {...rest}>
      <img src={src} alt="img button" />
    </ImageButtonAtom>
  );
}

ImageButton.defaultProps = {
  bgColor: 'transparent',
};

export default ImageButton;

const ImageButtonAtom = styled.button<ButtonStyleTypes>`
  border: none;
  background-color: ${({ bgColor }) => bgColor};
  cursor: pointer;
  border: none;
  border-radius: 5px;
  img {
    width: ${({ imgSize }) => imgSize}px;
  }
`;
