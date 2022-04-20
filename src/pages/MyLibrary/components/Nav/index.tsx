import React from 'react';
import DoneBookList from './DoneBookList';
import LikeBookList from './LikeBookList';
import ReadBookList from './ReadBookList';

type PropsType = {
  id: number;
  userId: number;
};

function Index({ id, userId }: PropsType) {
  switch (id) {
    case 0:
      return <LikeBookList userId={userId} />;
    case 1:
      return <ReadBookList userId={userId} />;
    case 2:
      return <DoneBookList />;
    default:
      return null;
  }
}

export default Index;
