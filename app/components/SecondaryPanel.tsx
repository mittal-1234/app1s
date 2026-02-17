export default function SecondaryPanel({
    title,
    description,
    prompt,
    children,
    onCopy,
    onBuild,
    onSuccess,
    onError
}: {
    title: string;
    description: string;
    prompt?: string;
    children?: React.ReactNode;
    onCopy?: () => void;
    onBuild?: () => void;
    onSuccess?: () => void;
    onError?: () => void;
}) {
    return (
        <div className="secondary-panel">
            <div className="card">
                <h3 style={{
                    fontSize: 'var(--text-lg)',
                    marginBottom: 'var(--space-2)',
                    fontFamily: 'var(--font-sans)'
                }}>
                    {title}
                </h3>
                <p style={{
                    fontSize: 'var(--text-sm)',
                    color: '#666',
                    marginBottom: 'var(--space-3)',
                    lineHeight: 'var(--leading-relaxed)'
                }}>
                    {description}
                </p>

                {prompt && (
                    <div style={{
                        background: 'var(--color-bg-subtle)',
                        border: '1px solid var(--color-border)',
                        borderRadius: 'var(--radius)',
                        padding: 'var(--space-2)',
                        marginBottom: 'var(--space-3)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'ui-monospace, monospace',
                        color: 'var(--color-text)'
                    }}>
                        {prompt}
                    </div>
                )}

                {children}

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--space-2)'
                }}>
                    {onCopy && (
                        <button className="btn btn-secondary" onClick={onCopy}>
                            Copy Prompt
                        </button>
                    )}
                    {onBuild && (
                        <button className="btn btn-primary" onClick={onBuild}>
                            Build in Lovable
                        </button>
                    )}
                    <div style={{
                        display: 'flex',
                        gap: 'var(--space-2)',
                        marginTop: 'var(--space-1)'
                    }}>
                        {onSuccess && (
                            <button
                                className="btn btn-secondary"
                                onClick={onSuccess}
                                style={{ flex: 1, fontSize: 'var(--text-xs)' }}
                            >
                                ✓ It Worked
                            </button>
                        )}
                        {onError && (
                            <button
                                className="btn btn-secondary"
                                onClick={onError}
                                style={{ flex: 1, fontSize: 'var(--text-xs)' }}
                            >
                                ✗ Error
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
