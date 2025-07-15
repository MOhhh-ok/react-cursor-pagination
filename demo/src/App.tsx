import { useMemo } from 'react';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

// Component
export default function App() {
  const { currentCursor } = useCursorPagination<number>();

  const res = useMemo(() => fetcher(currentCursor), [currentCursor])

  return <div>
    <CursorPagination nextCursor={res.nextCursor} />
    <div>
      <pre>
        {JSON.stringify(res)}
      </pre>
    </div>
  </div>
}

// Dummy fetcher
const allData = Array.from({ length: 100 }).map((_, idx) => idx);
const LIMIT = 10;

function fetcher(cursor: number | undefined) {
  const sliceStart = cursor ? allData.indexOf(cursor) : 0;
  const data = allData.slice(sliceStart, sliceStart + LIMIT);
  let newNextCursor: number | undefined = (cursor ?? 0) + LIMIT;
  if (newNextCursor >= allData.length) { newNextCursor = undefined; }

  return { data, nextCursor: newNextCursor }

}