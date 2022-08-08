import { useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { ParagraphRequest } from 'redux/reducers/Paragraph';
import { ParagraphTypes } from 'types/book';
import ParagraphItem from '../../_item/ParagraphItem';

type PropsType = {
  bookId: number;
  deleteParagraphClick: (id: number) => void;
};

function ListWrapper({ bookId, deleteParagraphClick }: PropsType) {
  const dispatch = useDispatch();
  const { paragraph, isAddSuccess, isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.paragraph,
    shallowEqual,
  );

  useEffect(() => {
    if (isAddSuccess || isDeleteSuccess) {
      dispatch(ParagraphRequest({ bookId }));
    }
  }, [isAddSuccess, isDeleteSuccess]);

  return (
    <>
      {paragraph.map((item: ParagraphTypes) => (
        <ParagraphItem
          key={item.id}
          id={item.id}
          paragraph={item.paragraph}
          deleteParagraphClick={deleteParagraphClick}
        />
      ))}
    </>
  );
}

export default ListWrapper;
