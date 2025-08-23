export type CursorPaginationProps<T> = {
  nextCursor?: T | null | undefined;
  paginationKey?: string;
};

export type CursorPaginationOptions = {
  persist?: 'session'
}