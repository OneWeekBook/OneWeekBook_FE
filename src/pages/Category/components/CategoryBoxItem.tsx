import React from 'react';
import styled from 'styled-components';
import { CategoryItemTypes } from './CategoryList';

function CategoryBoxItem({
  categoryId,
  categoryTitle,
}: React.PropsWithChildren<CategoryItemTypes>) {
  return (
    <Wrapper>
      <button type="button">{categoryTitle}</button>
    </Wrapper>
  );
}

export default CategoryBoxItem;

const Wrapper = styled.div`
  height: 100px;
  button {
    width: 100%;
    height: 100%;
    font-size: 20px;
  }
`;
