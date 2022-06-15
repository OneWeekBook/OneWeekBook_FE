import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageButton from 'components/Button/ImageButton';

type PropsType = {
  total: number;
  curIdx: number;
  display: number;
  setCurIdx: React.Dispatch<React.SetStateAction<number>>;
};

function PagenationForm({ total, curIdx, display, setCurIdx }: PropsType) {
  const len = Math.ceil(total / display);
  const pageNums = [];

  for (let i = 1; i <= len; i += 1) {
    pageNums.push(i);
  }

  const [page, setPage] = useState<number[]>([]);
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(5);

  useEffect(() => {
    setPage(page.slice(0, 5));
  }, []);

  const prevClick = () => {
    if (start !== 0) {
      setEnd(start);
      setStart(start - 5);
      setCurIdx(start);
    }
  };

  const nextClick = () => {
    if (end + 5 < len) {
      setStart(end);
      setCurIdx(end + 1);
      setEnd(end + 5);
    } else if (start + 5 < len && end + 5 >= len) {
      setStart(end);
      setCurIdx(end + 1);
      setEnd(len);
    }
  };

  return (
    <PageNationWrapper>
      {len > 5 && curIdx > 5 && (
        <ImageButton
          type="button"
          src={`${process.env.PUBLIC_URL}/assets/arrow/pagination-prev-arrow.svg`}
          pc={[20, 20]}
          imgPC={[20, 20]}
          bgColor="white"
          alt="prev arrow"
          margin={[0, 10, 0, 10]}
          onClick={prevClick}
        />
      )}
      {pageNums.length > 0 &&
        pageNums.slice(start, end).map((num) => (
          <PageNum
            key={num}
            onClick={() => setCurIdx(num)}
            isSelected={curIdx === num}
          >
            {num}
          </PageNum>
        ))}
      {len > 5 && curIdx <= 5 && (
        <ImageButton
          type="button"
          src={`${process.env.PUBLIC_URL}/assets/arrow/pagination-next-arrow.svg`}
          pc={[20, 20]}
          imgPC={[20, 20]}
          bgColor="white"
          alt="next arrow"
          margin={[0, 10, 0, 10]}
          onClick={nextClick}
        />
      )}
    </PageNationWrapper>
  );
}

export default PagenationForm;

const PageNationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
  text-align: center;
`;

const PageNum = styled.button<{ isSelected: boolean }>`
  font-size: 15px;
  border: 0 none;
  border-radius: 25px;
  background-color: ${({ isSelected }) => (isSelected ? '#1e90ff' : '#08c1e9')};
  color: white;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: auto 5px;
`;
