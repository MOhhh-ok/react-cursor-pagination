import { useMemo } from 'react';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

type User = {
  id: number;
  age: number;
}

export function Demo2() {
  const { currentCursor } = useCursorPagination<User>();

  const res = useMemo(() => fetcher2(currentCursor), [currentCursor])

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
const allData: User[] = Array.from({ length: 100 }).map((_, idx) => ({ id: idx, age: Math.floor(Math.random() * 10) }));
allData.sort((a, b) => a.age - b.age);
const LIMIT = 10;

function fetcher2(cursor: User | undefined) {
  const sliceStart = cursor ? allData.findIndex(item => item.id === cursor.id) : 0;
  const data = allData.slice(sliceStart, sliceStart + LIMIT);
  let newNextCursor: User | undefined = allData[sliceStart + LIMIT] ?? undefined;

  return { data, nextCursor: newNextCursor }
}