export type CategoryItemTypes = {
  id: number;
  parentId: number | null;
  categoryId: number;
  categoryName: string;
  depth: number;
};

export type BooksTypes = {
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
};
