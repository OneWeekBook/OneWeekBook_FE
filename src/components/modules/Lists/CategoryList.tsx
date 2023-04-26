import styled from 'styled-components';
import { CategoryResponseTypes } from 'types/response';
import { CategoryListProps } from 'types/module';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';

function CategoryList({
  categories,
  catgoryResult,
  currentCategory,
  handleCategoryFilter,
}: CategoryListProps) {
  return (
    <CategoryListContainer>
      <DefaultLabel content="전체 카테고리" align="left" fontSize={2.4} />
      <CategoryTagList>
        {catgoryResult.map((item: CategoryResponseTypes) => (
          <DefaultButton
            key={item.categoryId}
            className="category"
            isBtnClick={item.categoryId === currentCategory[0].categoryId}
            handleClick={() =>
              handleCategoryFilter(categories, item.categoryId)
            }
            content={item.categoryName}
          />
        ))}
      </CategoryTagList>
    </CategoryListContainer>
  );
}

export default CategoryList;

const CategoryListContainer = styled.div``;

const CategoryTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  min-height: 50px;
  button {
    box-sizing: border-box;
    margin: 10px 10px 5px 0;
    padding: 0 20px;
    width: auto;
  }
`;
