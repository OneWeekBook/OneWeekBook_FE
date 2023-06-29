import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { AppStateType } from 'redux/reducers';
import { reviewsInit, reviewRequest } from 'redux/reducers/reviewReducer';
import useToggle from 'hooks/useToggle';
import useRouter from 'hooks/useRouter';
import { reviewItemInit } from 'constants/content';
import { PATH_URL } from 'constants/path';
import Container from 'common/Container';
import Pagination from 'common/Pagination';
import BookBannerInfo from 'components/modules/banners/BookBanner';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import UserReviewList from 'components/modules/lists/UserReviewList';
import ReviewDetailModal from 'components/pages/modal/ReivewDetailModal';

function Index() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { routeTo } = useRouter();
  const sort = `${location.search.split('=')[1]}`;
  const isbn = Number(location.pathname.split('/')[2]);
  const [detailToggle, handleDetailToggle] = useToggle(false);
  const [curIndex, setCurIndex] = useState<number>(0);
  const [curReview, setCurReview] = useState(reviewItemInit);
  const { bookData, userReviews } = useSelector(
    (state: AppStateType) => state.review,
    shallowEqual,
  );

  const handleSortNew = () => {
    routeTo(`${PATH_URL.REVIEW}/${isbn}?sort=new`, true);
    setCurIndex(0);
  };

  const handleSortRecommend = () => {
    routeTo(`${PATH_URL.REVIEW}/${isbn}?sort=recommend`, true);
    setCurIndex(0);
  };

  const handleFetchReivew = useCallback(() => {
    dispatch(
      reviewRequest({
        isbn,
        start: curIndex * 10,
        sortby: sort,
      }),
    );
  }, [sort, curIndex]);

  useEffect(() => {
    handleFetchReivew();
  }, [sort, curIndex]);

  useEffect(() => {
    return () => {
      dispatch(reviewsInit());
    };
  }, []);

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
        <DefaultButtons>
          <DefaultButton
            type="button"
            content="추천 순"
            fontSize={2}
            fontColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
            backgroundColor={[theme.color.COLOR_NONE, theme.color.COLOR_NONE]}
            isBtnClick={sort === 'recommend'}
            width={60}
            handleClick={handleSortRecommend}
          />
          <DefaultButton
            type="button"
            content="최신 순"
            fontSize={2}
            fontColor={[theme.color.COLOR_CORAL, theme.color.COLOR_ORANGE_RED]}
            backgroundColor={[theme.color.COLOR_NONE, theme.color.COLOR_NONE]}
            isBtnClick={sort === 'new'}
            width={80}
            handleClick={handleSortNew}
          />
        </DefaultButtons>
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

const DefaultButtons = styled.div`
  display: flex;
`;
