import ContextHeader from '../components/ContextHeader';

export default function Digest() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Job Digest"
                subtitle="This section will be built in the next step."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg">
                        <p className="text-muted">Your daily and weekly summaries will be generated here.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
