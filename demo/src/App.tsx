import { useState } from 'react';
import { Demo1 } from './Demo1';
import { SessionDemo } from './SessionDemo';

type Page = 'normal' | 'session'

// Component
export default function App() {
  const [page, setPage] = useState<Page>('normal');

  return <div>
    <Demo1 />
    <hr />
    <SessionDemo />
  </div>

  const component = page === 'normal' ? <Demo1 /> : <SessionDemo />;

  return <div>
    <button onClick={() => setPage('normal')}>Normal</button>
    <button onClick={() => setPage('session')}>Session</button>
    <hr />
    {component}
  </div>
}

