import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import styled from 'styled-components';
import { LibraryBookTypes } from 'types/page';
import { navDone, navInit, navRead, userToggle } from 'redux/reducers/Func';
import {
  MyLibraryModifyRequest,
  MyLibraryRequest,
} from 'redux/reducers/MyLibrary';
import { Toast } from 'utils/Toast';
import useToggle from 'hooks/useToggle';
import Container from 'common/Container';
import DefaultModal from 'common/DefaultModal';
import { bookInit } from 'contain/book';
import MultiText from 'components/atoms/texts/MultiText';
import LibraryMenuList from 'components/modules/lists/LibraryMenuList';
import LibraryBookList from 'components/modules/lists/LibraryBookList';
import ParagraphModal from 'components/pages/modal/ParagraphModal';
import WriteReviewModal from 'components/pages/modal/WriteReviewModal';

function Index() {
  const dispatch = useDispatch();
  const [likeToggle, handleLikeToggle] = useToggle(false);
  const [commentToggle, handleCommentToggle] = useToggle(false);
  const [reivewToggle, handleReviewToggle] = useToggle(false);
  const [bookData, setBookData] = useState<LibraryBookTypes>(bookInit);
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const navId = useSelector((state: AppStateType) => state.func.navId);
  const { userBookList, isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.myLibrary,
    shallowEqual,
  );
  const {
    itemAddSuccess,
    itemModifySuccess,
    itemDeleteSuccess,
    userReviewSuccess,
  } = useSelector((state: AppStateType) => state.userReview, shallowEqual);
  const initSuccess = useSelector(
    (state: AppStateType) => state.paragraph.initSuccess,
  );

  const moveReadClick = useCallback(async () => {
    await dispatch(
      MyLibraryModifyRequest({ progress: 1, isbn: bookData.isbn }),
    );
    handleLikeToggle();
    dispatch(navRead());
  }, [bookData]);

  const moveDoneClick = useCallback(async () => {
    await dispatch(
      MyLibraryModifyRequest({ progress: 2, isbn: bookData.isbn }),
    );
    handleCommentToggle();
    dispatch(navDone());
  }, [bookData]);

  useEffect(() => {
    if (isDeleteSuccess) dispatch(MyLibraryRequest({ progress: navId }));
  }, [isDeleteSuccess]);

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
      <MyLibraryHeader>
        <MultiText
          className="flexstart"
          imageSrc={`${process.env.PUBLIC_URL}/assets/myLibrary/my-library-icon.svg`}
          imageAlt="book icon"
          imageSize={60}
          content={`${user.nick}님의 서재`}
          fontSize={2.4}
        />
        <LibraryMenuList useId={user.id} navId={navId} />
      </MyLibraryHeader>
      <LibraryBookList
        userBookList={userBookList}
        handleLikeToggle={handleLikeToggle}
        handleCommentToggle={handleCommentToggle}
        handleReviewToggle={handleReviewToggle}
        setBookData={setBookData}
      />
      {likeToggle && (
        <DefaultModal
          content="시작해볼까요?"
          contentSize={2.4}
          width={500}
          height={250}
          handleToggle={handleLikeToggle}
          close
          okButtonTitle="독서 시작"
          cancelButtonTitle="나중에"
          handleOkClick={moveReadClick}
          handleCanCelClick={handleLikeToggle}
        />
      )}
      {commentToggle && initSuccess && (
        <ParagraphModal
          bookData={bookData}
          toggleIsOn={handleCommentToggle}
          moveDoneClick={moveDoneClick}
        />
      )}
      {reivewToggle && userReviewSuccess && (
        <WriteReviewModal bookData={bookData} toggleIsOn={handleReviewToggle} />
      )}
    </Container>
  );
}

export default Index;

const MyLibraryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
