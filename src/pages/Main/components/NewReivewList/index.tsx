import { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { AppStateType } from 'redux/reducers';
import { NewReviewTypes } from 'types/main';
import DefaultButton from 'components/Button/DefaultButton';
import NewReivewItem from './NewReivewItem';

function NewReviewList() {
  const { newReviews } = useSelector((state: AppStateType) => state.newReview);
  const [end, setEnd] = useState(5);

  const onClick = () => {
    if (end < 20) {
      setEnd(end + 5);
    }
  };

  return (
    <Wrapper>
      <NewReviewTitle>따끈따끈한 새 리뷰</NewReviewTitle>
      <div>
        {newReviews.length &&
          newReviews
            .slice(0, end)
            .map((item: NewReviewTypes, idx: number) => (
              <NewReivewItem key={item.id} {...item} idx={idx} />
            ))}
      </div>
      {end !== 20 && (
        <ButtonWrapper>
          <DefaultButton
            pc={[150, 38]}
            onClick={onClick}
            fontWeight={700}
            padding={[5, 0, 5, 0]}
            isHover
            hoverBgColor="#08c1e9"
            bgColor="#1e90ff"
            color="white"
            title="더 보기"
          />
        </ButtonWrapper>
      )}
    </Wrapper>
  );
}

export default NewReviewList;

const Wrapper = styled.div`
  margin: 50px auto;
  width: 100%;
  height: auto;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    width: 95%;
  }
`;

const NewReviewTitle = styled.p`
  font-size: 25px;
  margin-bottom: 22px;
  @media (max-width: ${({ theme: { device } }) => device.pc.maxWidth}px) {
    font-size: 20px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    font-size: 18px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
