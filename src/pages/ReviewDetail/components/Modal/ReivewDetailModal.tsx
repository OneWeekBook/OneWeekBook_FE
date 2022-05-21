import DetailModal from 'components/Modal';
import styled from 'styled-components';
import { ReviewDetailTypes } from 'types/review';

type PropsType = {
  item: ReviewDetailTypes;
  detailToggleIsOn: () => void;
};

function ReviewDetailModal({ item, detailToggleIsOn }: PropsType) {
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
        <Date>2020.01.01</Date>
        <ReviewBody>{item.review}</ReviewBody>
        <Recommend>{0}명이 해당 리뷰를 추천</Recommend>
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
