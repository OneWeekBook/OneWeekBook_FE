import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CategoryResponseTypes } from 'types/response';
import { categoryRequest } from 'redux/reducers/categoryReducer';
import { libraryInit } from 'redux/reducers/libraryReducer';
import { searchInit } from 'redux/reducers/searchReducer';
import { searchNone } from 'redux/reducers/funcReducer';
import { AppStateType } from 'redux/reducers';
import { categoryInit } from 'constants/content';
import Container from 'common/Container';
import SearchBookForm from 'components/modules/forms/SearchBookForm';
import CategoryList from 'components/modules/lists/CategoryList';
import SearchList from 'components/modules/lists/SearchList';
import CategoryMobileList from 'components/modules/lists/CategoryMobileList';

function index() {
  const dispatch = useDispatch();
  const categories = useSelector(
    (state: AppStateType) => state.category.categories,
  );
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryResponseTypes[]
  >([categoryInit]);
  const [curChildCategory, setCurChildCategory] = useState<
    CategoryResponseTypes[]
  >([categoryInit]);
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

  const getFilterChildCategories = useCallback(
    (categoriesData: CategoryResponseTypes[], id: number) => {
      const parent = categoriesData.filter(
        (item: CategoryResponseTypes) => item.categoryId === id,
      );
      const child = categoriesData.filter(
        (item: CategoryResponseTypes) => item.parentId === id,
      );
      setCurParentCategory(parent);
      setChildCategory(child);
      setCurChildCategory([categoryInit]);
    },
    [],
  );

  const handleCategoryPeek = useCallback(
    (categoriesData: CategoryResponseTypes[], id: number) => {
      const result = categoriesData.filter(
        (item: CategoryResponseTypes) => item.categoryId === id,
      );
      setCurChildCategory(result);
    },
    [],
  );

  useEffect(() => {
    dispatch(searchInit());
    dispatch(categoryRequest());
    return () => {
      dispatch(libraryInit());
      dispatch(searchNone());
    };
  }, []);

  useEffect(() => {
    getFilterParentCategories(categories);
  }, [categories]);

  return (
    <Container>
      <CategoryListContainer>
        <CategoryList
          categoryTitle="전체 카테고리"
          categories={categories}
          catgoryResult={parentCategory}
          currentCategory={curParentCategory}
          handleCategoryFilter={getFilterChildCategories}
        />
        {childCatgory.length > 0 && !!childCatgory[0].categoryId && (
          <CategoryList
            categoryTitle="서브 카테고리"
            categories={categories}
            catgoryResult={childCatgory}
            currentCategory={curChildCategory}
            handleCategoryFilter={handleCategoryPeek}
          />
        )}
      </CategoryListContainer>
      <CategoryListMobileContainer>
        <CategoryMobileList
          categoryTitle="전체 카테고리"
          categories={categories}
          catgoryResult={parentCategory}
          currentCategory={curParentCategory}
          handleCategoryFilter={getFilterChildCategories}
        />
        {childCatgory.length > 0 && !!childCatgory[0].categoryId && (
          <CategoryMobileList
            categoryTitle="서브 카테고리"
            categories={categories}
            catgoryResult={childCatgory}
            currentCategory={curChildCategory}
            handleCategoryFilter={handleCategoryPeek}
          />
        )}
      </CategoryListMobileContainer>
      <SearchBookForm
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
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: none;
  }
`;

const CategoryListMobileContainer = styled.div`
  display: none;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    display: block;
  }
`;
