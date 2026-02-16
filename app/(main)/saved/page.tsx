import ContextHeader from '../../components/ContextHeader';
import SecondaryPanel from '../../components/SecondaryPanel';

export default function Saved() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Saved Notifications"
                subtitle="Your bookmarked opportunities and historical archives."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="empty-state card card-lg">
                        <h3>Your collection is empty.</h3>
                        <p className="text-muted">
                            Once the discovery engine is live, you can save jobs here to keep track of your
                            application progress and notes.
                        </p>
                    </div>
                </div>

                <SecondaryPanel
                    title="Organization"
                    description="Archive jobs you're no longer interested in to keep your saved list focused."
                    prompt="Start saving jobs to build your pipeline."
                />
            </div>
        </div>
    );
}
