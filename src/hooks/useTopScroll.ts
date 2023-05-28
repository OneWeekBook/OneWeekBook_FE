import { useState, useEffect } from 'react';

export default function useTopScroll() {
  const [isShowButton, setIsShowButton] = useState(false);

  const handleTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleShowButton = () => {
      if (window.scrollY > 500) {
        setIsShowButton(true);
        return;
      }
      setIsShowButton(false);
    };
    window.addEventListener('scroll', handleShowButton);
    return () => {
      window.removeEventListener('scroll', handleShowButton);
    };
  }, []);

  return { isShowButton, handleTopScroll };
}
