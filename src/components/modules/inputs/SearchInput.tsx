import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CategoryItemTypes } from 'types/book';
import { AppStateType } from 'redux/reducers';
import { SearchInit, SearchRequest } from 'redux/reducers/Search';
import { searchNone } from 'redux/reducers/Func';
import useDebounce from 'hooks/useDebounce';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultInput from 'components/atoms/inputs/DefaultInput';

interface SearchInputTypes {
  curSubCategory: CategoryItemTypes[];
  curParentCategory: CategoryItemTypes[];
}

function SearchInput({ curSubCategory, curParentCategory }: SearchInputTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const books = useSelector(
    (state: AppStateType) => state.search.books,
    shallowEqual,
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
      } else if (!!curSubCategory[0].categoryId && !search) {
        options.d_categ = curSubCategory[0].categoryId;
        options.title = curSubCategory[0].categoryName?.split('/')[0];
      } else if (!!curParentCategory[0].categoryId && !search) {
        options.d_categ = curParentCategory[0].categoryId;
        options.title = curParentCategory[0].categoryName?.split('/')[0];
      } else {
        options.title = search;
      }
      dispatch(SearchInit());
      dispatch(SearchRequest({ ...options }));
    },
    [search, curSubCategory, curParentCategory],
  );

  const handleClick = () => {
    if (curSubCategory[0].categoryId && search) {
      navigate(
        `/category/result?${curParentCategory[0].categoryName}=${curParentCategory[0].categoryId}&${curSubCategory[0].categoryName}=${curSubCategory[0].categoryId}&search=${search}`,
      );
    } else if (curSubCategory[0].categoryId) {
      navigate(
        `/category/result?${curParentCategory[0].categoryName}=${
          curParentCategory[0].categoryId
        }&${curSubCategory[0].categoryName}=${
          curSubCategory[0].categoryId
        }&search=${curSubCategory[0].categoryName?.split('/')[0]}`,
      );
    } else if (curParentCategory[0].categoryId) {
      navigate(
        `/category/result?${curParentCategory[0].categoryName}=${
          curParentCategory[0].categoryId
        }&search=${curParentCategory[0].categoryName?.split('/')[0]}`,
      );
    } else {
      navigate(`/category/result?&search=${search}`);
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
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
    <SearchInputContainer>
      <SearchInputWrapper>
        <DefaultInput
          value={search}
          handleChange={handleChange}
          placeholder="검색어를 입력해주세요."
          fontSize={1.4}
        />
      </SearchInputWrapper>
      {books.length > 0 && (
        <DefaultButton
          fontSize={1.6}
          content="모두보기"
          handleClick={handleClick}
          height={35}
        />
      )}
    </SearchInputContainer>
  );
}

export default SearchInput;

const SearchInputContainer = styled.div`
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
