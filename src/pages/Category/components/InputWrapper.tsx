import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { SearchRequest } from 'redux/reducers/Search';
import { searchNone } from 'redux/reducers/Func';
import { CategoryItemTypes } from 'types/book';
import DefaultButton from 'components/Button/DefaultButton';
import SearchInput from 'components/Input/SearchInput';

type PropsTypes = {
  curSubCategory: CategoryItemTypes[];
  curParentCategory: CategoryItemTypes[];
};

function InputWrapper({ curSubCategory, curParentCategory }: PropsTypes) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const { books } = useSelector((state: AppStateType) => state.search);

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

  useEffect(() => {
    handleFetch(search);
  }, [curSubCategory, curParentCategory]);

  useEffect(() => {
    if (search === '') {
      handleFetch(search);
      dispatch(searchNone());
    }
  }, [search]);

  return (
    <Wrapper>
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
      {books.length > 0 && (
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
    </Wrapper>
  );
}

export default InputWrapper;

const Wrapper = styled.div`
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
