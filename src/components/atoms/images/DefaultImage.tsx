import styled from 'styled-components';
import { DefaultImageTypes, ImageStyleTypes } from 'types/atom';

function DefaultImage({
  imageSrc,
  imageAlt,
  className,
  onError,
  ...rest
}: DefaultImageTypes & ImageStyleTypes) {
  return (
    <DefaultImageAtom
      className={className}
      src={imageSrc}
      alt={imageAlt}
      onError={onError}
      {...rest}
    />
  );
}

export default DefaultImage;

const DefaultImageAtom = styled.img<ImageStyleTypes>`
  width: ${({ pc }) => pc[0]}px;
  height: ${({ pc }) => pc[1]}px;
  &.bookimage {
    border-radius: 0px 5px 5px 0px;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: ${({ tablet }) => tablet && tablet[0]}px;
    height: ${({ tablet }) => tablet && tablet[1]}px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: ${({ mobile }) => mobile && mobile[0]}px;
    height: ${({ mobile }) => mobile && mobile[1]}px;
    margin: 0 auto;
  }
`;
