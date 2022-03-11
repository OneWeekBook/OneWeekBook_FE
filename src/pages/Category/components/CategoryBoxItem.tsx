import React from 'react';
import styled from 'styled-components';
import { CategoryItemTypes } from './CategoryList';

type ClickType = {
  handleClick: (id: number) => void;
};

function CategoryBoxItem({
  categoryId,
  categoryName,
  handleClick,
}: React.PropsWithChildren<CategoryItemTypes> & ClickType) {
  return (
    <Wrapper>
      <button type="button" onClick={() => handleClick(categoryId)}>
        {categoryName}
      </button>
    </Wrapper>
  );
}

export default CategoryBoxItem;

const Wrapper = styled.div`
  height: 150px;
  margin-top: -1px;
  margin-right: -1px;
  button {
    width: 100%;
    height: 100%;
    font-size: 20px;
    background-color: white;
    border: 1px solid #08c1e9;
    :hover {
      background-color: #e6e6e6;
    }
  }
`;
