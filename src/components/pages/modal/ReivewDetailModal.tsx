import { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { FavoriteResponseTypes } from 'types/response';
import { ReviewDetailModalTypes } from 'types/page';
import { AppStateType } from 'redux/reducers';
import {
  favoriteAddRequest,
  favoriteCancelRequest,
  favoriteInit,
  favoriteRequest,
} from 'redux/reducers/favoriteReducer';
import { FAVORITE_IMAGE } from 'constants/image';
import DetailModal from 'common/DefaultModal';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultText from 'components/atoms/texts/DefaultText';

function ReviewDetailModal({
  userReview,
  bookIsbn,
  reviewIndex,
  reviewSort,
  handleDetailToggle,
}: ReviewDetailModalTypes) {
  const dispatch = useDispatch();
  const [useful, setUseful] = useState(userReview.zeroLikeCount);
  const [interest, setInterest] = useState(userReview.oneLikeCount);
  const [usefulToggle, setUsefulToggle] = useState(false);
  const [interestToggle, setInterestToggle] = useState(false);
  const userId: number = useSelector(
    (state: AppStateType) => state.authUser.user.id,
  );
  const { favoriteData }: { favoriteData: FavoriteResponseTypes[] } =
    useSelector((state: AppStateType) => state.favorite, shallowEqual);

  const setFavoriteCount = useCallback(() => {
    if (Array.isArray(favoriteData) && !!favoriteData) {
      setUseful(favoriteData.filter((item) => item.state === 0).length);
      setInterest(favoriteData.filter((item) => item.state === 1).length);
    } else {
      setUseful(0);
      setInterest(0);
    }
  }, [favoriteData]);

  const compareFavoriteUser = () => {
    if (favoriteData.find((like) => like.user.id === userId)) {
      const data = favoriteData.find((like) => like.user.id === userId);
      if (data?.state === 0) {
        setInterestToggle(false);
        setUsefulToggle(true);
      } else if (data?.state === 1) {
        setUsefulToggle(false);
        setInterestToggle(true);
      }
      return true;
    }
    return false;
  };

  const handleFavoriteClick = (state: number, isSelected: boolean) => {
    if (compareFavoriteUser() && !isSelected) {
      dispatch(
        favoriteCancelRequest({
          bookId: userReview.id,
          isbn: bookIsbn,
          start: reviewIndex,
          sortby: reviewSort,
        }),
      );
      setTimeout(() => {
        dispatch(
          favoriteAddRequest({
            bookId: userReview.id,
            state,
            isbn: bookIsbn,
            start: reviewIndex,
            sortby: reviewSort,
          }),
        );
      }, 10);
    } else if (compareFavoriteUser() && isSelected) {
      if (state === 0) setUsefulToggle(false);
      else if (state === 1) setInterestToggle(false);
      dispatch(
        favoriteCancelRequest({
          bookId: userReview.id,
          isbn: bookIsbn,
          start: reviewIndex,
          sortby: reviewSort,
        }),
      );
    } else if (!compareFavoriteUser()) {
      dispatch(
        favoriteAddRequest({
          bookId: userReview.id,
          state,
          isbn: bookIsbn,
          start: reviewIndex,
          sortby: reviewSort,
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(favoriteRequest({ bookId: userReview.id }));
    return () => {
      dispatch(favoriteInit());
    };
  }, []);

  useEffect(() => {
    compareFavoriteUser();
    setFavoriteCount();
  }, [favoriteData]);

  return (
    <DetailModal
      content={`${userReview.nick}님의 리뷰 전체 보기`}
      contentSize={2.4}
      width={700}
      height={300}
      handleToggle={handleDetailToggle}
      close
      okButtonTitle="다른 리뷰"
      handleOkClick={handleDetailToggle}
    >
      <UserReviewModalBody>
        <DefaultTexts>
          <DefaultText content="작성일자 : " />
          <DefaultText content={userReview.reviewCreationTime} />
        </DefaultTexts>
        <ReviewScrollView>
          <DefaultText className="review" content={userReview.review} />
        </ReviewScrollView>
        <FavoriteButtons>
          <DefaultButton
            className="roundborder"
            imageSrc={FAVORITE_IMAGE.USEFUL}
            imageSize={25}
            content={`${useful} 도움이되요`}
            handleClick={() => handleFavoriteClick(0, usefulToggle)}
            isBtnClick={usefulToggle}
            backgroundColor={[
              theme.color.COLOR_CORAL,
              theme.color.COLOR_ORANGE_RED,
            ]}
            fontColor={[theme.color.COLOR_WHITE, theme.color.COLOR_WHITE]}
            fontWeight={300}
          />
          <DefaultButton
            className="roundborder"
            imageSrc={FAVORITE_IMAGE.INTEREST}
            imageSize={25}
            content={`${interest} 흥미로워요`}
            handleClick={() => handleFavoriteClick(1, interestToggle)}
            isBtnClick={interestToggle}
            backgroundColor={[
              theme.color.COLOR_CORAL,
              theme.color.COLOR_ORANGE_RED,
            ]}
            fontColor={[theme.color.COLOR_WHITE, theme.color.COLOR_WHITE]}
            fontWeight={300}
          />
        </FavoriteButtons>
        {userId === undefined && (
          <DefaultText
            content="추천 버튼을 누르시려면 로그인 하세요."
            fontSize={1.2}
          />
        )}
      </UserReviewModalBody>
    </DetailModal>
  );
}

export default ReviewDetailModal;

const UserReviewModalBody = styled.div`
  margin: 20px 0px;
  border: 2px solid #f07055;
  border-radius: 10px;
  padding: 15px 30px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    padding: 10px;
  }
`;

const DefaultTexts = styled.div`
  display: flex;
`;

const FavoriteButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const ReviewScrollView = styled.div`
  max-height: 500px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.color.COLOR_CORAL};
    border-radius: 10px;
  }
`;
