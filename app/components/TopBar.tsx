import Link from 'next/link';
import Navbar from './Navbar';

export default function TopBar({
  projectName = "KodNest Build",
  currentStep = 1,
  totalSteps = 8,
  status = "in-progress"
}: {
  projectName?: string;
  currentStep?: number;
  totalSteps?: number;
  status?: "not-started" | "in-progress" | "shipped";
}) {
  const statusLabels = {
    "not-started": "Not Started",
    "in-progress": "In Progress",
    "shipped": "Shipped"
  };

  const badgeClass = `badge badge-${status}`;

  return (
    <div className="top-bar">
      <div style={{ fontWeight: 600, fontSize: '16px', display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          {projectName}
        </Link>
      </div>

      <Navbar />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
        <div style={{
          fontSize: '14px',
          color: '#666',
          letterSpacing: '0.5px'
        }}>
          Step {currentStep} / {totalSteps}
        </div>

        <div className={badgeClass}>
          {statusLabels[status]}
        </div>
      </div>
    </div>
  );
}
