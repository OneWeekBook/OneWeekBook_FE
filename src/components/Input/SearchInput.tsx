import { useEffect } from 'react';
import styled from 'styled-components';
import useDebounce from 'hooks/useDebounce';
import {
  SearchInputOptionTypes,
  SearchInputStyleTypes,
} from 'types/components';

function SearchInput({
  search,
  setSearch,
  handleFetch,
  border,
  borderRadius,
  fontSize,
  padding,
  focusBorder,
}: SearchInputOptionTypes & SearchInputStyleTypes) {
  const debouncedSearch = useDebounce(search, 500);
  useEffect(() => {
    if (debouncedSearch) {
      handleFetch(debouncedSearch);
    }
  }, [debouncedSearch]);

  return (
    <Input
      type="text"
      placeholder="검색어를 입력해주세요."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      border={border}
      borderRadius={borderRadius}
      fontSize={fontSize}
      padding={padding}
      focusBorder={focusBorder}
    />
  );
}

export default SearchInput;

const Input = styled.input<SearchInputStyleTypes>`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: ${({ borderRadius }) => borderRadius}px;
  border: ${({ border }) => border};
  font-size: 14px;
  padding: 0 10px;
  :focus {
    outline: none;
    border: ${({ focusBorder }) => focusBorder};
    transition: 0.5s;
  }
`;
