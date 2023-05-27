import styled from 'styled-components';
import { ImageButtonStyleTypes, ImageButtonTypes } from 'types/atom';

function ImageButton({
  type,
  handleClick,
  imageSrc,
  ...rest
}: ImageButtonTypes & ImageButtonStyleTypes) {
  return (
    <ImageButtonAtom type={type} onClick={handleClick} {...rest}>
      <img src={imageSrc} alt="img button" />
    </ImageButtonAtom>
  );
}

ImageButton.defaultProps = {
  bgColor: 'transparent',
};

export default ImageButton;

const ImageButtonAtom = styled.button<ImageButtonStyleTypes>`
  border: none;
  background-color: ${({ backgroundColor }) => backgroundColor};
  cursor: pointer;
  border: none;
  img {
    border-radius: 5px;
    width: ${({ imageSize }) => imageSize}px;
    height: ${({ imageSize }) => imageSize}px;
  }
`;
