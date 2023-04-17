import styled from 'styled-components';

interface ImageProps {
  newItemWidth: number;
  imageSrc: string;
}

function BannerImage({ newItemWidth, imageSrc }: ImageProps) {
  return (
    <BannerImageAtom style={{ width: newItemWidth || 'auto' }}>
      <img src={imageSrc} alt="banner img" />
    </BannerImageAtom>
  );
}

export default BannerImage;

const BannerImageAtom = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  margin: 0 10px;
  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    margin: 0 5px;
    img {
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
