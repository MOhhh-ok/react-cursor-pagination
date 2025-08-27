import { useCursorPagination } from "react-cursor-pagination";
import styles from './CustomPagination.module.css';

export type CustomPaginationProps<T> = {
  paginationKey: string;
  nextCursor: T;
}

export function CustomPagination<T>({ nextCursor, paginationKey }: CustomPaginationProps<T>) {
  const {
    currentPage,
    addNextCursor,
    removeLastCursor,
    removeAllCursors,
    cursors
  } = useCursorPagination<T>(paginationKey);

  return (
    <div className={styles.pagination}>
      <button
        onClick={removeAllCursors}
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
        onClick={removeLastCursor}
        disabled={cursors.length === 0}
        className={styles.button}
      >
        &lt;&lt;
      </button>


      <button
        onClick={() => addNextCursor(nextCursor)}
        disabled={!nextCursor}
        className={styles.button}
      >
        &gt;&gt;
      </button>
    </div>
  );
}