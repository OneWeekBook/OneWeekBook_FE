import { CategoryItemTypes } from './book';

export interface BoxItemType {
  curCategory: CategoryItemTypes[];
  handleClick: (id: number) => void;
}
