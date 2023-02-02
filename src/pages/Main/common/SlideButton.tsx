import React from 'react';
import styled, { css } from 'styled-components';

interface PropsType {
  dist: string;
  idx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
  totalPage: number;
}

function SlideButton({ dist, idx, setIdx, totalPage }: PropsType) {
  const moveClick = () => {
    if (dist === 'prev' && idx - 1 >= 0) setIdx(idx - 1);
    else if (dist === 'next' && idx + 1 <= totalPage) setIdx(idx + 1);
  };

  return (
    <ButtonWrapper type="button" dist={dist} onClick={moveClick}>
      <img
        src={`${process.env.PUBLIC_URL}/assets/arrow/white-arrow.png`}
        alt="slide-button"
      />
    </ButtonWrapper>
  );
}

export default SlideButton;

const ButtonWrapper = styled.button<{ dist: string }>`
  opacity: 0.1;
  cursor: pointer;
  position: absolute;
  width: 50px;
  height: 400px;
  top: 50%;
  background-color: #f07055;
  border: none;
  transform: translateY(-50%);
  &:hover {
    opacity: 0.9;
  }
  ${({ dist }) =>
    dist === 'prev'
      ? css`
          left: 0;
          border-radius: 0px 50px 50px 0px;
          img {
            width: 100%;
          }
        `
      : css`
          right: 0;
          border-radius: 50px 0px 0px 50px;
          img {
            width: 100%;
            transform: rotate(180deg);
          }
        `}
`;
