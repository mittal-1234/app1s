import ContextHeader from '../../components/ContextHeader';
import SecondaryPanel from '../../components/SecondaryPanel';

export default function Digest() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Job Digest"
                subtitle="Unified daily and weekly discovery summaries."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="empty-state card card-lg">
                        <h3>No digests available.</h3>
                        <p className="text-muted">
                            Your daily 9AM digest will appear here once the discovery engine starts processing
                            matches. You'll get a summary of the most relevant roles.
                        </p>
                    </div>
                </div>

                <SecondaryPanel
                    title="Digest Delivery"
                    description="Digests are compiled once a day to prevent notification fatigue while ensuring you never miss a beat."
                    prompt="Automated matching starts in the next phase."
                />
            </div>
        </div>
    );
}
