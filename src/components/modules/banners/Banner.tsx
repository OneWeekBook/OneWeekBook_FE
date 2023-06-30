import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import { BannerTypes } from 'types/module';
import useInterval from 'hooks/useInterval';
import useWindowSize from 'hooks/useWindowSize';
import { BANNER_IMAGE } from 'constants/image';
import { BANNER_ITEM_SIZE } from 'constants/content';
import { setMobileSlides, setPCSlides } from 'utils/screenSildeHandler';
import BannerButton from 'components/atoms/buttons/BannerButton';
import BannerImage from 'components/atoms/images/BannerImage';

function Banner() {
  const [windowWidth, itemWidth] = useWindowSize();
  const [curIndex, setCurIndex] = useState<number>(BANNER_ITEM_SIZE);
  const transitionStyle = `transform 500ms ease 0s`;
  const [transition, setTransition] = useState<string>(transitionStyle);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const isResizing = useRef<boolean>(false);
  const pcSlides = setPCSlides();
  const mobileSlides = setMobileSlides();

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
    if (index - BANNER_ITEM_SIZE < 0) {
      index += BANNER_ITEM_SIZE;
      replaceSlide(index);
    } else if (index - BANNER_ITEM_SIZE >= BANNER_ITEM_SIZE) {
      index -= BANNER_ITEM_SIZE;
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
        imageSrc={BANNER_IMAGE.SLIDE_LEFT}
      />
      <BannerButton
        handleClick={() => handleSwipe(1)}
        direct="next"
        imageSrc={BANNER_IMAGE.SLIDE_RIGHT}
      />
      <BannerSlider
        index={curIndex}
        len={pcSlides.length}
        transition={transition}
        onMouseOver={() => setIsSwiping(true)}
        onMouseOut={() => setIsSwiping(false)}
      >
        {itemWidth > 849 ? (
          <>
            {pcSlides.map((item: BannerTypes, index: number) => (
              <BannerImage
                key={index}
                imageSrc={item.img}
                newItemWidth={itemWidth}
              />
            ))}
          </>
        ) : (
          <>
            {mobileSlides.map((item: BannerTypes, index: number) => (
              <BannerImage
                key={index}
                imageSrc={item.img}
                newItemWidth={itemWidth}
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
