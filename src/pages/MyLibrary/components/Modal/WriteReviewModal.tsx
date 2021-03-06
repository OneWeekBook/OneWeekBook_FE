import { useState, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import {
  UserReviewAddRequest,
  UserReviewDeleteRequest,
  UserReviewInit,
  UserReviewModifyRequest,
} from 'redux/reducers/UserReview';
import { InfoTypes } from 'types/book';
import { SetStartDate } from 'lib/SetDate';
import { Toast } from 'lib/Toast';
import WriteModal from 'components/Modal';
import DefaultButton from 'components/Button/DefaultButton';

const RecommendItem = [
  {
    id: 0,
    value: 4,
    img_done: 'sprite sprite-best_done',
    img_none: 'sprite sprite-best_none',
  },
  {
    id: 1,
    value: 3,
    img_done: 'sprite sprite-recommend_done',
    img_none: 'sprite sprite-recommend_none',
  },
  {
    id: 2,
    value: 2,
    img_done: 'sprite sprite-good_done',
    img_none: 'sprite sprite-good_none',
  },
  {
    id: 3,
    value: 1,
    img_done: 'sprite sprite-soso_done',
    img_none: 'sprite sprite-soso_none',
  },
];

type PropsType = {
  bookId: number;
  bookData: InfoTypes;
  toggleIsOn: () => void;
};

function WriteReviewModal({ bookId, bookData, toggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const { reviewItem, itemAddSuccess } = useSelector(
    (state: AppStateType) => state.userReview,
  );
  const [recommend, setRecommend] = useState<number>(4);
  const [review, setReview] = useState('');

  const addReviewClick = (
    bookId: number,
    recommend: number,
    review: string,
  ) => {
    if (review === '') {
      Toast('warning', '리뷰를 남겨주세요...');
    } else {
      dispatch(UserReviewAddRequest({ bookId, review, rating: recommend }));
    }
  };

  const modifyReviewClick = (recommend: number, review: string) => {
    if (review === '') {
      Toast('warning', '리뷰를 남겨주세요...');
    } else {
      dispatch(UserReviewModifyRequest({ review, rating: recommend }));
    }
  };

  const deleteReviewClick = () => {
    dispatch(UserReviewDeleteRequest());
    toggleIsOn();
  };

  useLayoutEffect(() => {
    if (reviewItem.review) {
      setReview(reviewItem.review);
      setRecommend(reviewItem.rating);
    }
    return () => {
      setRecommend(4);
      setReview('');
      dispatch(UserReviewInit());
    };
  }, [reviewItem]);

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
            </p>
            <p>
              {`${SetStartDate(bookData.startTime)} ~ ${SetStartDate(
                bookData.endTime,
              )}`}
            </p>
          </div>
          {bookData.progress === 1 && <button type="button">독서 완료</button>}
        </InfoWrapper>
        <MiddleWrapper>
          <RecommendWrapper>
            <p>책이 어떻나요?</p>
            <ImageButtonWrapper>
              {RecommendItem.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setRecommend(item.value)}
                >
                  <i
                    className={
                      recommend === item.value ? item.img_done : item.img_none
                    }
                  />
                </button>
              ))}
            </ImageButtonWrapper>
          </RecommendWrapper>
          <ButtonWrapper>
            {reviewItem.review !== null || itemAddSuccess ? (
              <>
                <DefaultButton
                  pc={[60, 30]}
                  onClick={() => modifyReviewClick(recommend, review)}
                  isHover
                  hoverBgColor="#1e90ff"
                  hoverColor="white"
                  bgColor="#08c1e9"
                  color="white"
                  margin={[0, 0, 0, 10]}
                  fontSize={[14, 14]}
                  fontWeight={700}
                  title="수정"
                />
                <DefaultButton
                  pc={[60, 30]}
                  onClick={deleteReviewClick}
                  isHover
                  hoverBgColor="#1e90ff"
                  hoverColor="white"
                  bgColor="#08c1e9"
                  color="white"
                  margin={[0, 0, 0, 10]}
                  fontSize={[14, 14]}
                  fontWeight={700}
                  title="삭제"
                />
              </>
            ) : (
              <DefaultButton
                pc={[60, 30]}
                onClick={() => addReviewClick(bookId, recommend, review)}
                isHover
                hoverBgColor="#1e90ff"
                hoverColor="white"
                bgColor="#08c1e9"
                color="white"
                margin={[0, 0, 0, 10]}
                fontSize={[14, 14]}
                fontWeight={700}
                title="작성"
              />
            )}
          </ButtonWrapper>
        </MiddleWrapper>
        <textarea
          className="review"
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
  .review {
    box-sizing: border-box;
    width: 100%;
    min-height: 150px;
    padding: 10px;
    border: none;
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
    margin-right: 10px;
  }
  @media (max-width: 660px) {
    display: block;
    p {
      margin-bottom: 10px;
    }
  }
`;

const ImageButtonWrapper = styled.div`
  display: flex;
  button {
    cursor: pointer;
    background: white;
    border: none;
    margin: 2px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
