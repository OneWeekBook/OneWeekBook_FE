import { MyLibraryAddTypes } from './api';

export type CategoryItemTypes = {
  id: number;
  parentId: number | null;
  categoryId: number;
  categoryName: string;
  depth: number;
};

export interface BooksTypes {
  author: string;
  description: string;
  discount: string;
  image: string;
  isbn: string;
  link: string;
  price: string;
  pubdate: string;
  publisher: string;
  title: string;
}

export interface LikeAddTypes extends BooksTypes {
  author: string;
  description: string;
  discount: string;
  image: string;
  isbn: string;
  link: string;
  price: string;
  pubdate: string;
  publisher: string;
  title: string;
  userId?: number;
  handleAddClick: ({
    title,
    author,
    publisher,
    isbn,
    img,
    userId,
  }: MyLibraryAddTypes) => void;
}

export type LibraryItemTypes = {
  id: number;
  title: string;
  author: string;
  publisher: string;
  img: string;
  isbn: string;
  progress: number;
  startTime: null | string;
  endTime: null | string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};
