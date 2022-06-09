import { useEffect } from 'react';
import Container from 'components/Container';
import { userToggle } from 'redux/reducers/Func';
import { useDispatch } from 'react-redux';
import CategoryList from './components/CategoryList';
import SearchList from './components/SearchList';

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
