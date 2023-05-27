import styled from 'styled-components';
import theme from 'styles/theme';
import { ReviewBookResponseTypes } from 'types/response';
import DefaultImage from 'components/atoms/images/DefaultImage';
import StarImage from 'components/atoms/images/StarImage';
import DefaultText from 'components/atoms/texts/DefaultText';

function BookBanner({
  author,
  countReviews,
  img,
  publisher,
  ratingAverage,
  title,
}: ReviewBookResponseTypes) {
  const RateArr = [0, 0, 0, 0, 0];
  for (let i = 0; i < Math.floor(ratingAverage); i += 1) {
    RateArr[i] = 1;
  }
  RateArr[Math.floor(ratingAverage)] =
    ratingAverage - Math.floor(ratingAverage);

  return (
    <BookBannerModule>
      <DefaultImage
        imageSrc={img}
        imageAlt="book img"
        pc={[160, 240]}
        mobile={[120, 180]}
      />
      <InfoWrapper>
        <DefaultText
          className="bookTitle"
          fontSize={2.2}
          fontColor={theme.color.COLOR_WHITE}
          fontWeight={700}
          content={title.replaceAll('<b>', '').replaceAll('</b>', '')}
          reactive
        />
        <div>
          <DefaultText
            className="bookAuthor"
            fontSize={1.8}
            fontColor={theme.color.COLOR_WHITE}
            content={author.replaceAll('<b>', '').replaceAll('</b>', '')}
            reactive
          />
          <DefaultText
            className="bookAuthor"
            fontSize={1.8}
            fontColor={theme.color.COLOR_WHITE}
            content={publisher.replaceAll('<b>', '').replaceAll('</b>', '')}
            reactive
          />
        </div>
        <ReviewWrapper>
          <DefaultTexts>
            <DefaultText
              content="전체 리뷰 :&nbsp;"
              fontSize={2}
              fontColor={theme.color.COLOR_WHITE}
              reactive
            />
            <DefaultText
              content={countReviews}
              fontSize={2}
              fontColor={theme.color.COLOR_CORAL}
              reactive
            />
          </DefaultTexts>
          <AvarageScore>
            {RateArr.map((el, idx) => (
              <StarImage key={idx} score={el} pc={[20, 20]} />
            ))}
            <DefaultText
              content={ratingAverage.toFixed(1)}
              fontColor={theme.color.COLOR_CORAL}
            />
          </AvarageScore>
        </ReviewWrapper>
      </InfoWrapper>
    </BookBannerModule>
  );
}

export default BookBanner;

const BookBannerModule = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  box-sizing: border-box;
  height: 300px;
  padding-top: 30px;
  padding-bottom: 30px;
  margin: auto;
  img {
    border-radius: 0px 5px 5px 0px;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    padding-top: 10px;
    padding-bottom: 10px;
    height: 200px;
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReviewWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const DefaultTexts = styled.div`
  display: flex;
`;

const AvarageScore = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
`;
