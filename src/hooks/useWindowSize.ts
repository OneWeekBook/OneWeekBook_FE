import { useLayoutEffect, useState } from 'react';

function useWindowSize() {
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [itemWidth, setItemWidth] = useState<number>(850);

  useLayoutEffect(() => {
    const updateSize = () => {
      const bannerWidth = window.innerWidth * 0.9 - 10 * 2;
      setWindowWidth(window.innerWidth);
      setItemWidth(bannerWidth > 850 ? 850 : bannerWidth);
    };
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return [windowWidth, itemWidth];
}

export default useWindowSize;
