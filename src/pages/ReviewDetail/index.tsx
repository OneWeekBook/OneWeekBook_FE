import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import useToggle from 'hooks/useToggle';
import { reviewInit } from 'contain/review';
import Container from 'common/Container';
import BookBannerInfo from 'components/modules/banner/BookBannerInfo';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import Pagination from 'components/modules/pagination/Pagination';
import UserReviewList from 'components/modules/lists/UserReviewList';
import ReviewDetailModal from './components/Modal/ReivewDetailModal';

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sort = `${location.search.split('=')[1]}`;
  const isbn = Number(location.pathname.split('/')[2]);
  const [detailToggle, handleDetailToggle] = useToggle(false);
  const [curIdx, setCurIdx] = useState<number>(0);
  const [curReview, setCurReview] = useState(reviewInit);
  const { bookData, userReviews } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  const handleNewClick = () => {
    navigate(`/review/${isbn}?sort=new`, { replace: true });
    setCurIdx(0);
  };

  const handleRecommendClick = () => {
    navigate(`/review/${isbn}?sort=recommend`, { replace: true });
    setCurIdx(0);
  };

  const handleFetchReivew = useCallback(() => {
    dispatch(
      ReviewRequest({
        isbn,
        start: curIdx * 10,
        sortby: sort,
      }),
    );
  }, [sort, curIdx]);

  useEffect(() => {
    handleFetchReivew();
    return () => {
      dispatch(ReviewInit());
    };
  }, [sort, curIdx]);

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
          idx={curIdx}
          setIdx={setCurIdx}
        />
        {detailToggle && (
          <ReviewDetailModal
            item={curReview}
            detailToggleIsOn={handleDetailToggle}
            isbn={isbn}
            reviewCount={(curIdx - 1) * 10}
            sort={sort}
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
