export type CursorPaginationProps<T> = {
  nextCursor?: T | null | undefined;
  paginationKey?: string | number;
};

export type CursorPaginationOptions<T> = {
  persist?: {
    storage: "session";
    serialize?: (value: T) => string;
    deserialize?: (value: string) => T;
  };
};
