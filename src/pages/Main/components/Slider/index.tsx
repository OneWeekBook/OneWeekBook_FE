import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import useInterval from 'hooks/useInterval';
import useWindowSize from 'hooks/useWindowSize';
import SlideButton from './SlideButton';

const SlidePCItems = [
  { id: 1, img: `/assets/slide/slidePC_one.png` },
  { id: 2, img: `/assets/slide/slidePC_two.png` },
];

const SlideMobileItems = [
  { id: 1, img: `/assets/slide/slideMobile_one.png` },
  { id: 2, img: `/assets/slide/slideMobile_two.png` },
];

type SlideItemsType = {
  id: number;
  img: string;
};

function Index() {
  const itemSize = SlidePCItems.length;
  const addItemSize = 2;
  const [windowWidth, windowHeight] = useWindowSize();
  const [curIndex, setCurIndex] = useState<number>(addItemSize);
  const transitionStyle = `transform 500ms ease 0s`;
  const [transition, setTransition] = useState<string>(transitionStyle);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const isResizing = useRef<boolean>(false);

  const setPCSlides = () => {
    const addedStart = [];
    const addedEnd = [];
    let index = 0;
    while (index < addItemSize) {
      addedEnd.push(SlidePCItems[index % itemSize]);
      addedStart.unshift(SlidePCItems[itemSize - 1 - (index % itemSize)]);
      index += 1;
    }
    return [...addedStart, ...SlidePCItems, ...addedEnd];
  };

  const setMobileSlides = () => {
    const addedStart = [];
    const addedEnd = [];
    let index = 0;
    while (index < addItemSize) {
      addedEnd.push(SlideMobileItems[index % itemSize]);
      addedStart.unshift(SlideMobileItems[itemSize - 1 - (index % itemSize)]);
      index += 1;
    }
    return [...addedStart, ...SlideMobileItems, ...addedEnd];
  };

  const pcSlides = setPCSlides();

  const mobileSlides = setMobileSlides();

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
    !isSwiping ? 3000 : null,
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

  return (
    <Wrapper>
      <Slider>
        <SlideButton onClick={handleSwipe} />
        <SlideListWrapper>
          <SlideWrapper
            index={curIndex}
            len={pcSlides.length}
            transition={transition}
            onMouseOver={() => setIsSwiping(true)}
            onMouseOut={() => setIsSwiping(false)}
          >
            {newItemWidth > 849 ? (
              <>
                {pcSlides.map((item: SlideItemsType, index: number) => {
                  return (
                    <SlideItem
                      key={index}
                      style={{ width: newItemWidth || 'auto' }}
                    >
                      <img src={item.img} alt="slide one" />
                    </SlideItem>
                  );
                })}
              </>
            ) : (
              <>
                {mobileSlides.map((item: SlideItemsType, index: number) => {
                  return (
                    <SlideItem
                      key={index}
                      style={{ width: newItemWidth || 'auto' }}
                    >
                      <img src={item.img} alt="slide one" />
                    </SlideItem>
                  );
                })}
              </>
            )}
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
  margin: 20px auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 90%;
  }
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

const SlideItem = styled.div`
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
