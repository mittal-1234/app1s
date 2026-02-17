'use client';

import Link from 'next/link';
import ContextHeader from './components/ContextHeader';
import SecondaryPanel from './components/SecondaryPanel';

export default function Home() {
  return (
    <div className="main-content">
      <ContextHeader
        title="Stop Missing The Right Jobs."
        subtitle="Precision-matched job discovery delivered daily at 9AM."
      />

      <div className="workspace-container">
        <div className="primary-workspace">
          <section className="card card-lg mb-4">
            <h2>Welcome to Job Notification Tracker</h2>
            <p>
              Our system uses precision-matching to ensure you only see the jobs that actually matter to your career.
              No noise, no spam. Just the right opportunities, delivered with calm intention.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
              <Link href="/settings" className="btn btn-primary">
                Start Tracking
              </Link>
              <Link href="/showcase" className="btn btn-secondary">
                Explore Design System
              </Link>
            </div>
          </section>

          <section className="card mb-4">
            <h3>How it works</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: '#666' }}>
              Define your preferences in Settings. Our engine processes thousands of listings daily and
              compiles a curated digest of matches based on your specific criteria.
            </p>
          </section>
        </div>

        <SecondaryPanel
          title="Getting Started"
          description="Click 'Start Tracking' to define your job search criteria and begin receiving matched notifications."
          prompt="Define your keywords and location preferences."
          onCopy={() => navigator.clipboard.writeText("Define your keywords and location preferences.")}
        />
      </div>
    </div>
  );
}
