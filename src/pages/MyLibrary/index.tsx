import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import { navInit, userToggle } from 'redux/reducers/Func';
import { Toast } from 'lib/Toast';
import Container from 'components/Container';
import MyLibraryTitle from './components/MyLibraryTitle';

const MyLibraryNav = lazy(
  () =>
    import(/* webpackChunkName: "MyLibraryNav" */ './components/MyLibraryNav'),
);

function Index() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: AppStateType) => state.authUser);
  const { isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.myLibrary,
  );
  const { itemAddSuccess, itemModifySuccess, itemDeleteSuccess } = useSelector(
    (state: AppStateType) => state.userReview,
  );

  useEffect(() => {
    if (itemAddSuccess) Toast('success', '작성 완료');
    else if (itemModifySuccess) Toast('info', '수정 완료!');
    else if (itemDeleteSuccess) Toast('info', '삭제 완료!');
    else if (isDeleteSuccess) Toast('success', '해당 책을 삭제했습니다!');
  }, [itemAddSuccess, itemModifySuccess, itemDeleteSuccess, isDeleteSuccess]);

  useEffect(() => {
    dispatch(userToggle());
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
