import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';

export default function Home() {
  return (
    <div className="main-content">
      <ContextHeader
        title="KodNest Premium Build System"
        subtitle="Calm, Intentional, Coherent, Confident"
      />

      <div className="workspace-container">
        <div className="primary-workspace">
          <section className="card card-lg mb-4">
            <h2>Welcome to KodNest</h2>
            <p>
              The KodNest Premium Build System is a disciplined design framework for high-stakes product development.
              It prioritizes clarity over clutter, and intention over noise.
            </p>
            <p>
              This environment is strictly governed by a four-color palette and a fixed spacing scale.
              The result is a coherent experience that feels like it was designed by one mind.
            </p>
            <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
              <button className="btn btn-primary" onClick={() => window.location.href = '/showcase'}>
                View Design System
              </button>
              <button className="btn btn-secondary">
                Learn More
              </button>
            </div>
          </section>

          <section className="card mb-4">
            <h3>System Overview</h3>
            <p style={{ fontSize: 'var(--text-sm)', color: '#666' }}>
              Every component here adheres to the core philosophy: no gradients, no glassmorphism, no neon noise.
              Just clean typography and purposeful layout.
            </p>
          </section>
        </div>

        <SecondaryPanel
          title="Getting Started"
          description="Explore the showcase to see the full range of components and design tokens available in the system."
          prompt="Explore the KodNest Design System"
          onCopy={() => navigator.clipboard.writeText("Explore the KodNest Design System")}
          onBuild={() => alert("System is already built and deployed.")}
        />
      </div>
    </div>
  );
}
