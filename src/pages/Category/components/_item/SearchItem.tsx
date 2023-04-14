import { PropsWithChildren } from 'react';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { getImgErr } from 'lib/ImageError';
import { SetDate } from 'lib/SetDate';
import { LikeAddTypes } from 'types/book';
import ImageButton from 'components/Button/ImageButton';

function SearchItem({
  image,
  title,
  link,
  isbn,
  author,
  pubdate,
  publisher,
  description,
  handleAddClick,
}: PropsWithChildren<LikeAddTypes>) {
  return (
    <Wrapper>
      <ImgWrapper>
        {sessionStorage.getItem('accessToken') && (
          <ImageButton
            type="button"
            src={`${process.env.PUBLIC_URL}/assets/func/heart.svg`}
            pc={[35, 35]}
            imgPC={[35, 35]}
            bgColor="rgba(0,0,0,0)"
            alt="heart"
            onClick={() =>
              handleAddClick({
                title,
                isbn,
                author,
                publisher,
                img: image,
              })
            }
          />
        )}
        <BookImage src={image} alt="book cover" onError={getImgErr} />
      </ImgWrapper>
      <InfoWrapper>
        <div>
          <a href={link} target="_blank" rel="noreferrer">
            <p
              className="infoTitle"
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(title) }}
            />
          </a>
          <p
            className="infoAuth"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(`${author.replaceAll('^', ',')}`),
            }}
          />
          <p
            className="infoPubDate"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                `${publisher}&nbsp;&nbsp;${SetDate(pubdate)}`,
              ),
            }}
          />
        </div>
        <p
          className="infoDesc"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}
        />
      </InfoWrapper>
    </Wrapper>
  );
}

export default SearchItem;

const Wrapper = styled.div`
  display: flex;
  height: 245px;
  border: 2px solid #f07055;
  border-radius: 5px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 170px;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
  background-color: #f07055;
  flex-shrink: 0;
  max-width: 150px;
  width: 100%;
  object-fit: cover;
  button {
    position: absolute;
    z-index: 100;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 90px;
  }
`;

const BookImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 180px;
  border-radius: 0px 5px 5px 0px;
  object-fit: contain;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 80px;
    height: 120px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  box-sizing: border-box;
  padding: 10px;
  a {
    text-decoration: none;
    color: black;
  }
  .infoTitle {
    height: 48px;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 5px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all 0.5s;
    &:hover {
      color: #f07055;
    }
  }
  .infoAuth {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .infoPubDate {
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 5px;
  }
  .infoDesc {
    font-size: 16px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .infoTitle {
      height: 42px;
      font-size: 16px;
    }
    .infoAuth {
      font-size: 14px;
    }
    .infoPubDate {
      font-size: 14px;
    }
    .infoDesc {
      font-size: 14px;
      -webkit-line-clamp: 3;
    }
  }
`;
