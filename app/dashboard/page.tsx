import ContextHeader from '../components/ContextHeader';

export default function Dashboard() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Dashboard"
                subtitle="This section will be built in the next step."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg">
                        <p className="text-muted">Job notifications and tracking overview will appear here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
