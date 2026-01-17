import { DEFAULT_PAGINATION_KEY } from "./config.js";
import { CursorPaginationProps } from "./types.js";
import { useCursorPagination } from "./useCursorPagination.js";

export function CursorPagination<T>(props: CursorPaginationProps<T>) {
  const { nextCursor, paginationKey = DEFAULT_PAGINATION_KEY } = props;
  const { cursors, toFirst, toNext, toPrev } = useCursorPagination<T>(paginationKey);

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <button onClick={toFirst} disabled={cursors.length === 0}>
        First
      </button>
      <button onClick={toPrev} disabled={cursors.length === 0}>
        Prev
      </button>
      <span>Page {cursors.length + 1}</span>
      <button onClick={() => toNext(nextCursor)} disabled={!nextCursor}>
        Next
      </button>
    </div>
  );
}
