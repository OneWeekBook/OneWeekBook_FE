import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppStateType } from 'redux/reducers';
import styled from 'styled-components';
import { LibraryBookTypes } from 'types/page';
import { userToggle } from 'redux/reducers/funcReducer';
import {
  libraryModifyRequest,
  libraryRequest,
} from 'redux/reducers/libraryReducer';
import useToggle from 'hooks/useToggle';
import { bookInit } from 'constants/content';
import { FUNC_IMAGE } from 'constants/image';
import { PATH_URL } from 'constants/path';
import { showToast } from 'common/Toast';
import Container from 'common/Container';
import DefaultModal from 'common/DefaultModal';
import MultiText from 'components/atoms/texts/MultiText';
import LibraryMenuList from 'components/modules/lists/LibraryMenuList';
import LibraryBookList from 'components/modules/lists/LibraryBookList';
import ParagraphModal from 'components/pages/modal/ParagraphModal';
import WriteReviewModal from 'components/pages/modal/WriteReviewModal';
import useRouter from 'hooks/useRouter';

function Index() {
  const dispatch = useDispatch();
  const { routeTo, currentSearch } = useRouter();
  const [favoriteToggle, handleFavoriteToggle] = useToggle(false);
  const [commentToggle, handleCommentToggle] = useToggle(false);
  const [reivewToggle, handleReviewToggle] = useToggle(false);
  const [bookData, setBookData] = useState<LibraryBookTypes>(bookInit);
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const { libraryBookList, isDeleteSuccess } = useSelector(
    (state: AppStateType) => state.library,
    shallowEqual,
  );
  const {
    itemAddSuccess,
    itemModifySuccess,
    itemDeleteSuccess,
    userReviewSuccess,
  } = useSelector((state: AppStateType) => state.userReview, shallowEqual);
  const { initSuccess } = useSelector((state: AppStateType) => state.paragraph);
  const handleMoveReadClick = useCallback(async () => {
    await dispatch(libraryModifyRequest({ progress: 1, isbn: bookData.isbn }));
    handleFavoriteToggle();
    routeTo(`${PATH_URL.LIBRARY}?id=1`, true);
  }, [bookData]);

  const handleMoveDoneClick = useCallback(async () => {
    await dispatch(libraryModifyRequest({ progress: 2, isbn: bookData.isbn }));
    handleCommentToggle();
    routeTo(`${PATH_URL.LIBRARY}?id=2`, true);
  }, [bookData]);

  useEffect(() => {
    if (isDeleteSuccess)
      dispatch(libraryRequest({ progress: Number(currentSearch.get('id')) }));
  }, [isDeleteSuccess]);

  useEffect(() => {
    if (itemAddSuccess) showToast('success', '작성 완료');
    else if (itemModifySuccess) showToast('info', '수정 완료!');
    else if (itemDeleteSuccess) showToast('info', '삭제 완료!');
    else if (isDeleteSuccess) showToast('success', '해당 책을 삭제했습니다!');
  }, [itemAddSuccess, itemModifySuccess, itemDeleteSuccess, isDeleteSuccess]);

  useEffect(() => {
    dispatch(userToggle());
  }, []);

  return (
    <Container>
      <MyLibraryHeader>
        <MultiText
          className="flexstart"
          imageSrc={FUNC_IMAGE.LIBRARY}
          imageAlt="book icon"
          imageSize={60}
          content={`${user.nick}님의 서재`}
          fontSize={2.4}
        />
        <LibraryMenuList
          useId={user.id}
          navId={Number(currentSearch.get('id'))}
        />
      </MyLibraryHeader>
      <LibraryBookList
        libraryBookList={libraryBookList}
        handleLikeToggle={handleFavoriteToggle}
        handleCommentToggle={handleCommentToggle}
        handleReviewToggle={handleReviewToggle}
        setBookData={setBookData}
      />
      {favoriteToggle && (
        <DefaultModal
          content="시작해볼까요?"
          contentSize={2.4}
          width={500}
          height={250}
          handleToggle={handleFavoriteToggle}
          close
          okButtonTitle="독서 시작"
          cancelButtonTitle="나중에"
          handleOkClick={handleMoveReadClick}
          handleCancelClick={handleFavoriteToggle}
        />
      )}
      {commentToggle && initSuccess && (
        <ParagraphModal
          bookData={bookData}
          handleToggle={handleCommentToggle}
          moveDoneClick={handleMoveDoneClick}
        />
      )}
      {reivewToggle && userReviewSuccess && (
        <WriteReviewModal
          bookData={bookData}
          handleToggle={handleReviewToggle}
        />
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
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;
