import DetailModal from 'components/Modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LikeRequest } from 'redux/reducers/Like';
import styled from 'styled-components';
import { ReviewDetailTypes } from 'types/review';

type PropsType = {
  item: ReviewDetailTypes;
  detailToggleIsOn: () => void;
  handleLikeClick: (bookId: number, state: number, userId: number) => void;
};

function ReviewDetailModal({
  item,
  detailToggleIsOn,
  handleLikeClick,
}: PropsType) {
  const dispatch = useDispatch();
  const [zero, setZero] = useState(item.zeroLikeCount);
  const [one, setOne] = useState(item.oneLikeCount);
  const {likeData} = useSelector((state: any) => state.like);
  console.log(likeData);

  useEffect(() => {
    dispatch(LikeRequest({bookId: item.id}));
  }, []);

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
        <Recommend>{one}명이 해당 리뷰가 유용하다고 생각해요</Recommend>
        <button
          type="button"
          onClick={() => {
            handleLikeClick(item.id, 0, item.userId);
            setZero(zero + 1);
          }}
        >
          유용해요
        </button>
        <button
          type="button"
          onClick={() => {
            handleLikeClick(item.id, 1, item.userId);
            setOne(one + 1);
          }}
        >
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
