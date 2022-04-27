import React, { useState, useEffect, useLayoutEffect } from 'react';
import WriteModal from 'components/Modal';
import styled from 'styled-components';
import { InfoTypes } from 'types/book';
import { SetStartDate } from 'lib/SetDate';
import { useDispatch, useSelector } from 'react-redux';
import {
  UserReviewAddRequest,
  UserReviewDeleteRequest,
  UserReviewInit,
  UserReviewModifyRequest,
  UserReviewRequest,
} from 'redux/reducers/UserReview';
import { useToggle } from 'hooks/useToggle';

const RecommendItem = [
  {
    id: 0,
    value: 4,
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/best_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/best_none.png`,
  },
  {
    id: 1,
    value: 3,
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/recommend_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/recommend_none.png`,
  },
  {
    id: 2,
    value: 2,
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/good_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/good_none.png`,
  },
  {
    id: 3,
    value: 1,
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/soso_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/soso_none.png`,
  },
];

type PropsType = {
  userId: number;
  bookId: number;
  bookData: InfoTypes;
  toggleIsOn: () => void;
};

function WriteReviewModal({ userId, bookId, bookData, toggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const [reviewToggle, reviewToggleIsOn] = useToggle(false);
  const { reviewItem, isSuccess } = useSelector(
    (state: any) => state.userReview,
  );
  const [recommend, setRecommend] = useState<number>(4);
  const [review, setReview] = useState('');
  const recommendClick = (recommend: number) => {
    setRecommend(recommend);
  };

  const addReviewClick = (
    bookId: number,
    recommend: number,
    review: string,
  ) => {
    if (review === '') {
      alert('리뷰를 남겨주세요...');
    } else {
      dispatch(UserReviewAddRequest({ bookId, review, rating: recommend }));
      reviewToggleIsOn();
      alert('작성 완료');
    }
  };

  const modifyReviewClick = (id: number, recommend: number, review: string) => {
    if (review === '') {
      alert('리뷰를 남겨주세요...');
    } else {
      dispatch(UserReviewModifyRequest({ id, review, rating: recommend }));
      alert('수정 완료');
    }
  };

  const deleteReviewClick = (id: number) => {
    dispatch(UserReviewDeleteRequest({ id }));
    toggleIsOn();
    alert('삭제 완료');
  };

  useEffect(() => {
    dispatch(UserReviewRequest({ userId, bookId }));
  }, [userId, bookId, reviewToggle]);

  useLayoutEffect(() => {
    if (reviewItem.review) {
      setReview(reviewItem.review);
      setRecommend(reviewItem.rating);
    }
  }, [reviewItem]);

  useEffect(() => {
    return () => {
      dispatch(UserReviewInit());
    };
  }, []);

  return (
    <WriteModal
      type="write"
      title="책 리뷰하기"
      titleSize={[24, 18]}
      width={768}
      height={400}
      handleToggle={toggleIsOn}
      close
      isOkBtn={false}
      isCancelBtn
      cancelBtnTitle="나중에..."
      handleCanCelClick={toggleIsOn}
    >
      <BodyWrapper>
        <InfoWrapper>
          <div className="bookInfo">
            <p>{bookData.title.replaceAll('<b>', '').replaceAll('</b>', '')}</p>
            <p>
              {bookData.author.replaceAll('<b>', '').replaceAll('</b>', '')}
              {' | '}
              {SetStartDate(bookData.startTime)}
              {' ~ '}
              {SetStartDate(bookData.endTime)}
            </p>
          </div>
          {bookData.progress === 1 && <button type="button">독서 완료</button>}
        </InfoWrapper>
        <MiddleWrapper>
          <RecommendWrapper>
            <p>책이 어떻나요?</p>
            {RecommendItem.map((item) => (
              <RecommendButton
                key={item.id}
                onClick={() => recommendClick(item.value)}
              >
                <img
                  src={recommend === item.value ? item.img_done : item.img_none}
                  alt="recommend button"
                  width={30}
                  height={30}
                />
              </RecommendButton>
            ))}
          </RecommendWrapper>
          <ButtonWrapper>
            {isSuccess ? (
              <>
                <button
                  type="button"
                  onClick={() =>
                    modifyReviewClick(reviewItem.id, recommend, review)
                  }
                >
                  수정
                </button>
                <button
                  type="button"
                  onClick={() => deleteReviewClick(reviewItem.id)}
                >
                  삭제
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => addReviewClick(bookId, recommend, review)}
              >
                작성
              </button>
            )}
          </ButtonWrapper>
        </MiddleWrapper>
        <textarea
          placeholder="리뷰를 작성해주세요."
          defaultValue={review}
          onBlur={(e) => setReview(e.target.value)}
        />
      </BodyWrapper>
    </WriteModal>
  );
}

export default WriteReviewModal;

const BodyWrapper = styled.div`
  margin: 10px 50px 0;
  textarea {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 10px;
    resize : vertical:
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 10px auto 0;
  }
`;

const InfoWrapper = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid black;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  .bookInfo {
    font-size: 16px;
    font-weight: 600;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookInfo {
      font-size: 14px;
      font-weight: 600;
    }
  }
`;

const MiddleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const RecommendWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  p {
    font-size: 18px;
    font-weight: 600;
  }
  img {
    margin-left: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  button {
    width: 80px;
    height: 35px;
    border: none;
    border-radius: 5px;
    background-color: #08c1e9;
    color: white;
    margin-left: 10px;
  }
`;

const RecommendButton = styled.button`
  background-color: white;
  border: none;
`;
