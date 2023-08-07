import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';
import styled from 'styled-components';
import { CategoryFormProps } from 'types/module';
import { CategoryResponseTypes } from 'types/response';

function CategoryForm({
  categories,
  catgoryResult,
  categoryTitle,
  currentCategory,
  handleCategoryFilter,
  handleToggleActionSheet,
}: CategoryFormProps) {
  return (
    <ActionSheetOuter
      onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
        handleToggleActionSheet(event)
      }
    >
      <ActionSheetContainer>
        <DefaultLabel content={categoryTitle} fontSize={2.4} />
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
      </ActionSheetContainer>
    </ActionSheetOuter>
  );
}

export default CategoryForm;

const ActionSheetOuter = styled.div`
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const ActionSheetContainer = styled.div`
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.color.COLOR_WHITE};
  box-sizing: border-box;
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  padding: 30px 30px;
  z-index: 1100;
`;

const CategoryTagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  min-height: 50px;
  button {
    box-sizing: border-box;
    margin: 10px 10px 5px 0;
    padding: 0 20px;
    width: auto;
  }
`;
