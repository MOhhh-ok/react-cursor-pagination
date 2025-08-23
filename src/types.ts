export type CursorPaginationProps<T> = {
  nextCursor?: T | null | undefined;
  paginationKey?: string;
};

export type CursorPaginationOptions<T> = {
  persist?: 'session',
  storage?: {
    serialize?: (value: T) => string,
    deserialize?: (value: string) => T,
  }
}