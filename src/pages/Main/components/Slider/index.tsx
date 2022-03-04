import { useInterval } from 'hooks/useInterval';
import React, { useState } from 'react';
import styled from 'styled-components';
import SlideButton from './SlideButton';

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
  const itemSize = SlideItems.length;
  const addItemSize = 2;
  const [curIndex, setCurIndex] = useState<number>(addItemSize);
  const transitionStyle = `transform 500ms ease 0s`;
  const [transition, setTransition] = useState<string>(transitionStyle);

  const setSlides = () => {
    const addedStart = [];
    const addedEnd = [];
    let index = 0;
    while (index < addItemSize) {
      addedEnd.push(SlideItems[index % SlideItems.length]);
      addedStart.unshift(
        SlideItems[SlideItems.length - 1 - (index % SlideItems.length)],
      );
      index += 1;
    }
    return [...addedStart, ...SlideItems, ...addedEnd];
  };

  const slides = setSlides();

  useInterval(() => {
    handleSlide(curIndex + 1);
  }, 2000);

  const replaceSlide = (index: number) => {
    setTimeout(() => {
      setTransition('');
      setCurIndex(index);
    }, 500);
  };

  const handleSlide = (idx: number) => {
    let index = idx;
    setCurIndex(index);
    if (index - addItemSize < 0) {
      index += itemSize;
      replaceSlide(index);
    } else if (index - addItemSize >= itemSize) {
      index -= itemSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  const handleSwipe = (num: number) => {
    handleSlide(curIndex + num);
  };

  const getItemIndex = (idx: number) => {
    let index = idx;
    index -= addItemSize;
    if (index < 0) {
      index += itemSize;
    } else if (index >= itemSize) {
      index -= itemSize;
    }
    return index;
  };

  return (
    <Wrapper>
      <Slider>
        <SlideButton onClick={handleSwipe} />
        <SlideListWrapper>
          <SlideWrapper
            index={curIndex}
            len={slides.length}
            transition={transition}
          >
            {slides.map((item: SlideItemsType, index: number) => {
              const itemIndex = getItemIndex(index);
              return (
                <SlideItem key={index} color={SlideItems[itemIndex].color}>
                  {itemIndex}({index})
                </SlideItem>
              );
            })}
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

const SlideWrapper = styled.div<{
  index: number;
  len: number;
  transition: string;
}>`
  position: relative;
  left: 50%;
  top: 0;
  display: flex;
  flex-direction: row;
  text-align: left;
  width: fit-content;
  transform: ${({ index, len }) =>
    `translateX(${(-100 / len) * (0.5 + index)}%)`};
  transition: -webkit-${({ transition }) => transition};
  transition: ${({ transition }) => transition};
`;

const SlideItem = styled.div<{ color: string }>`
  position: relative;
  width: 1024px;
  height: 400px;
  margin: 0 10px;
  background-color: ${({ color }) => color};
  border: 3px solid blue;
`;
