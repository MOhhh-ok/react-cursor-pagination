import { useEffect, useState } from 'react';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';
import { fetchByIdCursor } from './fetcher/fetchers';
import type { Data } from './types';

const paginationKey = 'idSessionDemo'

export function IdSessionDemo() {
  const { currentCursor } = useCursorPagination<number>(paginationKey, { persist: 'session' });
  const [data, setData] = useState<Data[]>([]);
  const [nextCursor, setNextCursor] = useState<number>();

  useEffect(() => {
    fetchByIdCursor({ id: currentCursor }).then(d => {
      setData(d);
      const lastData = d[d.length - 1];
      const nextCursor = lastData
        ? lastData.id
        : undefined;
      setNextCursor(nextCursor)
    })
  }, [currentCursor]);

  return <div>
    <CursorPagination
      paginationKey={paginationKey}
      nextCursor={nextCursor} />
    <div>
      {data.map(d => <div key={d.id}>{d.id}: {d.name} (age: {d.age})</div>)}
    </div>
  </div>
}
