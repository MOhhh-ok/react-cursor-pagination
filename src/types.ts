
export type CursorPaginationProps<T extends string | number> = {
  nextCursor?: T | null | undefined;
  paginationKey?: string;
};