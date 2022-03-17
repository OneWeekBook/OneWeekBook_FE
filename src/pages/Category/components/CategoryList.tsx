import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchRequest } from 'redux/reducers/Search';
import styled from 'styled-components';
import { CategoryItemTypes } from 'types/book';
import CategoryBoxItem from './_item/CategoryBoxItem';
import SubCategoryBoxItem from './_item/SubCategoryBoxItem';

function CategoryList() {
  const dispatch = useDispatch();
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryItemTypes[]
  >([
    {
      id: 0,
      parentId: null,
      categoryId: 0,
      categoryName: 'example',
      depth: 1,
    },
  ]);
  const [subCatgory, setSubCategory] = useState<CategoryItemTypes[]>([]);
  const [curSubCategory, setCurSubCategory] = useState<CategoryItemTypes[]>([
    {
      id: 0,
      parentId: 0,
      categoryId: 0,
      categoryName: 'example',
      depth: 2,
    },
  ]);
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
      {subCatgory.length > 0 && (
        <SubCategoryWrapper>
          <p className="subTitle">
            {curParentCategory[0]?.categoryName} 하위 카테고리
          </p>
          <SubCategoryList>
            {subCatgory.map((item: CategoryItemTypes) => (
              <SubCategoryBoxItem
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
      <InputWrapper>
        <div className="search">
          <p>통합 검색</p>
          <Input
            type="text"
            placeholder="검색어를 입력해주세요."
            defaultValue={search}
            onBlur={(e) => setSearch(e.target.value)}
          />
        </div>
        {search && <p>모두보기</p>}
      </InputWrapper>
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
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    margin: auto;
    width: 95%;
    .mainTitle {
      font-size: 20px;
    }
  }
`;

const CategoryGridWrapper = styled.div`
  margin: 10px auto 20px;
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
  display: flex;
  flex-wrap: wrap;
  border-top: 2px solid #e6e6e6;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .search {
    display: flex;
    align-items: center;
  }
  p {
    font-size: 20px;
    font-weight: 600;
    margin-right: 10px;
    @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
      font-size: 16px;
    }
  }
`;

const Input = styled.input`
  width: 200px;
  height: 35px;
  font-size: 18px;
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid #e6e6e6;
  :focus {
    outline: none;
    border: 1px solid #08c1e9;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 150px;
    height: 35px;
  }
`;
