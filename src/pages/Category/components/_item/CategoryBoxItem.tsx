import React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
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
  box-shadow: 3px 3px 3px ${({ isSelected }) =>
    isSelected ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0.2)'};
  background-color: ${({ isSelected }) =>
    isSelected
      ? `${theme.color.COLOR_MAIN}`
      : `${theme.color.COLOR_LAYOUT_TWO}`};
  border: none;
  border-radius: 10px;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  height: 40px;
  padding: 0 20px;
  margin: 10px 10px 5px 0;
  transition: 0.5s;
  :hover {
    background-color: ${theme.color.COLOR_MAIN};
    box-shadow: 3px 8px 3px rgba(0, 0, 0, 0.5);
    margin: 5px 10px 10px 0;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {\
    font-size: 14px;
    padding: 0 10px;
    height: 35px;
  }
`;
