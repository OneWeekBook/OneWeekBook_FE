import DefaultButton from 'components/atoms/buttons/DefaultButton';
import styled from 'styled-components';

interface PaginationProps {
  totalPage: number;
  idx: number;
  setIdx: React.Dispatch<React.SetStateAction<number>>;
}

function Pagination({ totalPage, idx, setIdx }: PaginationProps) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1 - 1);

  return (
    <PaginationContainer>
      {pages.map((item) => (
        <DefaultButton
          key={item}
          handleClick={() => setIdx(item)}
          isBtnClick={item === idx}
          height={10}
        />
      ))}
    </PaginationContainer>
  );
}

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 40px;
`;
