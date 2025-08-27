import Link from '@docusaurus/Link';

export default function Home() {
  return (
    <main style={{ maxWidth: 800, margin: '0 auto', padding: '2rem' }}>
      <h1>React Cursor Pagination</h1>
      <p>Simple cursor-based pagination utilities for React.</p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
        <Link className="button button--primary" to="/docs/quick-start">Quick Start</Link>
        <Link className="button button--secondary" to="/docs/api">API</Link>
        <Link className="button button--secondary" to="/docs/examples">Examples</Link>
      </div>
    </main>
  );
}


