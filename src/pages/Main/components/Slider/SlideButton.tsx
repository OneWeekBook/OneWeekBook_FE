import React from 'react';
import styled from 'styled-components';

type PropsType = {
  onClick: (idx: number) => void;
};

function SlideButton({ onClick }: PropsType) {
  return (
    <>
      <PrevButton type="button" onClick={() => onClick(-1)}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/slide-left-arrow.svg`}
          alt="left-arrow"
          width={20}
          height={20}
        />
      </PrevButton>
      <NextButton type="button" onClick={() => onClick(1)}>
        <img
          src={`${process.env.PUBLIC_URL}/assets/slide-right-arrow.svg`}
          alt="right-arrow"
          width={20}
          height={20}
        />
      </NextButton>
    </>
  );
}

export default SlideButton;

const PrevButton = styled.button`
  box-sizing: border-box;
  border-radius: 25px;
  border: none;
  background-color: white;
  padding: 10px 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 10px;
  z-index: 1;
  width: 40px;
  height: 40px;
`;

const NextButton = styled.button`
  box-sizing: border-box;
  border-radius: 25px;
  border: none;
  background-color: white;
  padding: 10px 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
  z-index: 1;
  width: 40px;
  height: 40px;
`;
