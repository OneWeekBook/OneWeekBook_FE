import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { navInit } from 'redux/reducers/Func';
import { Toast } from 'lib/Toast';
import Container from 'components/Container';
import MyLibraryNav from './components/MyLibraryNav';
import MyLibraryTitle from './components/MyLibraryTitle';

function Index() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.authUser);
  const { isDeleteSuccess } = useSelector((state: any) => state.myLibrary);
  const { itemAddSuccess, itemModifySuccess, itemDeleteSuccess } = useSelector(
    (state: any) => state.userReview,
  );

  useEffect(() => {
    if (itemAddSuccess) Toast('success', '작성 완료');
    else if (itemModifySuccess) Toast('info', '수정 완료!');
    else if (itemDeleteSuccess) Toast('info', '삭제 완료!');
    else if (isDeleteSuccess) Toast('success', '해당 책을 삭제했습니다!');
  }, [itemAddSuccess, itemModifySuccess, itemDeleteSuccess, isDeleteSuccess]);

  useEffect(() => {
    return () => {
      dispatch(navInit());
    };
  }, []);

  return (
    <Container>
      <MyLibraryTitle nick={user.nick} />
      <MyLibraryNav />
    </Container>
  );
}

export default Index;
