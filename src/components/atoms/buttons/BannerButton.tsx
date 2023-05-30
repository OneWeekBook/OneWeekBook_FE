import styled from 'styled-components';
import { BannerButtonTypes } from 'types/atom';

function BannerButton({ handleClick, direct, imageSrc }: BannerButtonTypes) {
  return (
    <BannerButtonAtom
      type="button"
      onClick={() => handleClick(-1)}
      direct={direct}
      url={imageSrc}
    />
  );
}

export default BannerButton;

const BannerButtonAtom = styled.button<{ direct: string; url: string }>`
  background: white no-repeat center/20px url(${({ url }) => url});
  box-shadow: 0px 0px 5px #000;
  border-radius: 25px;
  border: none;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: ${({ direct }) => direct === 'prev' && 10}px;
  right: ${({ direct }) => direct === 'next' && 10}px;
  z-index: 1;
  width: 35px;
  height: 35px;
`;
