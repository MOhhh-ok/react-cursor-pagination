import { useEffect, useState } from 'react';
import BrowserOnly from '@docusaurus/BrowserOnly';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

type Data = { id: number; name: string; age: number };

function fakeFetch(cursor?: number): Promise<{ items: Data[]; nextCursor?: number }> {
  const items: Data[] = Array.from({ length: 5 }).map((_, i) => {
    const id = (cursor ?? 0) + i + 1;
    return { id, name: `User ${id}`, age: 20 + ((id * 7) % 30) };
  });
  const next = items.length > 0 ? items[items.length - 1].id : undefined;
  return Promise.resolve({ items, nextCursor: next });
}

function IdCursorDemo() {
  const paginationKey = 'mdx-id-cursor';
  const { currentCursor } = useCursorPagination<number>(paginationKey);
  const [items, setItems] = useState<Data[]>([]);
  const [nextCursor, setNextCursor] = useState<number | undefined>();

  useEffect(() => {
    fakeFetch(currentCursor).then((page) => {
      setItems(page.items);
      setNextCursor(page.nextCursor);
    });
  }, [currentCursor]);

  return (
    <div>
      <CursorPagination paginationKey={paginationKey} nextCursor={nextCursor} />
      <ul>
        {items.map((d) => (
          <li key={d.id}>{d.id}: {d.name} (age: {d.age})</li>
        ))}
      </ul>
    </div>
  );
}

export default function Demos() {
  return (
    <BrowserOnly fallback={<div />}>
      {() => <IdCursorDemo />}
    </BrowserOnly>
  );
}


