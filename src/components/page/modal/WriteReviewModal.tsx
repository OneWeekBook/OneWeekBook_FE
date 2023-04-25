import { useState, useLayoutEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import theme from 'styles/theme';
import { WriteReviewTypes } from 'types/page';
import { AppStateType } from 'redux/reducers';
import {
  UserReviewAddRequest,
  UserReviewDeleteRequest,
  UserReviewInit,
  UserReviewModifyRequest,
} from 'redux/reducers/UserReview';
import { SetStartDate } from 'lib/SetDate';
import { Toast } from 'lib/Toast';
import WriteModal from 'common/DefaultModal';
import DefaultButton from 'components/atoms/buttons/DefaultButton';
import DefaultText from 'components/atoms/texts/DefaultText';
import RecommendForm from 'components/modules/forms/RecommendForm';
import ReviewInput from 'components/atoms/inputs/ReviewInput';

function WriteReviewModal({ bookData, toggleIsOn }: WriteReviewTypes) {
  const dispatch = useDispatch();
  const { reviewItem, itemAddSuccess } = useSelector(
    (state: AppStateType) => state.userReview,
    shallowEqual,
  );
  const [recommend, setRecommend] = useState<number>(5);
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
      setRecommend(5);
      setReview('');
      dispatch(UserReviewInit());
    };
  }, [reviewItem]);

  return (
    <WriteModal
      type="write"
      content="책 리뷰하기"
      contentSize={2.4}
      width={700}
      height={400}
      handleToggle={toggleIsOn}
      close
      cancelButtonTitle="나중에"
      handleCanCelClick={toggleIsOn}
    >
      <ReviewModalBody>
        <BookInfo>
          <DefaultText
            className="booktitle"
            content={bookData.title
              .replaceAll('<b>', '')
              .replaceAll('</b>', '')}
            fontSize={2}
            fontWeight={700}
            reactive
          />
          <DefaultText
            className="bookauth"
            content={bookData.author
              .replaceAll('<b>', '')
              .replaceAll('</b>', '')}
            fontColor={theme.color.COLOR_CORAL}
            reactive
          />
          <DefaultText
            content={`${SetStartDate(bookData.startTime)} ~ ${SetStartDate(
              bookData.endTime,
            )}`}
            fontSize={1.4}
          />
        </BookInfo>
        <RecommendMenu>
          <RecommendForm recommend={recommend} setRecommend={setRecommend} />
          {reviewItem.review !== null || itemAddSuccess ? (
            <EditButtons>
              <DefaultButton
                handleClick={() => modifyReviewClick(recommend, review)}
                fontSize={1.4}
                content="수정"
                width={56}
                height={28}
              />
              <DefaultButton
                handleClick={deleteReviewClick}
                fontSize={1.4}
                content="삭제"
                width={56}
                height={28}
              />
            </EditButtons>
          ) : (
            <DefaultButton
              handleClick={() => addReviewClick(bookData.id, recommend, review)}
              fontSize={1.4}
              content="작성"
              width={56}
              height={28}
            />
          )}
        </RecommendMenu>
        <ReviewInput value={review} setValue={setReview} />
      </ReviewModalBody>
    </WriteModal>
  );
}

export default WriteReviewModal;

const ReviewModalBody = styled.div`
  margin: 10px 40px 0px;
  .booktitle {
    line-height: 21px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookauth {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    margin: 10px 20px 0px;
  }
`;

const BookInfo = styled.div`
  box-sizing: border-box;
  border-bottom: 2px solid ${({ theme }) => theme.color.COLOR_GRAY};
  padding-bottom: 10px;
`;

const RecommendMenu = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px auto;
`;

const EditButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
