import { ApiMyLibraryAdd } from './api';

export interface CategoryItemTypes {
  id: number;
  parentId: number | null;
  categoryId: number;
  categoryName: string;
  depth: number;
}

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
  }: ApiMyLibraryAdd) => void;
}

export interface LibraryItemTypes {
  id: number;
  title: string;
  author: string;
  publisher: string;
  img: string;
  isbn: string;
  progress: number;
  startTime: null | string;
  endTime: null | string;
  review: null | string;
  reviewCreationTime: null | string;
  createdAt: string;
  updatedAt: string;
  userId: number;
}

export interface InfoTypes {
  progress: number;
  title: string;
  author: string;
  startTime: string | null;
  endTime: string | null;
}

export interface ParagraphTypes {
  id: number;
  bookId: number;
  paragraph: string;
  createdAt: string;
  updatedAt: string;
}
