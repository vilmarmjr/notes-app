import { Paginated } from '@common/models';

export function paginateResponse<T>(
  content: Array<T>,
  total: number,
  page: number,
  take: number,
): Paginated<T> {
  const remainingContent = total - page * take;
  return {
    page,
    content,
    total,
    last: remainingContent <= 0,
  };
}
