import { useLocation } from 'react-router-dom';
import Container from 'common/Container';
import TagLabel from 'components/modules/labels/TagLabel';
import BooksList from 'components/modules/lists/BooksList';
import TopButton from 'components/atoms/buttons/TopButton';

function index() {
  const location = useLocation();
  const pathArr = location.search.split(/[?=&]+/);
  const searchArr: string[] = [];
  const tagArr: Set<string> = new Set([]);

  for (let i = 1; i < pathArr.length - 2; i += 1) {
    if (i % 2 === 1) {
      tagArr.add(decodeURI(decodeURIComponent(pathArr[i])));
    } else {
      searchArr.push(decodeURI(decodeURIComponent(pathArr[i])));
    }
  }

  tagArr.add(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));
  searchArr.push(decodeURI(decodeURIComponent(pathArr[pathArr.length - 1])));

  return (
    <Container>
      <TagLabel tags={tagArr} />
      <BooksList searchArr={searchArr} />
      <TopButton />
    </Container>
  );
}

export default index;
