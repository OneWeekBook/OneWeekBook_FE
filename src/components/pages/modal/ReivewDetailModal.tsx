import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { FavoriteResponseTypes } from 'types/response';
import { ReviewDetailModalTypes } from 'types/page';
import { AppStateType } from 'redux/reducers';
import {
  FavoriteAddRequest,
  FavoriteCancelRequest,
  FavoriteInit,
  FavoriteRequest,
} from 'redux/reducers/Favorite';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import { FAVORITE_IMAGE } from 'constants/image';
import DetailModal from 'common/DefaultModal';
import MenuButton from 'components/atoms/buttons/MenuButton';
import DataText from 'components/atoms/texts/DataText';
import ReviewText from 'components/atoms/texts/ReviewText';

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
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const {
    favoriteData,
    favoriteAddErrorStatus,
    favoriteCancelErrorStatus,
  }: {
    favoriteData: FavoriteResponseTypes[];
    favoriteAddErrorStatus?: number;
    favoriteCancelErrorStatus?: number;
  } = useSelector((state: AppStateType) => state.favorite, shallowEqual);

  useEffect(() => {
    dispatch(FavoriteRequest({ bookId: userReview.id }));
    return () => {
      dispatch(FavoriteInit());
    };
  }, []);

  useEffect(() => {
    if (favoriteAddErrorStatus === 200 || favoriteCancelErrorStatus === 200) {
      dispatch(FavoriteRequest({ bookId: userReview.id }));
      dispatch(ReviewInit());
      dispatch(
        ReviewRequest({
          isbn: bookIsbn,
          start: reviewIndex,
          sortby: reviewSort,
        }),
      );
    }
  }, [favoriteAddErrorStatus, favoriteCancelErrorStatus]);

  useEffect(() => {
    compareFavoriteUser();
    if (Array.isArray(favoriteData) && !!favoriteData) {
      setUseful(
        favoriteData.filter((item: FavoriteResponseTypes) => item.state === 0)
          .length,
      );
      setInterest(
        favoriteData.filter((item: FavoriteResponseTypes) => item.state === 1)
          .length,
      );
    } else {
      setUseful(0);
      setInterest(0);
    }
  }, [favoriteData]);

  const compareFavoriteUser = () => {
    if (
      favoriteData.find(
        (like: FavoriteResponseTypes) => like.user.id === user.id,
      )
    ) {
      const data = favoriteData.find(
        (like: FavoriteResponseTypes) => like.user.id === user.id,
      );
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
      dispatch(FavoriteCancelRequest({ bookId: userReview.id }));
      setTimeout(() => {
        dispatch(FavoriteAddRequest({ bookId: userReview.id, state }));
      }, 10);
    } else if (compareFavoriteUser() && isSelected) {
      if (state === 0) setUsefulToggle(false);
      else if (state === 1) setInterestToggle(false);
      dispatch(FavoriteCancelRequest({ bookId: userReview.id }));
    } else if (!compareFavoriteUser()) {
      dispatch(FavoriteAddRequest({ bookId: userReview.id, state }));
    }
  };

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
        <DataText before="작성일자 : " data={userReview.reviewCreationTime} />
        <ReviewText content={userReview.review} />
        <FavoriteButtons>
          <MenuButton
            className="roundborder"
            src={FAVORITE_IMAGE.USEFUL}
            imageSize={25}
            content={`${useful} 도움이되요`}
            handleClick={() => handleFavoriteClick(0, usefulToggle)}
            isBtnClick={usefulToggle}
            bgColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
            fontColor={theme.color.COLOR_WHITE}
            fontWeight={300}
          />
          <MenuButton
            className="roundborder"
            src={FAVORITE_IMAGE.INTEREST}
            imageSize={25}
            content={`${interest} 흥미로워요`}
            handleClick={() => handleFavoriteClick(1, interestToggle)}
            isBtnClick={interestToggle}
            bgColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
            fontColor={theme.color.COLOR_WHITE}
            fontWeight={300}
          />
        </FavoriteButtons>
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

const FavoriteButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;
