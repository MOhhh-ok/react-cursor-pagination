---
id: api
title: API Reference
---

Minimal reference for the public API.

## `useCursorPagination<T>`

Hook for managing cursors. It does not fetch; you fetch with `currentCursor` and pass `nextCursor` to the component.

```ts
function useCursorPagination<T>(
  paginationKey?: string,
  options?: {
    persist?: 'session';
    storage?: {
      serialize?: (value: T) => string;
      deserialize?: (value: string) => T;
    };
  }
): {
  cursors: T[];
  currentCursor?: T;
  currentPage: number;
  addNextCursor: (cursor: T | null | undefined) => void;
  removeLastCursor: () => void;
  removeAllCursors: () => void;
  paginationKey: string;
}
```

Notes:
- `paginationKey` isolates state per list.
- If `persist: 'session'`, cursors are stored in `sessionStorage` under `cursor-${paginationKey}`.

## `<CursorPagination />`

Basic component to render primitive pagination controls.

Props:

```ts
type CursorPaginationProps<T> = {
  nextCursor?: T | null | undefined;
  paginationKey?: string;
};
```

Behavior:
- Renders First / Prev / Next buttons and current page indicator.
- Calls `addNextCursor(nextCursor)` when Next is clicked.


