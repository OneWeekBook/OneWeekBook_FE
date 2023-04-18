import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryItemTypes } from 'types/book';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchInit } from 'redux/reducers/Search';
import { searchNone } from 'redux/reducers/Func';
import { AppStateType } from 'redux/reducers';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultLabel from 'components/atoms/labels/DefaultLabel';

interface CategoryProps {
  initialState: CategoryItemTypes;
  curParentCategory: CategoryItemTypes[];
  setCurParentCategory: React.Dispatch<
    React.SetStateAction<CategoryItemTypes[]>
  >;
  curChildCategory: CategoryItemTypes[];
  setCurChildCategory: React.Dispatch<
    React.SetStateAction<CategoryItemTypes[]>
  >;
}

function CategoryList({
  initialState,
  curParentCategory,
  setCurParentCategory,
  curChildCategory,
  setCurChildCategory,
}: CategoryProps) {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: AppStateType) => state.category.categories,
    shallowEqual,
  );
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);
  const [subCatgory, setSubCategory] = useState<CategoryItemTypes[]>([]);

  const getFilterParentCategories = useCallback(
    (categories: CategoryItemTypes[]) => {
      const parent = categories.filter(
        (item: CategoryItemTypes) => item.parentId === null,
      );
      setParentCategory(parent);
    },
    [categories],
  );

  const getFilterSubCategories = useCallback(
    (categoriesData: CategoryItemTypes[], id: number) => {
      const parent = categoriesData.filter(
        (item: CategoryItemTypes) => item.categoryId === id,
      );
      const sub = categoriesData.filter(
        (item: CategoryItemTypes) => item.parentId === id,
      );
      setCurParentCategory(parent);
      setSubCategory(sub);
      setCurChildCategory([initialState]);
    },
    [],
  );

  const getPeekCategory = useCallback(
    (categoriesData: CategoryItemTypes[], id: number) => {
      const result = categoriesData.filter(
        (item: CategoryItemTypes) => item.categoryId === id,
      );
      setCurChildCategory(result);
    },
    [],
  );

  useEffect(() => {
    dispatch(CategoryRequest());
    return () => {
      dispatch(SearchInit());
      dispatch(searchNone());
    };
  }, []);

  useEffect(() => {
    getFilterParentCategories(categories);
  }, [categories]);

  return (
    <CategoryListContainer>
      <DefaultLabel content="전체 카테고리" align="left" fontSize={2.4} />
      <ParentCategory>
        {parentCategory.map((item: CategoryItemTypes) => (
          <DefaultButton
            key={item.categoryId}
            className="category"
            isBtnClick={item.categoryId === curParentCategory[0].categoryId}
            handleClick={() =>
              getFilterSubCategories(categories, item.categoryId)
            }
            content={item.categoryName}
          />
        ))}
      </ParentCategory>
      {subCatgory.length > 0 && !!subCatgory[0].categoryId && (
        <>
          <DefaultLabel
            content={`${curParentCategory[0]?.categoryName} 하위 카테고리`}
            align="left"
            fontSize={2}
          />
          <ChildCategory>
            {subCatgory.map((item: CategoryItemTypes) => (
              <DefaultButton
                key={item.categoryId}
                className="category"
                isBtnClick={item.categoryId === curChildCategory[0].categoryId}
                handleClick={() => getPeekCategory(categories, item.categoryId)}
                content={item.categoryName}
              />
            ))}
          </ChildCategory>
        </>
      )}
    </CategoryListContainer>
  );
}

export default CategoryList;

const CategoryListContainer = styled.div`
  width: 100%;
  margin: 50px auto 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    width: 95%;
  }
`;

const ParentCategory = styled.div`
  margin: 10px auto 20px;
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
  button {
    box-sizing: border-box;
    margin: 10px 10px 5px 0;
    padding: 0 20px;
    width: auto;
  }
`;

const ChildCategory = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
  button {
    box-sizing: border-box;
    margin: 10px 10px 5px 0;
    padding: 0 20px;
    width: auto;
  }
`;
