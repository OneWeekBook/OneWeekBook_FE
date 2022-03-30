import React, { useState } from 'react';
import WriteModal from 'components/Modal';
import styled from 'styled-components';
import { useInput } from 'hooks/useInput';
import { BooksType } from '../_item/BookItem';

const RecommendItem = [
  {
    id: 0,
    value: 'best',
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/best_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/best_none.png`,
  },
  {
    id: 1,
    value: 'recommend',
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/recommend_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/recommend_none.png`,
  },
  {
    id: 2,
    value: 'good',
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/good_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/good_none.png`,
  },
  {
    id: 3,
    value: 'soso',
    img_done: `${process.env.PUBLIC_URL}/assets/recommend/soso_done.png`,
    img_none: `${process.env.PUBLIC_URL}/assets/recommend/soso_none.png`,
  },
];

type PropsType = {
  toggleIsOn: () => void;
};

function WriteReviewModal({
  role,
  title,
  author,
  startDate,
  endDate,
  toggleIsOn,
}: BooksType & PropsType) {
  const [recommend, setRecommend] = useState<string>('');
  const [review, changeReview] = useInput('');

  const recommendClick = (recommend: string) => {
    setRecommend(recommend);
  };

  return (
    <WriteModal
      type="write"
      title="책 리뷰하기"
      titleSize={[24, 18]}
      width={768}
      height={400}
      handleToggle={toggleIsOn}
      close
      isOkBtn
      isCancelBtn
      okBtnTitle="저장하기"
      handleOkClick={toggleIsOn}
      cancelBtnTitle="나중에..."
      handleCanCelClick={toggleIsOn}
    >
      <BodyWrapper>
        <InfoWrapper>
          <div className="bookInfo">
            <p>{title}</p>
            <p>
              {author} {startDate} ~ {endDate}
            </p>
          </div>
          {role === 'read' && <button type="button">독서 완료</button>}
        </InfoWrapper>
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
        <textarea
          placeholder="리뷰를 작성해주세요."
          defaultValue={review}
          onBlur={changeReview}
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
    font-size: 18px;
    font-weight: 600;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookInfo {
      font-size: 16px;
      font-weight: 600;
    }
  }
`;

const RecommendWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 5px auto;
  p {
    font-size: 18px;
    font-weight: 600;
  }
  img {
    margin-left: 10px;
  }
`;

const RecommendButton = styled.button`
  background-color: white;
  border: none;
`;
