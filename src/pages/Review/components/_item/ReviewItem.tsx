import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { ReviewItemType } from '../ReviewList';

function ReivewItem({
  img,
  title,
  author,
  rating,
  total,
}: React.PropsWithChildren<ReviewItemType>) {
  return (
    <ItemWrapper>
      <Link to={`/review/${title}`}>
        <ImgWrapper>
          <img src={img} alt="book img" />
        </ImgWrapper>
        <p>{title}</p>
        <p>{author}</p>
        <p>
          {rating} ({total})
        </p>
      </Link>
    </ItemWrapper>
  );
}

export default ReivewItem;

const ItemWrapper = styled.div`
  a {
    text-decoration: none;
    color: black;
  }
`;

const ImgWrapper = styled.div`
  background-color: lightcoral;
  width: 160px;
  height: 200px;
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
  }
`;
