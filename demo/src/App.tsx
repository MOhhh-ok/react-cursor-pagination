import { AgeCursorDemo } from './AgeCursorDemo';
import { CustomPaginationDemo } from './CustomPaginationDemo';
import { IdCursorDemo } from './IdCursorDemo';
import { IdSessionDemo } from './IdSessionDemo';
import { JoinedSerializeDemo } from './JoinedSerializeDemo';

export default function App() {
  return <main>
    <h1>React Cursor Pagination Demo</h1>
    <h2>Id cursor</h2>
    <p>Id based pagination</p>
    <IdCursorDemo />
    <h2>Id cursor with session</h2>
    <p>Session storage pagination. Pagination state persists through page refreshes.</p>
    <IdSessionDemo />
    <h2>Mixed Cursor</h2>
    <p>Mixed cursor(age + id) based pagination</p>
    <AgeCursorDemo />
    <h2>Mixed Cursor with session serialized</h2>
    <p>Mixed cursor(joined + id) based pagination with session. Pagination state persists through page refreshes.</p>
    <JoinedSerializeDemo />
    <h2>Custom Pagination</h2>
    <p>Custom pagination component</p>
    <CustomPaginationDemo />
  </main>
}

