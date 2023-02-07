import styled from 'styled-components';

interface PropsType {
  ratingAverage: number;
}

function ReviewStar({ ratingAverage }: PropsType) {
  return (
    <RateWrapper>
      {Array(Math.floor(ratingAverage))
        .fill(true)
        .map((item, idx) => (
          <img
            key={idx}
            src={`${process.env.PUBLIC_URL}/assets/func/star-full.png`}
            alt="star"
          />
        ))}
      {ratingAverage % 1 !== 0 && (
        <>
          {ratingAverage % 1 < 0.5 ? (
            <img
              src={`${process.env.PUBLIC_URL}/assets/func/star-one-third.png`}
              alt="star"
            />
          ) : ratingAverage % 1 === 0.5 ? (
            <img
              src={`${process.env.PUBLIC_URL}/assets/func/star-half.png`}
              alt="star"
            />
          ) : (
            <img
              src={`${process.env.PUBLIC_URL}/assets/func/star-two-third.png`}
              alt="star"
            />
          )}
        </>
      )}
      {Array(Math.floor(5 - ratingAverage))
        .fill(false)
        .map((item, idx) => (
          <img
            key={idx}
            src={`${process.env.PUBLIC_URL}/assets/func/star-empty.png`}
            alt="star"
          />
        ))}
      <p>{ratingAverage.toFixed(1)}</p>
    </RateWrapper>
  );
}

export default ReviewStar;

const RateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  img {
    width: 25px;
    height: 25px;
  }
  p {
    padding-left: 10px;
    font-size: 24px;
    color: #fff;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    img {
      width: 15px;
      height: 15px;
    }
    p {
      padding-left: 0;
      font-size: 14px;
    }
  }
`;
