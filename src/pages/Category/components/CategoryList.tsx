import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import CategoryBoxItem from './CategoryBoxItem';

const CategoryItems = [
  { parentId: null, categoryId: 100, categoryTitle: '소설' },
  { parentId: 100, categoryId: 100010, categoryTitle: '나라별 소설' },
  { parentId: 100, categoryId: 100020, categoryTitle: '고전/문학' },
  { parentId: 100, categoryId: 100030, categoryTitle: '장르소설' },
  { parentId: null, categoryId: 110, categoryTitle: '시/에세이' },
  { parentId: 110, categoryId: 110010, categoryTitle: '한국시' },
  { parentId: 110, categoryId: 110020, categoryTitle: '외국시' },
  { parentId: null, categoryId: 120, categoryTitle: '인문' },
  { parentId: 120, categoryId: 120010, categoryTitle: '인문일반' },
  { parentId: null, categoryId: 200, categoryTitle: '소설' },
  { parentId: 200, categoryId: 100040, categoryTitle: '테마소설' },
  { parentId: null, categoryId: 210, categoryTitle: '시/에세이' },
  { parentId: 210, categoryId: 110030, categoryTitle: '인물 에세이' },
  { parentId: 210, categoryId: 110040, categoryTitle: '여행 에세이' },
  { parentId: 210, categoryId: 110050, categoryTitle: '성공 에세이' },
  { parentId: 210, categoryId: 110060, categoryTitle: '독서 에세이' },
  { parentId: null, categoryId: 220, categoryTitle: '인문' },
  { parentId: 220, categoryId: 120020, categoryTitle: '심리' },
  { parentId: 220, categoryId: 120030, categoryTitle: '교육학' },
  { parentId: null, categoryId: 300, categoryTitle: '소설' },
  { parentId: null, categoryId: 310, categoryTitle: '시/에세이' },
  { parentId: null, categoryId: 320, categoryTitle: '인문' },
  { parentId: null, categoryId: 400, categoryTitle: '소설' },
  { parentId: null, categoryId: 410, categoryTitle: '시/에세이' },
  { parentId: null, categoryId: 420, categoryTitle: '인문' },
  { parentId: null, categoryId: 500, categoryTitle: '소설' },
  { parentId: null, categoryId: 510, categoryTitle: '시/에세이' },
  { parentId: null, categoryId: 520, categoryTitle: '인문' },
  { parentId: null, categoryId: 600, categoryTitle: '소설' },
  { parentId: null, categoryId: 610, categoryTitle: '시/에세이' },
  { parentId: null, categoryId: 620, categoryTitle: '인문' },
  { parentId: null, categoryId: 700, categoryTitle: '소설' },
  { parentId: null, categoryId: 710, categoryTitle: '시/에세이' },
  { parentId: null, categoryId: 720, categoryTitle: '인문' },
  { parentId: null, categoryId: 800, categoryTitle: '소설' },
  { parentId: null, categoryId: 810, categoryTitle: '시/에세이' },
  { parentId: null, categoryId: 820, categoryTitle: '인문' },
];

export type CategoryItemTypes = {
  parentId: number | null;
  categoryId: number;
  categoryTitle: string;
};

function CategoryList() {
  const [parentCategory, setParentCategory] = useState<CategoryItemTypes[]>([]);

  const getFilterCategories = useCallback(() => {
    const parent = CategoryItems.filter((item) => item.parentId === null);
    setParentCategory(parent);
  }, []);

  useEffect(() => {
    getFilterCategories();
  }, []);

  return (
    <Wrapper>
      <CategoryGridWrapper>
        {parentCategory.map((item: CategoryItemTypes) => (
          <CategoryBoxItem key={item.categoryId} {...item} />
        ))}
      </CategoryGridWrapper>
    </Wrapper>
  );
}

export default CategoryList;

const Wrapper = styled.div`
  width: 100%;
`;

const CategoryGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
`;
