import { DEFAULT_PAGINATION_KEY } from './config';
import { CursorPaginationProps } from './types';
import { useCursorPagination } from './useCursorPagination';


export function CursorPagination<T>(props: CursorPaginationProps<T>) {
  const { nextCursor, paginationKey = DEFAULT_PAGINATION_KEY } = props;
  const { cursors, addNextCursor, removeLastCursor, removeAllCursors } = useCursorPagination<T>(paginationKey);

  return (
    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }
    }>
      <button onClick={removeAllCursors} disabled={cursors.length === 0} >
        First
      </button>
      < button onClick={removeLastCursor} disabled={cursors.length === 0} >
        Prev
      </button>
      <span> Page {cursors.length + 1} </span>
      <button onClick={() => addNextCursor(nextCursor)} disabled={!nextCursor}>
        Next
      </button>
    </div>
  );
}