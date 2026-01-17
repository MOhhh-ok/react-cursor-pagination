# react-cursor-pagination

A lightweight React library for cursor-based pagination with full TypeScript support.

## Features

- 🚀 Simple cursor-based pagination
- 📝 Full TypeScript support (string/number/custom object cursors)
- 📚 Stack-based cursor history for seamless back navigation
- ⚡ Zero-config with Jotai-based state management (no provider wrapper required)
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
  const { currentCursor, toNext } = useCursorPagination<number>(paginationKey);

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

## API Reference

### `useCursorPagination<T>(paginationKey?, options?)`

**Parameters:**
- `paginationKey` (optional): `string | number` - Unique identifier for the pagination state. Default: `"default"`
- `options` (optional): `CursorPaginationOptions<T>` - Configuration options

**Returns:**
- `cursors`: `T[]` - Array of cursor history
- `currentCursor`: `T | undefined` - Current cursor value
- `currentPage`: `number` - Current page number (1-based)
- `toNext`: `(cursor: T | null | undefined) => void` - Navigate to next page
- `toPrev`: `() => void` - Navigate to previous page
- `toFirst`: `() => void` - Navigate to first page
- `paginationKey`: `string | number` - The pagination key being used

### Options

#### Session Persistence

```tsx
const { currentCursor } = useCursorPagination<number>('items', {
  persist: {
    storage: 'session',
    serialize: (value) => String(value),
    deserialize: (value) => Number(value),
  },
});
```

**Options:**
- `persist.storage`: `"session"` - Enable sessionStorage persistence
- `persist.serialize`: `(value: T) => string` - Custom serialization (default: `JSON.stringify`)
- `persist.deserialize`: `(value: string) => T` - Custom deserialization (default: `JSON.parse`)

### `CursorPagination` Component

A minimal, unstyled pagination component for quick prototyping.

> **Note:** This component has minimal styling and is intended as a basic reference implementation. For production use, we recommend building your own custom pagination UI (see [Custom Pagination Controls](#custom-pagination-controls) below).

```tsx
<CursorPagination<T>
  nextCursor={nextCursor}
  paginationKey={paginationKey}
/>
```

**Props:**
- `nextCursor`: `T | null | undefined` - Cursor for the next page
- `paginationKey` (optional): `string | number` - Pagination key (default: `"default"`)

## Advanced Usage

### Custom Pagination Controls

```tsx
function MyPagination() {
  const { currentPage, toNext, toPrev, toFirst, cursors } = useCursorPagination('items');
  const { nextCursor } = useMyData(currentCursor);

  return (
    <div>
      <button onClick={toFirst} disabled={cursors.length === 0}>
        First
      </button>
      <button onClick={toPrev} disabled={cursors.length === 0}>
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={() => toNext(nextCursor)} disabled={!nextCursor}>
        Next
      </button>
    </div>
  );
}
```

### Multiple Pagination States

```tsx
function App() {
  const posts = useCursorPagination('posts');
  const comments = useCursorPagination('comments');

  // Each pagination state is independent
  return (
    <>
      <Posts cursor={posts.currentCursor} />
      <CursorPagination nextCursor={postsNextCursor} paginationKey="posts" />
      
      <Comments cursor={comments.currentCursor} />
      <CursorPagination nextCursor={commentsNextCursor} paginationKey="comments" />
    </>
  );
}
```

### Custom Cursor Types

```tsx
type MyCursor = {
  id: string;
  timestamp: number;
};

const { currentCursor, toNext } = useCursorPagination<MyCursor>('custom', {
  persist: {
    storage: 'session',
    serialize: (cursor) => JSON.stringify(cursor),
    deserialize: (str) => JSON.parse(str),
  },
});
```


## License

MIT
