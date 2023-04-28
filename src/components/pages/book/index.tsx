import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import useToggle from 'hooks/useToggle';
import { reviewInit } from 'constants/content';
import Container from 'common/Container';
import BookBannerInfo from 'components/modules/banners/BookBanner';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import Pagination from 'common/Pagination';
import UserReviewList from 'components/modules/lists/UserReviewList';
import ReviewDetailModal from 'components/pages/modal/ReivewDetailModal';

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sort = `${location.search.split('=')[1]}`;
  const isbn = Number(location.pathname.split('/')[2]);
  const [detailToggle, handleDetailToggle] = useToggle(false);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [curReview, setCurReview] = useState(reviewInit);
  const { bookData, userReviews } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  const handleNewClick = () => {
    navigate(`/review/${isbn}?sort=new`, { replace: true });
    setCurIndex(0);
  };

  const handleRecommendClick = () => {
    navigate(`/review/${isbn}?sort=recommend`, { replace: true });
    setCurIndex(0);
  };

  const handleFetchReivew = useCallback(() => {
    dispatch(
      ReviewRequest({
        isbn,
        start: curIndex * 10,
        sortby: sort,
      }),
    );
  }, [sort, curIndex]);

  useEffect(() => {
    handleFetchReivew();
    return () => {
      dispatch(ReviewInit());
    };
  }, [sort, curIndex]);

  return (
    <>
      <BookBanner style={{ backgroundImage: `url(${bookData.img})` }}>
        <BannerBlind>
          <Container>
            {bookData.title && <BookBannerInfo {...bookData} />}
          </Container>
        </BannerBlind>
      </BookBanner>
      <Container>
        <DefaultButton
          type="button"
          content="추천 순"
          fontSize={2}
          fontColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
          bgColor={[theme.color.COLOR_NONE, theme.color.COLOR_NONE]}
          isBtnClick={sort === 'recommend'}
          width={60}
          handleClick={handleRecommendClick}
        />
        <DefaultButton
          type="button"
          content="최신 순"
          fontSize={2}
          fontColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
          bgColor={[theme.color.COLOR_NONE, theme.color.COLOR_NONE]}
          isBtnClick={sort === 'new'}
          width={80}
          handleClick={handleNewClick}
        />
        <UserReviewList
          reviews={userReviews}
          detailToggleIsOn={handleDetailToggle}
          setCurReview={setCurReview}
        />
        <Pagination
          totalPage={Math.ceil(bookData.countReviews / 10)}
          index={curIndex}
          setIndex={setCurIndex}
        />
        {detailToggle && (
          <ReviewDetailModal
            userReview={curReview}
            handleDetailToggle={handleDetailToggle}
            bookIsbn={isbn}
            reviewIndex={curIndex * 10}
            reviewSort={sort}
          />
        )}
      </Container>
    </>
  );
}

export default Index;

const BookBanner = styled.div`
  background-size: cover;
  margin: 20px auto 20px;
  width: 100%;
  height: 300px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 200px;
  }
`;

const BannerBlind = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  height: 300px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 200px;
  }
`;
