import { useState, useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
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
import ImageButton from 'components/Button/ImageButton';
import DefaultButton from 'components/Button/DefaultButton';

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
  bookId: number;
  bookData: InfoTypes;
  toggleIsOn: () => void;
};

function WriteReviewModal({ bookId, bookData, toggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const { reviewItem, itemAddSuccess } = useSelector(
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
      Toast('warning', '리뷰를 남겨주세요...');
    } else {
      dispatch(UserReviewAddRequest({ bookId, review, rating: recommend }));
    }
  };

  const modifyReviewClick = (id: number, recommend: number, review: string) => {
    if (review === '') {
      Toast('warning', '리뷰를 남겨주세요...');
    } else {
      dispatch(UserReviewModifyRequest({ id, review, rating: recommend }));
    }
  };

  const deleteReviewClick = (id: number) => {
    dispatch(UserReviewDeleteRequest({ id }));
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
            {RecommendItem.map((item) => (
              <ImageButton
                key={item.id}
                type="button"
                src={recommend === item.value ? item.img_done : item.img_none}
                pc={[40, 30]}
                imgPC={[30, 30]}
                margin={[0, 0, 0, 10]}
                bgColor="white"
                alt="recommend button"
                onClick={() => recommendClick(item.value)}
              />
            ))}
          </RecommendWrapper>
          <ButtonWrapper>
            {reviewItem.review !== null || itemAddSuccess ? (
              <>
                <DefaultButton
                  pc={[60, 30]}
                  onClick={() =>
                    modifyReviewClick(reviewItem.id, recommend, review)
                  }
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
                  onClick={() => deleteReviewClick(reviewItem.id)}
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
    margin: 0 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
