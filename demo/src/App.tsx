import { CursorPaginationProvider } from 'react-cursor-pagination';
import { Demo1 } from './Demo1';
import { Demo2 } from './Demo2';

// Component
export default function App() {
  return <div>
    <Demo1 />
    <hr />
    <CursorPaginationProvider>
      <Demo2 />
    </CursorPaginationProvider>
  </div>
}

