import DoneBookList from './DoneBookList';
import LikeBookList from './LikeBookList';
import ReadBookList from './ReadBookList';

type PropsType = {
  id: number;
};

function Index({ id }: PropsType) {
  switch (id) {
    case 0:
      return <LikeBookList />;
    case 1:
      return <ReadBookList />;
    case 2:
      return <DoneBookList />;
    default:
      return null;
  }
}

export default Index;
