import styled from 'styled-components';
import { PaginationTypes } from 'types/module';
import DefaultButton from 'components/atoms/buttons/DefaultButton';

function Pagination({ totalPage, idx, setIdx }: PaginationTypes) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1 - 1);

  return (
    <PaginationContainer>
      {pages.map((item) => (
        <DefaultButton
          key={item}
          className="pagination"
          handleClick={() => setIdx(item)}
          isBtnClick={item === idx}
          height={5}
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
  height: 15px;
`;
