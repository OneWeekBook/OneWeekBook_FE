import { lazy, useEffect } from 'react';
import Container from 'common/Container';
import { userToggle } from 'redux/reducers/Func';
import { useDispatch } from 'react-redux';

const CategoryList = lazy(
  () =>
    import(/* webpackChunkName: "CategoryList" */ './components/CategoryList'),
);
const SearchList = lazy(
  () => import(/* webpackChunkName: "SearchList" */ './components/SearchList'),
);

function index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userToggle());
  }, []);

  return (
    <Container>
      <CategoryList />
      <SearchList />
    </Container>
  );
}

export default index;
