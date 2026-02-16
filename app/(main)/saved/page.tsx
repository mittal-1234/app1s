import ContextHeader from '../../components/ContextHeader';

export default function Saved() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Saved Notifications"
                subtitle="This section will be built in the next step."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg">
                        <p className="text-muted">Your bookmarked and archived notifications will be listed here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
