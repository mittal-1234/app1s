export default function ProofFooter({
    items
}: {
    items: Array<{
        label: string;
        checked: boolean;
        onChange: (checked: boolean) => void;
    }>;
}) {
    return (
        <div className="proof-footer">
            <div style={{
                display: 'flex',
                gap: 'var(--space-4)',
                alignItems: 'center',
                flexWrap: 'wrap'
            }}>
                {items.map((item, index) => (
                    <label
                        key={index}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--space-2)',
                            cursor: 'pointer',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 500
                        }}
                    >
                        <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={(e) => item.onChange(e.target.checked)}
                            style={{
                                width: '18px',
                                height: '18px',
                                cursor: 'pointer',
                                accentColor: 'var(--color-accent)'
                            }}
                        />
                        {item.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
