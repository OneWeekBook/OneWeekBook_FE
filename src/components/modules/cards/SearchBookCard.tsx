import { PropsWithChildren } from 'react';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { LikeAddTypes } from 'types/module';
import { getImgErr } from 'utils/ImageError';
import { SetDate } from 'utils/SetDate';
import { getAccessTokenFromSessionStorage } from 'utils/accessTokenHandler';
import { FUNC_IMAGE } from 'constants/image';
import ImageButton from 'components/atoms/buttons/ImageButton';
import DefaultImage from 'components/atoms/images/DefaultImage';

function SearchBookCard({
  image,
  title,
  link,
  isbn,
  author,
  pubdate,
  publisher,
  description,
  handleFavoriteClick,
}: PropsWithChildren<LikeAddTypes>) {
  return (
    <SearchBookCardContainer>
      <BookCover>
        {getAccessTokenFromSessionStorage() && (
          <ImageButton
            type="button"
            src={FUNC_IMAGE.HEART}
            imageSize={30}
            handleClick={() =>
              handleFavoriteClick({
                title,
                isbn,
                author,
                publisher,
                img: image,
              })
            }
          />
        )}
        <DefaultImage
          className="bookimage"
          imageSrc={image}
          imageAlt="book cover"
          onError={getImgErr}
          pc={[120, 180]}
          mobile={[80, 120]}
        />
      </BookCover>
      <BookInfoDetail>
        <a href={link} target="_blank" rel="noreferrer">
          <p
            className="bookTitle"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
          />
        </a>
        <p
          className="bookAuth"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(`${author.replaceAll('^', ',')}`),
          }}
        />
        <p
          className="bookAuth"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              `${publisher}&nbsp;&nbsp;${SetDate(pubdate)}`,
            ),
          }}
        />
        <p
          className="bookDesc"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </BookInfoDetail>
    </SearchBookCardContainer>
  );
}

export default SearchBookCard;

const SearchBookCardContainer = styled.div`
  display: flex;
  height: 245px;
  border: 2px solid ${({ theme }) => theme.color.COLOR_CORAL};
  border-radius: 5px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 170px;
  }
`;

const BookCover = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.color.COLOR_CORAL};
  flex-shrink: 0;
  max-width: 150px;
  width: 100%;
  button {
    position: absolute;
    z-index: 100;
    top: 15px;
    left: 15px;
  }
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 95px;
  }
`;

const BookInfoDetail = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 5px;
  box-sizing: border-box;
  overflow: hidden;
  padding: 10px;
  .bookTitle {
    height: 50px;
    font-size: 1.8rem;
    font-weight: 700;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.5s;
    &:hover {
      color: ${({ theme }) => theme.color.COLOR_CORAL};
    }
  }
  .bookAuth {
    font-size: 1.6rem;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .bookDesc {
    font-size: 1.6rem;
    line-height: 2rem;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .bookTitle {
      height: 45px;
      font-size: 1.6rem;
    }
    .bookAuth {
      font-size: 1.4rem;
    }
    .bookDesc {
      font-size: 1.4rem;
      line-height: 1.8rem;
      -webkit-line-clamp: 3;
    }
  }
`;
