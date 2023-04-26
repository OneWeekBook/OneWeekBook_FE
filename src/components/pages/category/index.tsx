import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryResponseTypes } from 'types/response';
import { CategoryRequest } from 'redux/reducers/Category';
import { SearchInit } from 'redux/reducers/Search';
import { searchNone, userToggle } from 'redux/reducers/Func';
import { AppStateType } from 'redux/reducers';
import { initialState } from 'contain/category';
import Container from 'common/Container';
import SearchInput from 'components/modules/forms/SearchBookForm';
import CategoryList from 'components/modules/lists/CategoryList';
import SearchList from 'components/modules/lists/SearchList';

function index() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: AppStateType) => state.category.categories,
    shallowEqual,
  );
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryResponseTypes[]
  >([initialState]);
  const [curChildCategory, setCurChildCategory] = useState<
    CategoryResponseTypes[]
  >([initialState]);
  const [parentCategory, setParentCategory] = useState<CategoryResponseTypes[]>(
    [],
  );
  const [childCatgory, setChildCategory] = useState<CategoryResponseTypes[]>(
    [],
  );

  const getFilterParentCategories = useCallback(
    (categories: CategoryResponseTypes[]) => {
      const parent = categories.filter(
        (item: CategoryResponseTypes) => item.parentId === null,
      );
      setParentCategory(parent);
    },
    [categories],
  );

  const getFilterSubCategories = useCallback(
    (categoriesData: CategoryResponseTypes[], id: number) => {
      const parent = categoriesData.filter(
        (item: CategoryResponseTypes) => item.categoryId === id,
      );
      const sub = categoriesData.filter(
        (item: CategoryResponseTypes) => item.parentId === id,
      );
      setCurParentCategory(parent);
      setChildCategory(sub);
      setCurChildCategory([initialState]);
    },
    [],
  );

  const getPeekCategory = useCallback(
    (categoriesData: CategoryResponseTypes[], id: number) => {
      const result = categoriesData.filter(
        (item: CategoryResponseTypes) => item.categoryId === id,
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
