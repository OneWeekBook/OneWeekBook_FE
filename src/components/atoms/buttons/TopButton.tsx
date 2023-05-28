import useTopScroll from 'hooks/useTopScroll';
import styled from 'styled-components';

function TopButton() {
  const { isShowButton, handleTopScroll } = useTopScroll();

  return (
    <TopButtonAtom
      type="button"
      onClick={handleTopScroll}
      scroll={isShowButton}
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
