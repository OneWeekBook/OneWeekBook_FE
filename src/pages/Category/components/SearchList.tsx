import LoadingErrorForm from 'components/Form/LoadingErrorForm';
import LoadingForm from 'components/Form/LoadingForm';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { BooksTypes } from 'types/book';
import { MyLibraryAddRequest } from 'redux/reducers/MyLibrary';
import { MyLibraryAddTypes } from 'types/api';
import SearchItem from './_item/SearchItem';

function SearchList() {
  const dispatch = useDispatch();
  const { books, isLoading, isSuccess } = useSelector(
    (state: any) => state.search,
  );
  const { user } = useSelector((state: any) => state.authUser);

  const handleAddClick = ({
    title,
    author,
    publisher,
    isbn,
    img,
    userId,
  }: MyLibraryAddTypes) => {
    if (userId) {
      dispatch(
        MyLibraryAddRequest({
          title,
          author,
          publisher,
          isbn,
          img,
          userId,
        }),
      );
    }
  };

  if (isLoading) {
    return <LoadingForm />;
  }

  if (isLoading && !isSuccess) {
    return <LoadingErrorForm />;
  }

  return (
    <Wrapper>
      {books.map((item: BooksTypes, index: number) => (
        <SearchItem
          key={index}
          {...item}
          userId={user.id}
          handleAddClick={handleAddClick}
        />
      ))}
    </Wrapper>
  );
}

export default SearchList;

const Wrapper = styled.div`
  width: 100%;
  margin: 30px auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    grid-template-columns: 1fr;
  }
`;
