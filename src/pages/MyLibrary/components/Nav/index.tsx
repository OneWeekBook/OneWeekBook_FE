import React from 'react';
import { useSelector } from 'react-redux';
import DoneBookList from './DoneBookList';
import LikeBookList from './LikeBookList';
import ReadBookList from './ReadBookList';

type PropsType = {
  id: number;
};

function Index({ id }: PropsType) {
  const { user } = useSelector((state: any) => state.authUser);
  switch (id) {
    case 0:
      return <LikeBookList userId={user.id} />;
    case 1:
      return <ReadBookList />;
    case 2:
      return <DoneBookList />;
    default:
      return null;
  }
}

export default Index;
