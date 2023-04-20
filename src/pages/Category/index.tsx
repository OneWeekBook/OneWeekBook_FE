import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryItemTypes } from 'types/book';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchInit } from 'redux/reducers/Search';
import { searchNone, userToggle } from 'redux/reducers/Func';
import { AppStateType } from 'redux/reducers';
import { initialState } from 'contain/category';
import Container from 'common/Container';
import SearchInput from 'components/modules/inputs/SearchInput';
import CategoryList from 'components/modules/Lists/CategoryList';
import SearchList from 'components/modules/Lists/SearchList';

function index() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: AppStateType) => state.category.categories,
    shallowEqual,
  );
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryItemTypes[]
  >([initialState]);
  const [curChildCategory, setCurChildCategory] = useState<CategoryItemTypes[]>(
    [initialState],
  );
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);
  const [childCatgory, setChildCategory] = useState<CategoryItemTypes[]>([]);

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
      setChildCategory(sub);
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

  useEffect(() => {
    dispatch(userToggle());
  }, []);

  return (
    <Container>
      <CategoryListContainer>
        <CategoryList
          categories={categories}
          catgoryResult={parentCategory}
          currentCategory={curParentCategory}
          handleCategoryFilter={getFilterSubCategories}
        />
        {childCatgory.length > 0 && !!childCatgory[0].categoryId && (
          <CategoryList
            categories={categories}
            catgoryResult={childCatgory}
            currentCategory={curChildCategory}
            handleCategoryFilter={getPeekCategory}
          />
        )}
      </CategoryListContainer>
      <SearchInput
        curSubCategory={curChildCategory}
        curParentCategory={curParentCategory}
      />
      <SearchList />
    </Container>
  );
}

export default index;

const CategoryListContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;
