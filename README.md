# react-cursor-pagination

A lightweight and flexible React library for implementing cursor-based pagination with TypeScript support.

## Features

- 🚀 Simple cursor-based pagination
- 📝 TypeScript support
- 🔧 Customizable pagination keys
- 🎯 Built on Jotai for state management
- 🎨 Minimal and flexible UI components

## Installation

```bash
npm install react-cursor-pagination
# or
yarn add react-cursor-pagination
# or
pnpm add react-cursor-pagination
```

## Quick Start

### Basic Usage

```tsx
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

function App() {
  const { currentCursor } = useCursorPagination<number>();
  
  // Fetch data based on current cursor
  const data = fetchData(currentCursor);
  
  return (
    <div>
      <CursorPagination nextCursor={data.nextCursor} />
      <div>
        {data.items.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
```

### Complete Example

```tsx
import { useMemo } from 'react';
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

// Sample data
const allData = Array.from({ length: 100 }).map((_, idx) => ({
  id: idx,
  name: `Item ${idx}`
}));

const LIMIT = 10;

function fetcher(cursor: number | undefined) {
  const sliceStart = cursor ? allData.findIndex(item => item.id === cursor) : 0;
  const data = allData.slice(sliceStart, sliceStart + LIMIT);
  let nextCursor: number | undefined = data.length === LIMIT ? data[data.length - 1].id + 1 : undefined;
  
  if (nextCursor && nextCursor >= allData.length) {
    nextCursor = undefined;
  }
  
  return { data, nextCursor };
}

export default function App() {
  const { currentCursor } = useCursorPagination<number>();
  const result = useMemo(() => fetcher(currentCursor), [currentCursor]);

  return (
    <div>
      <CursorPagination nextCursor={result.nextCursor} />
      <div>
        {result.data.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
```

## API Reference

### useCursorPagination<T>

The main hook for managing cursor pagination state.

```tsx
const {
  cursors,
  currentCursor,
  currentPage,
  addNextCursor,
  removeLastCursor,
  removeAllCursors
} = useCursorPagination<T>(paginationKey?);
```

#### Parameters

- `paginationKey` (optional): String key to identify different pagination instances. Default: `'default'`

#### Returns

- `cursors`: Array of all cursor values
- `currentCursor`: Current active cursor (last in the array)
- `currentPage`: Current page number (cursors.length + 1)
- `addNextCursor(cursor)`: Function to add next cursor
- `removeLastCursor()`: Function to go back to previous page
- `removeAllCursors()`: Function to reset to first page

### CursorPagination<T>

Pre-built pagination component with navigation buttons.

```tsx
<CursorPagination<T>
  nextCursor={nextCursor}
  paginationKey="optional-key"
/>
```

#### Props

- `nextCursor`: The cursor for the next page (null/undefined if no next page)
- `paginationKey` (optional): Key to identify pagination instance

## Advanced Usage

### Multiple Pagination Instances

You can manage multiple independent pagination instances using different keys:

```tsx
function App() {
  const users = useCursorPagination<string>('users');
  const posts = useCursorPagination<number>('posts');
  
  return (
    <div>
      <div>
        <h2>Users</h2>
        <CursorPagination 
          nextCursor={userData.nextCursor} 
          paginationKey="users" 
        />
      </div>
      
      <div>
        <h2>Posts</h2>
        <CursorPagination 
          nextCursor={postData.nextCursor} 
          paginationKey="posts" 
        />
      </div>
    </div>
  );
}
```

### Custom Pagination UI

Create your own pagination controls using the hook:

```tsx
function CustomPagination({ nextCursor }: { nextCursor?: string | null }) {
  const { 
    currentPage, 
    addNextCursor, 
    removeLastCursor, 
    removeAllCursors,
    cursors 
  } = useCursorPagination<string>();
  
  return (
    <div className="pagination">
      <button 
        onClick={removeAllCursors}
        disabled={cursors.length === 0}
        className="btn btn-secondary"
      >
        ← First
      </button>
      
      <button 
        onClick={removeLastCursor}
        disabled={cursors.length === 0}
        className="btn btn-secondary"
      >
        ← Previous
      </button>
      
      <span className="page-info">
        Page {currentPage}
      </span>
      
      <button 
        onClick={() => addNextCursor(nextCursor)}
        disabled={!nextCursor}
        className="btn btn-primary"
      >
        Next →
      </button>
    </div>
  );
}
```


## License

MIT

