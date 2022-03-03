import React, { useState } from 'react';
import styled from 'styled-components';

const SlideItems = [
  { id: 1, color: '#33a' },
  { id: 2, color: '#8c9' },
  { id: 3, color: '#e6e6e6' },
];

type SlideItemsType = {
  id: number;
  color: string;
};

function Index() {
  const [curIndex, setCurIndex] = useState<number>(0);
  const handleSwipe = (num: number) => {
    setCurIndex((curIndex) => curIndex + num);
  };
  return (
    <Wrapper>
      <Slider>
        <button type="button" onClick={() => handleSwipe(-1)}>
          prev
        </button>
        <button type="button" onClick={() => handleSwipe(1)}>
          next
        </button>
        <SlideListWrapper>
          <SlideWrapper index={curIndex} len={SlideItems.length}>
            {SlideItems.map((item: SlideItemsType) => (
              <SlideItem key={item.id} color={item.color} />
            ))}
          </SlideWrapper>
        </SlideListWrapper>
      </Slider>
    </Wrapper>
  );
}

export default Index;

const Wrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
`;

const Slider = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -ms-touch-action: pan-y;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
`;

const SlideListWrapper = styled.div`
  position: relative;
  overflow: hidden;
  display: block;
  margin: 0;
`;

const SlideWrapper = styled.div<{ index: number; len: number }>`
  position: relative;
  position: relative;
  left: 50%;
  top: 0;
  display: flex;
  flex-direction: row;
  text-align: left;
  width: fit-content;
  transform: ${({ index, len }) =>
    `translateX(${(-100 / len) * (0.5 + index)}%)`};
  transition: -webkit-transform 500ms ease 0s;
  transition: transform 500ms ease 0s;
`;

const SlideItem = styled.div<{ color: string }>`
  width: 500px;
  height: 200px;
  margin: 0 10px;
  background-color: ${({ color }) => color};
  border: 3px solid blue;
`;
