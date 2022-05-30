import DetailModal from 'components/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  LikeAddRequest,
  LikeCancelRequest,
  LikeInit,
  LikeRequest,
} from 'redux/reducers/Like';
import styled from 'styled-components';
import { LikeDataTypes, ReviewDetailTypes } from 'types/review';

type PropsType = {
  item: ReviewDetailTypes;
  detailToggleIsOn: () => void;
};

function ReviewDetailModal({ item, detailToggleIsOn }: PropsType) {
  const dispatch = useDispatch();
  const [zero, setZero] = useState(item.zeroLikeCount);
  const [one, setOne] = useState(item.oneLikeCount);
  const { likeData, likeAddErrorStatus, likeCancelErrorStatus } = useSelector(
    (state: any) => state.like,
  );
  const { user } = useSelector((state: any) => state.authUser);
  console.log(likeAddErrorStatus, likeCancelErrorStatus);

  useEffect(() => {
    dispatch(LikeRequest({ bookId: item.id }));
    return () => {
      dispatch(LikeInit());
    };
  }, []);

  useEffect(() => {
    if (likeAddErrorStatus === 200) {
      dispatch(LikeRequest({ bookId: item.id }));
    } else if (likeCancelErrorStatus === 200) {
      dispatch(LikeRequest({ bookId: item.id }));
    }
  }, [likeAddErrorStatus, likeCancelErrorStatus]);

  useEffect(() => {
    if (likeData.length > 0) {
      setZero(
        likeData.filter((item: LikeDataTypes) => item.state === 0).length,
      );
      setOne(likeData.filter((item: LikeDataTypes) => item.state === 1).length);
    }
    console.log('likeData', likeData);
  }, [likeData]);

  const compareLikeUser = () => {
    if (likeData.filter((like: LikeDataTypes) => like.user.id === user.id)) {
      console.log('true');
      return true;
    }
    console.log('false');
    return false;
  };

  const handleLikeCancel = (bookId: number, userId: number) => {
    dispatch(LikeCancelRequest({ bookId, userId }));
  };

  const handleLikeClick = (bookId: number, state: number, userId: number) => {
    dispatch(LikeAddRequest({ bookId, state, userId }));
  };

  const likeAddClick = async (state: number) => {
    if (compareLikeUser()) {
      await handleLikeCancel(item.id, user.id);
    }
    await handleLikeClick(item.id, state, user.id);
  };

  return (
    <DetailModal
      title={`${item.nick}님의 리뷰 전체 보기`}
      titleSize={[20, 18]}
      width={500}
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
        <Recommend>{zero}명이 해당 리뷰가 유용하다고 생각해요</Recommend>
        <Recommend>{one}명이 해당 리뷰가 재미있다고 생각해요</Recommend>
        <button type="button" onClick={() => likeAddClick(0)}>
          유용해요
        </button>
        <button type="button" onClick={() => likeAddClick(1)}>
          재미있어요
        </button>
      </Wrapper>
    </DetailModal>
  );
}

export default ReviewDetailModal;

const Wrapper = styled.div`
  margin: 0 20px;
`;

const Date = styled.p`
  font-size: 18px;
  font-weight: 600;
`;

const ReviewBody = styled.p`
  font-size: 18px;
  margin: 10px auto;
`;

const Recommend = styled.p`
  font-size: 16px;
`;
