import { useEffect, useState } from 'react';
import styled from 'styled-components';

function TopButton() {
  const [scrollHeight, setScrollHeight] = useState(0);
  const onScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollHeight(window.scrollY);
    });
  }, [scrollHeight]);

  return (
    <TopButtonAtom
      type="button"
      onClick={onScrollTop}
      scroll={scrollHeight > 500}
    >
      TOP
    </TopButtonAtom>
  );
}

export default TopButton;

const TopButtonAtom = styled.button<{ scroll: boolean }>`
  display ${({ scroll }) => (scroll ? 'block' : 'none')};
  position: fixed;
  z-index: 100;
  top: 10px;
  right: 10px;
  width: 70px;
  height: 50px;
  border-radius: 10px;
  border: none;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  color: ${({ theme }) => theme.color.COLOR_WHITE};
  cursor: pointer;
  font-size: 24px;
  font-weight: 700;
`;
