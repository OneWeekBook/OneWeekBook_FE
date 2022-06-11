import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchInit, SearchRequest } from 'redux/reducers/Search';
import { CategoryItemTypes } from 'types/book';
import DefaultButton from 'components/Button/DefaultButton';
import SearchInput from 'components/Input/SearchInput';
import CategoryBoxItem from './_item/CategoryBoxItem';

const initialState = {
  id: 0,
  parentId: null,
  categoryId: 0,
  categoryName: 'example',
  depth: 1,
};

function CategoryList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryItemTypes[]
  >([initialState]);

  const [subCatgory, setSubCategory] = useState<CategoryItemTypes[]>([]);
  const [curSubCategory, setCurSubCategory] = useState<CategoryItemTypes[]>([
    initialState,
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

  const handleFetch = useCallback(
    (search: string) => {
      const options: {
        start: number;
        display: number;
        d_categ?: string | number;
        title?: string;
      } = {
        start: 1,
        display: 8,
      };

      if (!!curSubCategory[0].categoryId && search) {
        options.d_categ = curSubCategory[0].categoryId;
        options.title = search;
      } else if (!!curParentCategory[0].categoryId && search) {
        options.d_categ = curParentCategory[0].categoryId;
        options.title = search;
      } else {
        options.title = search;
      }

      dispatch(SearchRequest({ ...options }));
    },
    [search, curSubCategory, curParentCategory],
  );

  const handleClick = () => {
    if (curSubCategory[0].categoryId) {
      navigate(
        `/category/result?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&${curSubCategory[0].categoryName}=${curSubCategory[0].categoryId}&search=${search}`,
      );
    } else if (curParentCategory[0].categoryId) {
      navigate(
        `/category/result?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&search=${search}`,
      );
    } else {
      navigate(`/category/result?&search=${search}`);
    }
  };

  useEffect(() => {
    dispatch(CategoryRequest());
    return () => {
      dispatch(SearchInit());
    };
  }, []);

  useEffect(() => {
    getFilterParentCategories(categories);
  }, [categories]);

  useEffect(() => {
    handleFetch(search);
  }, [curSubCategory, curParentCategory]);

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
      <InputWrapper>
        <div className="search">
          <p>통합 검색</p>
          <SearchInputWrapper>
            <SearchInput
              search={search}
              setSearch={setSearch}
              handleFetch={handleFetch}
              border="1px solid #e6e6e6"
              borderRadius={10}
              fontSize={14}
              padding={[10, 10, 10, 10]}
              focusBorder="1px solid #08c1e9"
            />
          </SearchInputWrapper>
        </div>
        {search && (
          <DefaultButton
            pc={[80, 20]}
            onClick={handleClick}
            isHover
            hoverColor="#1e90ff"
            fontSize={[18, 18]}
            fontWeight={600}
            title="모두보기"
          />
        )}
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

const SearchInputWrapper = styled.div`
  width: 250px;
  height: 35px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 150px;
  }
`;
