'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../../components/ContextHeader';
import SecondaryPanel from '../../components/SecondaryPanel';

const TEST_ITEMS = [
    { id: 'prefs_persist', label: 'Preferences persist after refresh', tooltip: 'Change filters, refresh page, check if values remain.' },
    { id: 'match_score', label: 'Match score calculates correctly', tooltip: 'Verify points logic: Title(25), Desc(15), Loc(15), Mode(10), Exp(10), Skill(15), Recency(5), LinkedIn(5).' },
    { id: 'show_matches', label: '"Show only matches" toggle works', tooltip: 'Toggle "Show only matches" and verify low-score jobs disappear.' },
    { id: 'save_persist', label: 'Save job persists after refresh', tooltip: 'Save a job, refresh page, verify it is still saved.' },
    { id: 'apply_newdat', label: 'Apply opens in new tab', tooltip: 'Click Apply, verify a new browser tab opens.' },
    { id: 'status_persist', label: 'Status update persists after refresh', tooltip: 'Set status to Applied, refresh, verify status remains Applied.' },
    { id: 'status_filter', label: 'Status filter works correctly', tooltip: 'Filter by Applied, ensure only Applied jobs are shown.' },
    { id: 'digest_top10', label: 'Digest generates top 10 by score', tooltip: 'Generate digest, count items, verify they are high scoring.' },
    { id: 'digest_persist', label: 'Digest persists for the day', tooltip: 'Refresh page, verify digest is not re-generated (same date/items).' },
    { id: 'no_console_errors', label: 'No console errors on main pages', tooltip: 'Open DevTools (F12) -> Console. Check for red errors.' }
];

export default function TestPage() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const [passedCount, setPassedCount] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerTestStatus');
        if (saved) {
            const parsed = JSON.parse(saved);
            setCheckedItems(parsed);
            setPassedCount(Object.values(parsed).filter(Boolean).length);
        }
    }, []);

    const handleCheck = (id: string, isChecked: boolean) => {
        const newChecked = { ...checkedItems, [id]: isChecked };
        setCheckedItems(newChecked);
        setPassedCount(Object.values(newChecked).filter(Boolean).length);
        localStorage.setItem('jobTrackerTestStatus', JSON.stringify(newChecked));
    };

    const handleReset = () => {
        if (confirm('Are you sure you want to reset all test progress?')) {
            setCheckedItems({});
            setPassedCount(0);
            localStorage.removeItem('jobTrackerTestStatus');
        }
    };

    return (
        <div className="main-content">
            <ContextHeader
                title="System Verification"
                subtitle="Run through the final checklist before shipping."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card" style={{ marginBottom: 'var(--space-4)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                            <h2 style={{ fontSize: '20px', margin: 0 }}>Test Checklist</h2>
                            <span className={`badge ${passedCount === 10 ? 'badge-shipped' : 'badge-in-progress'}`} style={{ fontSize: '14px' }}>
                                Tests Passed: {passedCount} / 10
                            </span>
                        </div>

                        {passedCount < 10 && (
                            <div className="error-state" style={{ marginBottom: 'var(--space-4)' }}>
                                <h3 style={{ fontSize: '14px', margin: 0 }}>Resolve all issues before shipping.</h3>
                            </div>
                        )}

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            {TEST_ITEMS.map((item) => (
                                <label key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '8px', borderRadius: '4px', transition: 'background 0.2s' }} className="hover-bg">
                                    <input
                                        type="checkbox"
                                        checked={!!checkedItems[item.id]}
                                        onChange={(e) => handleCheck(item.id, e.target.checked)}
                                        style={{ width: '18px', height: '18px', accentColor: 'var(--color-success)' }}
                                    />
                                    <span style={{ fontSize: '16px', color: checkedItems[item.id] ? 'var(--color-text)' : '#666' }}>
                                        {item.label}
                                    </span>
                                    {item.tooltip && (
                                        <span
                                            title={item.tooltip}
                                            style={{
                                                fontSize: '12px',
                                                color: '#999',
                                                cursor: 'help',
                                                border: '1px solid #ddd',
                                                borderRadius: '50%',
                                                width: '16px',
                                                height: '16px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                marginLeft: 'auto'
                                            }}
                                        >
                                            ?
                                        </span>
                                    )}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                        <button onClick={handleReset} className="btn btn-secondary" style={{ color: '#666' }}>
                            Reset Test Status
                        </button>
                    </div>
                </div>

                <SecondaryPanel
                    title="Shipping Criteria"
                    description="The ship route (/jt/08-ship) is strictly locked until all system verification tests pass."
                    prompt="Integrity check required."
                />
            </div>

            <style jsx>{`
                .hover-bg:hover {
                    background-color: var(--color-bg);
                }
            `}</style>
        </div>
    );
}
