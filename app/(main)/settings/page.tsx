import ContextHeader from '../../components/ContextHeader';

export default function Settings() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Settings"
                subtitle="This section will be built in the next step."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg">
                        <p className="text-muted">Configure your notification preferences and platform integrations here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
