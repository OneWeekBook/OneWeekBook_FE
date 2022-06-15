import { PropsWithChildren } from 'react';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
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
  userId,
  handleAddClick,
}: PropsWithChildren<LikeAddTypes>) {
  return (
    <Wrapper>
      <ImgWrapper>
        {userId && (
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
                userId,
                img: image,
              })
            }
          />
        )}
        <img src={image} alt="book cover" />
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
              __html: DOMPurify.sanitize(
                `${author}&nbsp;&nbsp;${publisher}&nbsp;&nbsp;${SetDate(
                  pubdate,
                )}`,
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
  background-color: blue;
  flex-shrink: 0;
  width: 150px;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
  button {
    position: absolute;
  }
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    width: 100px;
  }
`;

const InfoWrapper = styled.div`
  flex-glow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 10px;
  a {
    text-decoration: none;
    color: black;
  }
  .infoTitle {
    font-size: 18px;
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
    font-size: 16px;
    font-weight: 600;
  }
  .infoDesc {
    min-height: 90px;
    font-size: 14px;
    display: -webkit-box;
    word-wrap: break-word;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  padding-bottom: 5px;
  border-bottom: 2px solid #e6e6e6;
  @media (max-width: ${({ theme: { device } }) => device.mobile.maxWidth}px) {
    .infoTitle {
      font-size: 16px;
    }
    .infoAuth {
      font-size: 14px;
    }
  }
`;
