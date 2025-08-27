---
id: quick-start
title: Quick Start
---

React Cursor Pagination is a simple React library for cursor-based pagination.

## Install

```bash
npm install react-cursor-pagination
```

## Minimal example (number cursor)

```tsx
import { useEffect, useState } from 'react';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

type Item = { id: number; name: string };

async function fetchItems(cursor?: number): Promise<{ items: Item[]; nextCursor?: number }> {
  const res = await fetch(`/api/items?cursor=${cursor ?? ''}`);
  return res.json();
}

const paginationKey = 'items';

export default function App() {
  const { currentCursor } = useCursorPagination<number>(paginationKey);
  const [items, setItems] = useState<Item[]>([]);
  const [nextCursor, setNextCursor] = useState<number | undefined>();

  useEffect(() => {
    fetchItems(currentCursor).then((page) => {
      setItems(page.items);
      const last = page.items[page.items.length - 1];
      setNextCursor(last ? last.id : undefined);
    });
  }, [currentCursor]);

  return (
    <div>
      <CursorPagination paginationKey={paginationKey} nextCursor={nextCursor} />
      {items.map((i) => (
        <div key={i.id}>{i.name}</div>
      ))}
    </div>
  );
}
```

See API and Examples for more.


