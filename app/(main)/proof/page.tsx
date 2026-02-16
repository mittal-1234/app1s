import ContextHeader from '../../components/ContextHeader';
import SecondaryPanel from '../../components/SecondaryPanel';

export default function Proof() {
    return (
        <div className="main-content">
            <ContextHeader
                title="Proof & Submission"
                subtitle="Validate your implementation and capture project artifacts."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg mb-4">
                        <h3>Artifact Collection</h3>
                        <p className="text-muted mb-4">
                            [Placeholder for implementation results, screenshots, and test logs]
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Implementation Link
                                </label>
                                <input type="url" placeholder="https://lovable.dev/..." disabled />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Repository Link
                                </label>
                                <input type="url" placeholder="https://github.com/..." disabled />
                            </div>
                        </div>
                    </div>
                </div>

                <SecondaryPanel
                    title="Validation"
                    description="Use this section to verify that all functional requirements have been met before final submission."
                    prompt="Proof generation phase pending."
                />
            </div>
        </div>
    );
}
