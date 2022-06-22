import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useInterval from 'hooks/useInterval';
import useWindowSize from 'hooks/useWindowSize';
import SlideButton from './SlideButton';

const SlideItems = [
  { id: 1, color: '#33a' },
  { id: 2, color: '#8c9' },
];

type SlideItemsType = {
  id: number;
  color: string;
};

function Index() {
  const itemSize = SlideItems.length;
  const addItemSize = 2;
  const [windowWidth, windowHeight] = useWindowSize();
  const [curIndex, setCurIndex] = useState<number>(addItemSize);
  const transitionStyle = `transform 500ms ease 0s`;
  const [transition, setTransition] = useState<string>(transitionStyle);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const isResizing = useRef<boolean>(false);

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

  const getNewItemWidth = () => {
    let itemWidth = windowWidth * 0.9 - 10 * 2;
    itemWidth = itemWidth > 850 ? 850 : itemWidth;
    return itemWidth;
  };

  const newItemWidth = getNewItemWidth();

  useEffect(() => {
    isResizing.current = true;
    setIsSwiping(true);
    setTransition('');
    setTimeout(() => {
      isResizing.current = false;
      if (!isResizing.current) setIsSwiping(false);
    }, 1000);
    return () => {
      setIsSwiping(false);
    };
  }, [windowWidth]);

  useInterval(
    () => {
      handleSlide(curIndex + 1);
    },
    !isSwiping ? 2000 : null,
  );

  const replaceSlide = (index: number) => {
    setTimeout(() => {
      setTransition('');
      setCurIndex(index);
    }, 500);
  };

  const handleSlide = async (idx: number) => {
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
    setIsSwiping(true);
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
            onMouseOver={() => setIsSwiping(true)}
            onMouseOut={() => setIsSwiping(false)}
          >
            {slides.map((item: SlideItemsType, index: number) => {
              const itemIndex = getItemIndex(index);
              return (
                <SlideItem
                  key={index}
                  color={SlideItems[itemIndex].color}
                  style={{ width: newItemWidth || 'auto' }}
                >
                  {itemIndex}({item.id})
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
  border-radius: 10px;
  margin-top: 10px;
`;

const Slider = styled.div`
  position: relative;
  display: block;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
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
  width: 100%;
  height: 350px;
  margin: 0 10px;
  background-color: ${({ color }) => color};
  border-radius: 10px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 0 5px;
  }
`;
