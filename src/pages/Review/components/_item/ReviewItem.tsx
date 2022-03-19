import React from 'react';
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
      <ImgWrapper>
        <img src={img} alt="book img" />
      </ImgWrapper>
      <p>{title}</p>
      <p>{author}</p>
      <p>
        {rating} ({total})
      </p>
    </ItemWrapper>
  );
}

export default ReivewItem;

const ItemWrapper = styled.div``;

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
