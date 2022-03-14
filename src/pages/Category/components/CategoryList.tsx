import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchRequest } from 'redux/reducers/Search';
import styled from 'styled-components';
import CategoryBoxItem from './_item/CategoryBoxItem';
import SubCategoryBoxItem from './_item/SubCategoryBoxItem';

export type CategoryItemTypes = {
  id: number;
  parentId: number | null;
  categoryId: number;
  categoryName: string;
  depth: number;
};

function CategoryList() {
  const dispatch = useDispatch();
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryItemTypes[]
  >([]);
  const [subCatgory, setSubCategory] = useState<CategoryItemTypes[]>([]);
  const [curSubCategory, setCurSubCategory] = useState<CategoryItemTypes[]>([]);
  const [search, setSearch] = useState<string>('');
  const { categories } = useSelector((state: any) => state.category);

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
  }, []);

  useEffect(() => {
    getFilterParentCategories(categories);
  }, [categories]);

  useEffect(() => {
    if (curSubCategory[0] && search) {
      dispatch(
        SearchRequest({
          d_categ: curSubCategory[0].categoryId,
          title: search,
          start: 1,
          display: 10,
        }),
      );
    } else if (search) {
      dispatch(
        SearchRequest({
          title: search,
          start: 1,
          display: 10,
        }),
      );
    }
  }, [search, curSubCategory]);

  return (
    <Wrapper>
      <CategoryGridWrapper>
        {parentCategory.map((item: CategoryItemTypes) => (
          <CategoryBoxItem
            key={item.categoryId}
            handleClick={(id: number) => {
              getFilterSubCategories(categories, id);
            }}
            {...item}
          />
        ))}
      </CategoryGridWrapper>
      {subCatgory.length > 0 && (
        <SubCategoryWrapper>
          <p className="subTitle">
            {curParentCategory[0]?.categoryName} 하위 카테고리
          </p>
          <SubCategoryList>
            {subCatgory.map((item: CategoryItemTypes) => (
              <SubCategoryBoxItem
                key={item.categoryId}
                handleClick={(id: number) => {
                  getPeekCategory(categories, id);
                }}
                {...item}
              />
            ))}
          </SubCategoryList>
        </SubCategoryWrapper>
      )}
      <Input
        type="text"
        placeholder="검색어를 입력해주세요."
        defaultValue={search}
        onBlur={(e) => setSearch(e.target.value)}
      />
    </Wrapper>
  );
}

export default CategoryList;

const Wrapper = styled.div`
  width: 100%;
`;

const CategoryGridWrapper = styled.div`
  margin-top: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;

const SubCategoryWrapper = styled.div`
  margin: 20px auto;
  .subTitle {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 10px;
  }
`;

const SubCategoryList = styled.div`
  display: flex;
  border-top: 2px solid #e6e6e6;
`;

const Input = styled.input`
  width: 100px;
  height: 20px;
`;
