import { CategoryItemTypes } from './book';

export type BoxItemType = {
  curCategory: CategoryItemTypes[];
  handleClick: (id: number) => void;
};
