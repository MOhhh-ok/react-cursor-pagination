# react-cursor-pagination

A lightweight and flexible React library for implementing cursor-based pagination with TypeScript support.

## Features

- 🚀 Simple cursor-based pagination
- 📝 Full TypeScript support with any cursor type (string, number, custom objects)
- 📚 Stack-based cursor management for seamless back navigation
- ⚡ Zero-config setup - no provider wrapper required
- 🎨 Minimal and flexible UI components
- 💾 Optional per-key session persistence via sessionStorage

## Installation

```bash
npm install react-cursor-pagination
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

## Cursor Type Customization

The library supports **any cursor type** through TypeScript generics, providing full type safety. TypeScript automatically infers the cursor type from usage, so explicit type parameters are only needed for the hook:

### Cursor Type Examples

```tsx
// Number cursors (e.g., auto-increment IDs)
const { currentCursor } = useCursorPagination<number>();

// String cursors (e.g., UUIDs, encoded tokens)
const { currentCursor } = useCursorPagination<string>();

// Date cursors (e.g., timestamp-based pagination)
const { currentCursor } = useCursorPagination<Date>();

// Custom object cursors (e.g., complex sorting criteria)
type CustomCursor = {
  timestamp: number;
  id: string;
};
const { currentCursor } = useCursorPagination<CustomCursor>();
```

### Type-Safe Examples

#### String-based Cursors
```tsx
function PostsList() {
  const { currentCursor } = useCursorPagination<string>();
  
  // currentCursor is automatically typed as string | undefined
  const { data, nextCursor } = useFetch(`/api/posts?cursor=${currentCursor || ''}`);
  
  return (
    <div>
      <CursorPagination nextCursor={nextCursor} />
      {/* render posts */}
    </div>
  );
}
```

#### Date-based Cursors
```tsx
function TimelinePagination() {
  const { currentCursor } = useCursorPagination<Date>();
  
  // currentCursor is automatically typed as Date | undefined
  const timestamp = currentCursor?.toISOString();
  const { data, nextCursor } = useFetch(`/api/timeline?before=${timestamp || ''}`);
  
  return (
    <div>
      <CursorPagination nextCursor={nextCursor} />
      {/* render timeline */}
    </div>
  );
}
```

#### Complex Object Cursors
```tsx
type SortCursor = {
  score: number;
  createdAt: string;
  id: string;
};

function SortedResults() {
  const { currentCursor } = useCursorPagination<SortCursor>();
  
  // currentCursor is automatically typed as SortCursor | undefined
  const { data, nextCursor } = useFetch('/api/results', {
    body: JSON.stringify({ cursor: currentCursor })
  });
  
  return (
    <div>
      <CursorPagination nextCursor={nextCursor} />
      {/* render results */}
    </div>
  );
}
```

### Complete Example

```tsx
import { CursorPagination, useCursorPagination } from 'react-cursor-pagination';

export default function App() {
  const { currentCursor } = useCursorPagination<number>();
  
  // Your data fetching logic here
  const { data, nextCursor } = fetchData(currentCursor);

  return (
    <div>
      <CursorPagination nextCursor={nextCursor} />
      <div>
        {data.map(item => (
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
} = useCursorPagination<T>(paginationKey?, options?);
```

#### Parameters

- `paginationKey` (optional): String key to identify different pagination instances. Default: `'default'`
- `options` (optional): Configuration options
  - `persist`: `'session'` to persist cursors in `sessionStorage` per `paginationKey`
  - `storage` (only when `persist: 'session'`): Customize how cursors are stored/recovered
    - `serialize(value: T): string` (default: `JSON.stringify`)
    - `deserialize(value: string): T` (default: `JSON.parse`)

#### Returns

- `cursors`: Array of all cursor values
- `currentCursor`: Current active cursor (last in the array)
- `currentPage`: Current page number (cursors.length + 1)
- `addNextCursor(cursor)`: Function to add next cursor
- `removeLastCursor()`: Function to go back to previous page
- `removeAllCursors()`: Function to reset to first page

### CursorPagination<T>

Pre-built pagination component with navigation buttons. The cursor type `T` is automatically inferred from the `nextCursor` prop.

```tsx
<CursorPagination
  nextCursor={nextCursor}
  paginationKey="optional-key"
/>
```

#### Props

- `nextCursor`: The cursor for the next page (null/undefined if no next page)
- `paginationKey` (optional): Key to identify pagination instance

**Note**: TypeScript automatically infers the cursor type from `nextCursor`, so explicit type parameters are not required.

Tip: Session persistence is configured on the hook (`useCursorPagination`). The `CursorPagination` component will use the same `paginationKey` state managed by the hook.

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

### State and Persistence

#### Pagination Key-based Separation

Use different `paginationKey` values to manage independent pagination states within the same component tree:

```tsx
function Dashboard() {
  const { currentCursor: userCursor } = useCursorPagination<string>('users');
  const { currentCursor: orderCursor } = useCursorPagination<number>('orders');
  
  return (
    <div>
      <CursorPagination 
        nextCursor={userNextCursor} 
        paginationKey="users" 
      />
      <CursorPagination 
        nextCursor={orderNextCursor} 
        paginationKey="orders" 
      />
    </div>
  );
}
```

#### Session Persistence (per key)

Persist pagination state to `sessionStorage` per `paginationKey` by passing the `persist` option to the hook. This requires no provider and works across routes within the same tab/session.

```tsx
function App() {
  // Users pagination persists in sessionStorage with key "cursor-users"
  const users = useCursorPagination<string>('users', { persist: 'session' });

  // Orders pagination persists independently with key "cursor-orders"
  const orders = useCursorPagination<number>('orders', { persist: 'session' });

  return (
    <div>
      <div>
        <h2>Users</h2>
        <CursorPagination nextCursor={userData.nextCursor} paginationKey="users" />
      </div>
      <div>
        <h2>Orders</h2>
        <CursorPagination nextCursor={orderData.nextCursor} paginationKey="orders" />
      </div>
    </div>
  );
}
```

Notes:
- The persisted value is scoped by `paginationKey` and stored under `cursor-${paginationKey}` in `sessionStorage`.
- Internally, an array of serialized strings is stored; by default, `JSON.stringify`/`JSON.parse` are used.
- Call `removeAllCursors()` to clear the persisted cursors for that key.

#### Custom serialization (serialize/deserialize)

When persisting complex types (e.g., `Date` or custom objects), provide `storage.serialize` and `storage.deserialize` so values round-trip correctly.

```tsx
type User = { id: number; registeredAt: Date };

const paginationKey = 'serializedemo';

function Example() {
  const { currentCursor } = useCursorPagination<User>(paginationKey, {
    persist: 'session',
    storage: {
      serialize: (value) =>
        JSON.stringify({ id: value.id, registeredAt: value.registeredAt.toISOString() }),
      deserialize: (value) => {
        const parsed = JSON.parse(value);
        return { id: parsed.id, registeredAt: new Date(parsed.registeredAt) } as User;
      },
    },
  });

  const { data, nextCursor } = fetchUsers(currentCursor);

  return (
    <div>
      <CursorPagination nextCursor={nextCursor} paginationKey={paginationKey} />
      {/* ... */}
    </div>
  );
}
```

Tip:
- Without custom serializers, `Date` and other non-primitive types are restored as plain strings/objects by `JSON.parse`. Provide serializers to keep correct runtime types.

### Custom Pagination UI

Create your own pagination controls using the hook:

```tsx
function CustomPagination<T>({ nextCursor, paginationKey }: { nextCursor?: T, paginationKey?: string }) {
  const { 
    currentPage, 
    addNextCursor, 
    removeLastCursor, 
    removeAllCursors,
    cursors 
  } = useCursorPagination<string>(paginationKey);
  
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

