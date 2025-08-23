import { useMemo, useState } from 'react';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

type User = {
  id: number;
  registeredAt: Date;
}

const paginationKey = 'serializedemo';

export function SerializeDemo() {
  const { currentCursor } = useCursorPagination<User>(paginationKey, {
    persist: 'session',
    storage: {
      deserialize: (value) => {
        const parsed = JSON.parse(value);
        return {
          id: parsed.id,
          registeredAt: new Date(parsed.registeredAt)
        }
      },
      serialize: (value) => {
        return JSON.stringify({
          id: value.id,
          registeredAt: value.registeredAt.toISOString()
        })
      }
    }
  });

  const res = useMemo(() => fetcher2(currentCursor), [currentCursor])

  return <div>
    <CursorPagination nextCursor={res.nextCursor} paginationKey={paginationKey} />
    <div>
      <pre>
        {JSON.stringify(res)}
      </pre>
    </div>
  </div>
}

// Dummy fetcher
const allData: User[] = Array.from({ length: 100 }).map((_, idx) => ({
  id: idx,
  registeredAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000)
}));
allData.sort((a, b) => a.registeredAt.getTime() - b.registeredAt.getTime());
const LIMIT = 10;

function fetcher2(cursor: User | undefined) {
  const sliceStart = cursor ? allData.findIndex(item => item.id === cursor.id) : 0;
  const data = allData.slice(sliceStart, sliceStart + LIMIT);
  let newNextCursor: User | undefined = allData[sliceStart + LIMIT] ?? undefined;

  return { data, nextCursor: newNextCursor }
}