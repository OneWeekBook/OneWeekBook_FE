import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BannerTypes } from 'types/module';
import useInterval from 'hooks/useInterval';
import useWindowSize from 'hooks/useWindowSize';
import { SLIDE_IMAGE } from 'constants/image';
import { slideMobileItems, slidePCItems } from 'constants/content';
import BannerButton from 'components/atoms/buttons/BannerButton';
import BannerImage from 'components/atoms/images/BannerImage';

function Banner() {
  const itemSize = slidePCItems.length;
  const addItemSize = 2;
  const [windowWidth] = useWindowSize();
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
      addedEnd.push(slidePCItems[index % itemSize]);
      addedStart.unshift(slidePCItems[itemSize - 1 - (index % itemSize)]);
      index += 1;
    }
    return [...addedStart, ...slidePCItems, ...addedEnd];
  };

  const setMobileSlides = () => {
    const addedStart = [];
    const addedEnd = [];
    let index = 0;
    while (index < addItemSize) {
      addedEnd.push(slideMobileItems[index % itemSize]);
      addedStart.unshift(slideMobileItems[itemSize - 1 - (index % itemSize)]);
      index += 1;
    }
    return [...addedStart, ...slideMobileItems, ...addedEnd];
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
    !isSwiping ? 5000 : null,
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
    <BannerModule>
      <BannerButton
        handleClick={() => handleSwipe(-1)}
        direct="prev"
        imageSrc={SLIDE_IMAGE.SLIDE_LEFT}
      />
      <BannerButton
        handleClick={() => handleSwipe(1)}
        direct="next"
        imageSrc={SLIDE_IMAGE.SLIDE_RIGHT}
      />
      <BannerSlider
        index={curIndex}
        len={pcSlides.length}
        transition={transition}
        onMouseOver={() => setIsSwiping(true)}
        onMouseOut={() => setIsSwiping(false)}
      >
        {newItemWidth > 849 ? (
          <>
            {pcSlides.map((item: BannerTypes, index: number) => (
              <BannerImage
                key={index}
                imageSrc={item.img}
                newItemWidth={newItemWidth}
              />
            ))}
          </>
        ) : (
          <>
            {mobileSlides.map((item: BannerTypes, index: number) => (
              <BannerImage
                key={index}
                imageSrc={item.img}
                newItemWidth={newItemWidth}
              />
            ))}
          </>
        )}
      </BannerSlider>
    </BannerModule>
  );
}

export default Banner;

const BannerModule = styled.div`
  position: relative;
  overflow: hidden;
  height: auto;
  border-radius: 10px;
  margin: 20px auto;
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
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const BannerSlider = styled.div<{
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
