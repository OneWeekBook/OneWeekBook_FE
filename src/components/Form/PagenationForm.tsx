import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

type PropsType = {
  total: number;
  curIdx: number;
  setCurIdx: React.Dispatch<React.SetStateAction<number>>;
};

function PagenationForm({ total, curIdx, setCurIdx }: PropsType) {
  const RotateStyle = useMemo(() => ({ transform: 'rotate(180deg)' }), []);
  const len = Math.ceil(total / 12);
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
        <ArrowButton onClick={prevClick}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/pagination-arrow.svg`}
            alt="prev arrow"
            style={RotateStyle}
          />
        </ArrowButton>
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
        <ArrowButton onClick={nextClick}>
          <img
            src={`${process.env.PUBLIC_URL}/assets/pagination-arrow.svg`}
            alt="next arrow"
          />
        </ArrowButton>
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

const ArrowButton = styled.button`
  background-color: white;
  border: none;
  margin: 0 10px;
  width: 20px;
  height: 20px;
  img {
    width: 100%;
    height: 100%;
  }
`;

const PageNum = styled.button<{ isSelected: boolean }>`
  font-size: 15px;
  border: 0 none;
  border-radius: 25px;
  background-color: ${({ isSelected }) => (isSelected ? '#1e90ff' : '#08c1e9')};
  color: white;
  width: 30px;
  height: 30px;
  margin: auto 5px;
`;
