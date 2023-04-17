import styled from 'styled-components';

interface DefaultImageProps {
  imageSrc: string;
  imageAlt: string;
  className?: string;
  onError?: (event: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

interface StyleProps {
  pc: number[];
  mobile?: number[];
}

function DefaultImage({
  imageSrc,
  imageAlt,
  className,
  onError,
  ...rest
}: DefaultImageProps & StyleProps) {
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

const DefaultImageAtom = styled.img<StyleProps>`
  width: ${({ pc }) => pc[0]}px;
  height: ${({ pc }) => pc[1]}px;
  &.bookimage {
    border-radius: 0px 5px 5px 0px;
    box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.2);
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: ${({ mobile }) => mobile && mobile[0]}px;
    height: ${({ mobile }) => mobile && mobile[1]}px;
    margin: 0 auto;
  }
`;
