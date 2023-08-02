import { useState } from 'react';
import styled from 'styled-components';
import { CategoryListProps } from 'types/module';
import { CategoryResponseTypes } from 'types/response';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';
import CategoryForm from '../forms/CategoryForm';

function CategoryMobileList({
  categoryTitle,
  categories,
  catgoryResult,
  currentCategory,
  handleCategoryFilter,
}: CategoryListProps) {
  const [isActionSheet, setIsActionSheet] = useState(false);

  const handleToggleActionSheet = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setIsActionSheet(!isActionSheet);
  };

  const handleFilteredMobile = (
    categories: CategoryResponseTypes[],
    categoryId: number,
  ) => {
    handleCategoryFilter(categories, categoryId);
    setIsActionSheet(!isActionSheet);
  };

  return (
    <CategoryMobileListModule>
      <DefaultLabel content={categoryTitle} align="left" fontSize={2.4} />
      <DefaultButton
        handleClick={handleToggleActionSheet}
        fontSize={1.8}
        width={200}
        content={
          currentCategory[0].categoryName === 'example'
            ? '선택해주세요'
            : currentCategory[0].categoryName
        }
      />
      {isActionSheet && (
        <CategoryForm
          categories={categories}
          catgoryResult={catgoryResult}
          categoryTitle={categoryTitle}
          currentCategory={currentCategory}
          handleCategoryFilter={handleFilteredMobile}
          handleToggleActionSheet={handleToggleActionSheet}
        />
      )}
    </CategoryMobileListModule>
  );
}

export default CategoryMobileList;

const CategoryMobileListModule = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
`;
