import React from 'react';
import styled from 'styled-components';
import { CategoryItemTypes } from '../CategoryList';

type ClickType = {
  handleClick: (id: number) => void;
};

function SubCategoryBoxItem({
  categoryId,
  categoryName,
  handleClick,
}: React.PropsWithChildren<CategoryItemTypes> & ClickType) {
  return (
    <SubCategoryItem onClick={() => handleClick(categoryId)}>
      {categoryName}
    </SubCategoryItem>
  );
}

export default SubCategoryBoxItem;

const SubCategoryItem = styled.p`
  font-size: 20px;
  margin: 10px 20px 10px 0;
`;
