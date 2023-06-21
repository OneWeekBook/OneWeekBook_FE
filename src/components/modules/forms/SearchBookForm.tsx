import { useCallback, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { SearchInputTypes } from 'types/module';
import { AppStateType } from 'redux/reducers';
import { searchInit, searchRequest } from 'redux/reducers/searchReducer';
import { searchNone } from 'redux/reducers/funcReducer';
import useDebounce from 'hooks/useDebounce';
import useRouter from 'hooks/useRouter';
import useInput from 'hooks/useInput';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultInput from 'components/atoms/inputs/DefaultInput';
import { PATH_URL } from 'constants/path';

function SearchBookForm({
  curSubCategory,
  curParentCategory,
}: SearchInputTypes) {
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const [search, changeSearch] = useInput('');
  const debouncedSearch = useDebounce(search, 500);
  const books = useSelector((state: AppStateType) => state.search.books);

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
      } else if (!!curSubCategory[0].categoryId && !search) {
        options.d_categ = curSubCategory[0].categoryId;
        options.title = curSubCategory[0].categoryName?.split('/')[0];
      } else if (!!curParentCategory[0].categoryId && !search) {
        options.d_categ = curParentCategory[0].categoryId;
        options.title = curParentCategory[0].categoryName?.split('/')[0];
      } else {
        options.title = search;
      }
      if (options.d_categ || options.title) {
        dispatch(searchInit());
        dispatch(searchRequest({ ...options }));
      }
    },
    [search, curSubCategory, curParentCategory],
  );

  const handleRouteClick = () => {
    if (curSubCategory[0].categoryId && search) {
      routeTo(
        `${PATH_URL.SEARCH}?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&${curSubCategory[0].categoryName}=${curSubCategory[0].categoryId}&search=${search}`,
      );
    } else if (curSubCategory[0].categoryId) {
      routeTo(
        `${PATH_URL.SEARCH}?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&${curSubCategory[0].categoryName}=${curSubCategory[0].categoryId}&search=${curSubCategory[0].categoryName}`,
      );
    } else if (curParentCategory[0].categoryId && search) {
      routeTo(
        `${PATH_URL.SEARCH}?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&search=${search}`,
      );
    } else if (curParentCategory[0].categoryId) {
      routeTo(
        `${PATH_URL.SEARCH}?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&search=${curParentCategory[0].categoryName}`,
      );
    } else {
      routeTo(`${PATH_URL.SEARCH}?&search=${search}`);
    }
  };

  useEffect(() => {
    handleFetch(search);
  }, [curSubCategory, curParentCategory]);

  useEffect(() => {
    if (search === '') {
      handleFetch(search);
      dispatch(searchNone());
    }
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      handleFetch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <SearchBookModule>
      <SearchInputWrapper>
        <DefaultInput
          value={search}
          handleChange={changeSearch}
          placeholder="검색어를 입력해주세요."
          fontSize={1.4}
        />
      </SearchInputWrapper>
      {books.length > 0 && (
        <DefaultButton
          fontSize={1.6}
          content="모두보기"
          handleClick={handleRouteClick}
          height={35}
        />
      )}
    </SearchBookModule>
  );
}

export default SearchBookForm;

const SearchBookModule = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    margin-left: 10px;
  }
`;

const SearchInputWrapper = styled.div`
  width: 300px;
  display: flex;
  align-items: center;
`;
