import { useCursorPagination } from "react-cursor-pagination";
import styles from "./CustomPagination.module.css";

export type CustomPaginationProps<T> = {
  paginationKey: string;
  nextCursor: T;
};

export function CustomPagination<T>({ nextCursor, paginationKey }: CustomPaginationProps<T>) {
  const {
    currentPage,
    toFirst,
    toNext,
    toPrev,
    cursors,
  } = useCursorPagination<T>(paginationKey);

  return (
    <div className={styles.pagination}>
      <button
        onClick={toFirst}
        disabled={cursors.length === 0}
        className={styles.button}
      >
        First
      </button>

      <br />

      <span>
        Page {currentPage}
      </span>

      <button
        onClick={toPrev}
        disabled={cursors.length === 0}
        className={styles.button}
      >
        &lt;&lt;
      </button>

      <button
        onClick={() => toNext(nextCursor)}
        disabled={!nextCursor}
        className={styles.button}
      >
        &gt;&gt;
      </button>
    </div>
  );
}
