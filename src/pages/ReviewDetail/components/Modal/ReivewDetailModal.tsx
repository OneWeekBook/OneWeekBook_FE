import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import {
  LikeAddRequest,
  LikeCancelRequest,
  LikeInit,
  LikeRequest,
} from 'redux/reducers/Like';
import { LikeDataTypes, ReviewDetailTypes } from 'types/review';
import DetailModal from 'components/Modal';
import ImageButton from 'components/Button/ImageButton';

type PropsType = {
  item: ReviewDetailTypes;
  detailToggleIsOn: () => void;
};

function ReviewDetailModal({ item, detailToggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const [zero, setZero] = useState(item.zeroLikeCount);
  const [one, setOne] = useState(item.oneLikeCount);
  const [zeroToggle, setZeroToggle] = useState(false);
  const [oneToggle, setOneToggle] = useState(false);
  const { user } = useSelector((state: AppStateType) => state.authUser);
  const {
    likeData,
    likeAddErrorStatus,
    likeCancelErrorStatus,
  }: {
    likeData: LikeDataTypes[];
    likeAddErrorStatus?: number;
    likeCancelErrorStatus?: number;
  } = useSelector((state: AppStateType) => state.like);
  const likeDoneImg = `${process.env.PUBLIC_URL}/assets/like/like-done.svg`;
  const likeNoneImg = `${process.env.PUBLIC_URL}/assets/like/like-none.svg`;

  useEffect(() => {
    dispatch(LikeRequest({ bookId: item.id }));
    return () => {
      dispatch(LikeInit());
    };
  }, []);

  useEffect(() => {
    if (likeAddErrorStatus === 200 || likeCancelErrorStatus === 200) {
      dispatch(LikeRequest({ bookId: item.id }));
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
      width={900}
      height={300}
      handleToggle={detailToggleIsOn}
      close
      isOkBtn
      okBtnTitle="다른 리뷰"
      handleOkClick={detailToggleIsOn}
      isCancelBtn={false}
    >
      <Wrapper>
        <Date>{item.reviewCreationTime}</Date>
        <ReviewBody>{item.review}</ReviewBody>
        <Recommend>
          <p>
            <span>{zero}</span>명이 해당 리뷰가 유용하다고 생각해요
          </p>
          {sessionStorage.getItem('accessToken') && (
            <ImageButton
              type="button"
              src={zeroToggle ? likeDoneImg : likeNoneImg}
              pc={[25, 25]}
              bgColor="white"
              alt="like"
              onClick={() => likeAddClick(0, zeroToggle)}
            />
          )}
        </Recommend>
        <Recommend>
          <p>
            <span>{one}</span>명이 해당 리뷰가 재미있다고 생각해요
          </p>
          {sessionStorage.getItem('accessToken') && (
            <ImageButton
              type="button"
              src={oneToggle ? likeDoneImg : likeNoneImg}
              pc={[25, 25]}
              bgColor="white"
              alt="like"
              onClick={() => likeAddClick(1, oneToggle)}
            />
          )}
        </Recommend>
      </Wrapper>
    </DetailModal>
  );
}

export default ReviewDetailModal;

const Wrapper = styled.div`
  margin: 0 40px;
`;

const Date = styled.p`
  font-size: 18px;
  font-weight: 600;
  margin-top: 20px;
`;

const ReviewBody = styled.p`
  font-size: 18px;
  margin: 10px auto;
`;

const Recommend = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  span {
    font-weight: 600;
  }
`;
