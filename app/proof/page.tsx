'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';

const STEPS = [
    'Design System & Layout',
    'Job Discovery Dashboard',
    'Realistic Job Data',
    'Match Engine Scoring',
    'Advanced Filtering',
    'Saved Jobs Persistence',
    'Daily Digest Engine',
    'Job Status Tracking'
];

export default function Proof() {
    const [links, setLinks] = useState({
        lovable: '',
        github: '',
        deployed: ''
    });
    const [testsPassed, setTestsPassed] = useState(false);
    const [isShipped, setIsShipped] = useState(false);

    useEffect(() => {
        // Load links
        const savedLinks = localStorage.getItem('jobTrackerArtifacts');
        if (savedLinks) {
            setLinks(JSON.parse(savedLinks));
        }

        // Check tests
        const savedTests = localStorage.getItem('jobTrackerTestStatus');
        if (savedTests) {
            const parsed = JSON.parse(savedTests);
            const count = Object.values(parsed).filter(Boolean).length;
            setTestsPassed(count === 10);
        }
    }, []);

    useEffect(() => {
        const allLinksPresent = Object.values(links).every(l => l && l.startsWith('http'));
        setIsShipped(allLinksPresent && testsPassed);
    }, [links, testsPassed]);

    const handleLinkChange = (key: string, value: string) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        localStorage.setItem('jobTrackerArtifacts', JSON.stringify(newLinks));
    };

    const handleCopy = () => {
        const text = `
Job Notification Tracker — Final Submission

Lovable Project:
${links.lovable}

GitHub Repository:
${links.github}

Live Deployment:
${links.deployed}

Core Features:
- Intelligent match scoring
- Daily digest simulation
- Status tracking
- Test checklist enforced
`.trim();
        navigator.clipboard.writeText(text);
        alert('Submission copied to clipboard!');
    };

    return (
        <div className="main-content">
            <ContextHeader
                title="Proof & Submission"
                subtitle="Validate your implementation and capture project artifacts."
            />

            <div className="workspace-container">
                <div className="primary-workspace">

                    {/* Project Summary */}
                    <div className="card mb-4">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                            <h2 style={{ fontSize: '18px', margin: 0 }}>Project 1 — Job Notification Tracker</h2>
                            {isShipped ? (
                                <span className="badge badge-shipped">Shipped</span>
                            ) : (
                                <span className="badge badge-in-progress">In Progress</span>
                            )}
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-2)' }}>
                            {STEPS.map((step, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
                                    <span style={{ color: 'var(--color-success)' }}>✓</span>
                                    <span style={{ color: '#666' }}>{step}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Artifact Collection */}
                    <div className="card card-lg mb-4">
                        <h3 style={{ marginBottom: 'var(--space-3)' }}>Artifact Collection</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Lovable Project Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://lovable.dev/..."
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    GitHub Repository Link
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://github.com/..."
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Live Deployment URL
                                </label>
                                <input
                                    type="url"
                                    placeholder="https://app1s-woak.vercel.app"
                                    value={links.deployed}
                                    onChange={(e) => handleLinkChange('deployed', e.target.value)}
                                    style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                                />
                            </div>
                        </div>

                        {!testsPassed && (
                            <div style={{ marginTop: 'var(--space-3)', padding: '12px', backgroundColor: '#FFF5F5', borderLeft: '4px solid #C62828', fontSize: '13px', color: '#C62828' }}>
                                ⚠️ Completing the 10-item test checklist is required to ship.
                            </div>
                        )}
                    </div>

                    {isShipped && (
                        <div className="card" style={{ backgroundColor: '#F0FDF4', borderColor: '#BBF7D0', textAlign: 'center', padding: 'var(--space-4)' }}>
                            <h3 style={{ color: '#166534', fontSize: '16px', marginBottom: '4px' }}>Project 1 Shipped Successfully.</h3>
                            <p style={{ color: '#15803d', fontSize: '13px', margin: 0 }}>All systems operational.</p>
                        </div>
                    )}
                </div>

                <SecondaryPanel
                    title="Submission"
                    description="Generate your final submission snippet once all artifacts are collected."
                    prompt="Ready to submit?"
                >
                    <button
                        onClick={handleCopy}
                        disabled={!isShipped}
                        className="btn btn-primary"
                        style={{ width: '100%', marginTop: 'var(--space-3)', opacity: isShipped ? 1 : 0.5 }}
                    >
                        Copy Final Submission
                    </button>
                </SecondaryPanel>
            </div>
        </div>
    );
}
