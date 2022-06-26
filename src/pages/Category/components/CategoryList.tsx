import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchInit } from 'redux/reducers/Search';
import { searchNone } from 'redux/reducers/Func';
import { AppStateType } from 'redux/reducers';
import { CategoryItemTypes } from 'types/book';
import CategoryBoxItem from './_item/CategoryBoxItem';
import InputWrapper from './InputWrapper';

const initialState = {
  id: 0,
  parentId: null,
  categoryId: 0,
  categoryName: 'example',
  depth: 1,
};

function CategoryList() {
  const dispatch = useDispatch();
  const { categories } = useSelector((state: AppStateType) => state.category);
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryItemTypes[]
  >([initialState]);
  const [subCatgory, setSubCategory] = useState<CategoryItemTypes[]>([]);
  const [curSubCategory, setCurSubCategory] = useState<CategoryItemTypes[]>([
    initialState,
  ]);
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
      setCurSubCategory([initialState]);
    },
    [],
  );

  const getPeekCategory = useCallback(
    (categoriesData: CategoryItemTypes[], id: number) => {
      const result = categoriesData.filter(
        (item: CategoryItemTypes) => item.categoryId === id,
      );
      setCurSubCategory(result);
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
    <Wrapper>
      <p className="mainTitle">전체 카테고리</p>
      <CategoryGridWrapper>
        {parentCategory.map((item: CategoryItemTypes) => (
          <CategoryBoxItem
            key={item.categoryId}
            curCategory={curParentCategory}
            handleClick={(id: number) => {
              getFilterSubCategories(categories, id);
            }}
            {...item}
          />
        ))}
      </CategoryGridWrapper>
      {subCatgory.length > 0 && !!subCatgory[0].categoryId && (
        <SubCategoryWrapper>
          <p className="subTitle">
            {curParentCategory[0]?.categoryName} 하위 카테고리
          </p>
          <SubCategoryList>
            {subCatgory.map((item: CategoryItemTypes) => (
              <CategoryBoxItem
                key={item.categoryId}
                curCategory={curSubCategory}
                handleClick={(id: number) => {
                  getPeekCategory(categories, id);
                }}
                {...item}
              />
            ))}
          </SubCategoryList>
        </SubCategoryWrapper>
      )}
      <InputWrapper
        curSubCategory={curSubCategory}
        curParentCategory={curParentCategory}
      />
    </Wrapper>
  );
}

export default CategoryList;

const Wrapper = styled.div`
  width: 100%;
  .mainTitle {
    font-size: 24px;
    font-weight: 700;
    margin: 10px auto;
  }
  @media (max-width: ${({ theme: { device } }) => device.pc.minWidth}px) {
    margin: auto;
    width: 95%;
    .mainTitle {
      font-size: 20px;
    }
  }
`;

const CategoryGridWrapper = styled.div`
  margin: 10px auto 20px;
  min-height: 150px;
  display: flex;
  flex-wrap: wrap;
`;

const SubCategoryWrapper = styled.div`
  margin-bottom: 20px;
  .subTitle {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
    @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
      font-size: 18px;
    }
  }
`;

const SubCategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  border-top: 2px solid #e6e6e6;
`;
