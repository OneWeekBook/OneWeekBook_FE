import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { userToggle } from 'redux/reducers/Func';
import { CategoryItemTypes } from 'types/book';
import { initialState } from 'contain/category';
import Container from 'common/Container';
import SearchInput from 'components/modules/inputs/SearchInput';
import CategoryList from 'components/modules/Lists/CategoryList';
import SearchList from './components/SearchList';

function index() {
  const dispatch = useDispatch();
  const [curParentCategory, setCurParentCategory] = useState<
    CategoryItemTypes[]
  >([initialState]);
  const [curChildCategory, setCurChildCategory] = useState<CategoryItemTypes[]>(
    [initialState],
  );

  useEffect(() => {
    dispatch(userToggle());
  }, []);

  return (
    <Container>
      <CategoryList
        initialState={initialState}
        curParentCategory={curParentCategory}
        setCurParentCategory={setCurParentCategory}
        curChildCategory={curChildCategory}
        setCurChildCategory={setCurChildCategory}
      />
      <SearchInput
        curSubCategory={curChildCategory}
        curParentCategory={curParentCategory}
      />
      <SearchList />
    </Container>
  );
}

export default index;
