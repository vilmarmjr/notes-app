export type Paginated<T> = {
  page: number;
  last: boolean;
  content: Array<T>;
  total: number;
};
