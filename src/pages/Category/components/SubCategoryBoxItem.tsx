import React from 'react';
import styled from 'styled-components';
import { CategoryItemTypes } from './CategoryList';

function SubCategoryBoxItem({
  categoryId,
  categoryTitle,
}: React.PropsWithChildren<CategoryItemTypes>) {
  return <SubCategoryItem>{categoryTitle}</SubCategoryItem>;
}

export default SubCategoryBoxItem;

const SubCategoryItem = styled.p`
  font-size: 20px;
  margin: 10px 20px 10px 0;
`;
