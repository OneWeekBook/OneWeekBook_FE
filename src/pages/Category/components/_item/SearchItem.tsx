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
              __html: DOMPurify.sanitize(`${author}`),
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
  height: 200px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    height: 150px;
  }
`;

const ImgWrapper = styled.div`
  flex-shrink: 0;
  max-width: 150px;
  object-fit: contain;
  button {
    position: absolute;
  }
`;

const BookImage = styled.img`
  width: 150px;
  height: 200px;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 100px;
    height: 150px;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  margin-left: 10px;
  a {
    text-decoration: none;
    color: black;
  }
  .infoTitle {
    height: 46px;
    font-size: 16px;
    font-weight: 700;
    margin-bottom: 5px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .infoAuth {
    font-size: 14px;
    font-weight: 600;
    display: block;
    margin-bottom: 5px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .infoPubDate {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 5px;
  }
  .infoDesc {
    font-size: 14px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  padding-bottom: 5px;
  border-bottom: 2px solid ${({ theme }) => theme.color.COLOR_LAYOUT_THREE};
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .infoDesc {
      -webkit-line-clamp: 2;
    }
  }
`;
