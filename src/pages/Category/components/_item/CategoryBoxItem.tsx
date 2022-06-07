import React from 'react';
import styled from 'styled-components';
import { CategoryItemTypes } from 'types/book';
import { BoxItemType } from 'types/func';

function CategoryBoxItem({
  categoryId,
  categoryName,
  curCategory,
  handleClick,
}: React.PropsWithChildren<CategoryItemTypes> & BoxItemType) {
  return (
    <MainCategoryButton
      type="button"
      onClick={() => handleClick(categoryId)}
      isSelected={categoryId === curCategory[0].categoryId}
    >
      {categoryName}
    </MainCategoryButton>
  );
}

export default CategoryBoxItem;

const MainCategoryButton = styled.button<{ isSelected: boolean }>`
  box-sizing: border-box;
  box-shadow: 3px 3px 3px #000;
  background-color: ${({ isSelected }) => (isSelected ? '#1e90ff' : '#08c1e9')};
  border: none;
  border-radius: 10px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  height: 40px;
  padding: 0 20px;
  margin-right: 10px;
  margin-bottom: 10px;
  :hover {
    background-color: #1e90ff;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {\
    font-size: 14px;
    padding: 0 10px;
    height: 35px;
  }
`;
