# react-cursor-pagination

A lightweight React library for cursor-based pagination with full TypeScript support.

## Docs

- Website: https://mohhh-ok.github.io/react-cursor-pagination/

## Features

- 🚀 Simple cursor-based pagination
- 📝 Full TypeScript support (string/number/custom object cursors)
- 📚 Stack-based cursor history for seamless back navigation
- ⚡ Zero-config (no provider wrapper required)
- 🎨 Minimal, flexible UI component (`CursorPagination`) or build your own
- 💾 Optional per-key session persistence via `sessionStorage`

## Installation

```bash
npm install react-cursor-pagination
```

## Quick Start

```tsx
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

const paginationKey = 'items';

export default function App() {
  const { currentCursor } = useCursorPagination<number>(paginationKey);

  // Fetch data using currentCursor and obtain nextCursor
  // const { items, nextCursor } = await fetchItems(currentCursor);

  return (
    <div>
      <CursorPagination nextCursor={nextCursor} paginationKey={paginationKey} />
      {/* render items here */}
    </div>
  );
}
```

## License

MIT


