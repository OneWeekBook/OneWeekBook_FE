import styled from 'styled-components';
import { PaginationTypes } from 'types/module';
import DefaultButton from 'components/atoms/buttons/DefaultButton';

function Pagination({ totalPage, index, setIndex }: PaginationTypes) {
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1 - 1);

  if (totalPage > 1) {
    return (
      <PaginationContainer>
        {pages.map((item) => (
          <DefaultButton
            key={item}
            className="pagination"
            content={item + 1}
            handleClick={() => setIndex(item)}
            isBtnClick={item === index}
            height={5}
          />
        ))}
      </PaginationContainer>
    );
  }
  return null;
}

export default Pagination;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
  height: 15px;
`;
