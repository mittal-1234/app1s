import ContextHeader from '../../components/ContextHeader';
import SecondaryPanel from '../../components/SecondaryPanel';

export default function Dashboard() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Dashboard"
                subtitle="Manage and track your active job matches."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="empty-state card card-lg">
                        <h3>No jobs yet.</h3>
                        <p className="text-muted">
                            In the next step, you will load a realistic dataset. Our engine will then automatically
                            surface the best opportunities based on your settings.
                        </p>
                        <div style={{ marginTop: 'var(--space-2)' }}>
                            <button className="btn btn-secondary" disabled>Loading engine...</button>
                        </div>
                    </div>
                </div>

                <SecondaryPanel
                    title="Tracking Tips"
                    description="Matched jobs will appear here daily. You can track application status and save favorites as they come in."
                    prompt="Ready to load the dataset for discovery."
                />
            </div>
        </div>
    );
}
