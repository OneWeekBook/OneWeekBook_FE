import { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import {
  LikeAddRequest,
  LikeCancelRequest,
  LikeInit,
  LikeRequest,
} from 'redux/reducers/Like';
import { ReviewInit, ReviewRequest } from 'redux/reducers/Review';
import { LikeDataTypes, ReviewDetailTypes } from 'types/review';
import DetailModal from 'components/Modal';

type PropsType = {
  item: ReviewDetailTypes;
  isbn: number;
  reviewCount: number;
  sort: string;
  detailToggleIsOn: () => void;
};

function ReviewDetailModal({
  item,
  isbn,
  reviewCount,
  sort,
  detailToggleIsOn,
}: PropsType) {
  const dispatch = useDispatch();
  const [zero, setZero] = useState(item.zeroLikeCount);
  const [one, setOne] = useState(item.oneLikeCount);
  const [zeroToggle, setZeroToggle] = useState(false);
  const [oneToggle, setOneToggle] = useState(false);
  const { user } = useSelector(
    (state: AppStateType) => state.authUser,
    shallowEqual,
  );
  const {
    likeData,
    likeAddErrorStatus,
    likeCancelErrorStatus,
  }: {
    likeData: LikeDataTypes[];
    likeAddErrorStatus?: number;
    likeCancelErrorStatus?: number;
  } = useSelector((state: AppStateType) => state.like, shallowEqual);

  useEffect(() => {
    dispatch(LikeRequest({ bookId: item.id }));
    return () => {
      dispatch(LikeInit());
    };
  }, []);

  useEffect(() => {
    if (likeAddErrorStatus === 200 || likeCancelErrorStatus === 200) {
      dispatch(LikeRequest({ bookId: item.id }));
      dispatch(ReviewInit());
      dispatch(
        ReviewRequest({
          isbn,
          start: 0,
          sortby: sort,
        }),
      );
    }
  }, [likeAddErrorStatus, likeCancelErrorStatus]);

  useEffect(() => {
    compareLikeUser();
    if (Array.isArray(likeData) && !!likeData) {
      setZero(
        likeData.filter((item: LikeDataTypes) => item.state === 0).length,
      );
      setOne(likeData.filter((item: LikeDataTypes) => item.state === 1).length);
    } else {
      setZero(0);
      setOne(0);
    }
  }, [likeData]);

  const compareLikeUser = () => {
    if (likeData.find((like: LikeDataTypes) => like.user.id === user.id)) {
      const data = likeData.find(
        (like: LikeDataTypes) => like.user.id === user.id,
      );
      if (data?.state === 0) {
        setOneToggle(false);
        setZeroToggle(true);
      } else if (data?.state === 1) {
        setZeroToggle(false);
        setOneToggle(true);
      }
      return true;
    }
    return false;
  };

  const likeAddClick = (state: number, isSelected: boolean) => {
    if (compareLikeUser() && !isSelected) {
      dispatch(LikeCancelRequest({ bookId: item.id }));
      setTimeout(() => {
        dispatch(LikeAddRequest({ bookId: item.id, state }));
      }, 10);
    } else if (compareLikeUser() && isSelected) {
      if (state === 0) setZeroToggle(false);
      else if (state === 1) setOneToggle(false);
      dispatch(LikeCancelRequest({ bookId: item.id }));
    } else if (!compareLikeUser()) {
      dispatch(LikeAddRequest({ bookId: item.id, state }));
    }
  };

  return (
    <DetailModal
      title={`${item.nick}님의 리뷰 전체 보기`}
      titleSize={[24, 20]}
      width={700}
      height={300}
      handleToggle={detailToggleIsOn}
      close
      isOkBtn
      okBtnTitle="다른 리뷰"
      handleOkClick={detailToggleIsOn}
      isCancelBtn={false}
    >
      <Wrapper>
        <Date>작성일자 : {item.reviewCreationTime}</Date>
        <Review>{item.review}</Review>
        {sessionStorage.getItem('accessToken') && (
          <LikeButtonWrapper>
            <LikeButton
              type="button"
              onClick={() => likeAddClick(0, zeroToggle)}
              toggle={zeroToggle}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/like/interest.png`}
                alt="funny"
              />
              <p>
                <span>{zero}</span>유용해요
              </p>
            </LikeButton>
            <LikeButton
              type="button"
              onClick={() => likeAddClick(1, oneToggle)}
              toggle={oneToggle}
            >
              <img
                src={`${process.env.PUBLIC_URL}/assets/like/fun.png`}
                alt="funny"
              />
              <p>
                <span>{one}</span>재미있어요
              </p>
            </LikeButton>
          </LikeButtonWrapper>
        )}
      </Wrapper>
    </DetailModal>
  );
}

export default ReviewDetailModal;

const Wrapper = styled.div`
  margin: 20px 0px;
  border: 2px solid #f07055;
  border-radius: 10px;
  padding: 30px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    padding: 15px;
  }
`;

const Date = styled.p`
  font-size: 16px;
  font-weight: 500;
`;

const Review = styled.p`
  font-size: 18px;
  margin: 10px auto 20px;
  white-space: pre-wrap;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 16px;
  }
`;

const LikeButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 5px;
`;

const LikeButton = styled.button<{ toggle: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: 140px;
  height: 36px;
  border: none;
  border-radius: 5px;
  background-color: ${({ toggle }) => (toggle ? '#ffa07a' : '#f07055')};
  cursor: pointer;
  &:hover {
    background-color: #ffa07a;
  }
  img {
    width: 25px;
  }
  p {
    font-size: 16px;
    color: #fff;
    span {
      margin-right: 5px;
    }
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    img {
      width: 20px;
    }
    p {
      font-size: 14px;
    }
  }
`;
