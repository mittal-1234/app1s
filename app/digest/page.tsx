'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';
import { jobs, Job } from '../lib/data';
import { calculateMatchScore, UserPreferences } from '../lib/matchEngine';

interface DigestJob extends Job {
    matchScore: number;
}

export default function Digest() {
    const [digest, setDigest] = useState<DigestJob[]>([]);
    const [isGenerated, setIsGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dateKey, setDateKey] = useState('');

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setDateKey(today);
        const savedDigest = localStorage.getItem(`jobTrackerDigest_${today}`);

        if (savedDigest) {
            try {
                setDigest(JSON.parse(savedDigest));
                setIsGenerated(true);
            } catch (e) {
                console.error('Failed to parse digest', e);
            }
        }
    }, []);

    const generateDigest = () => {
        setLoading(true);
        // Simulate processing delay
        setTimeout(() => {
            const savedPrefs = localStorage.getItem('jobTrackerPreferences');
            if (!savedPrefs) {
                alert('Please set your preferences in Settings first.');
                setLoading(false);
                return;
            }

            try {
                const prefs: UserPreferences = JSON.parse(savedPrefs);
                const scoredJobs = jobs.map(job => ({
                    ...job,
                    matchScore: calculateMatchScore(job, prefs)
                }));

                // Sort by Match Score (desc) -> Recency (asc)
                scoredJobs.sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo);

                const top10 = scoredJobs.slice(0, 10);
                setDigest(top10);
                setIsGenerated(true);
                localStorage.setItem(`jobTrackerDigest_${dateKey}`, JSON.stringify(top10));
            } catch (e) {
                console.error('Error generating digest', e);
            } finally {
                setLoading(false);
            }
        }, 800);
    };

    const handleCopy = () => {
        const text = digest.map(job =>
            `[${job.matchScore}%] ${job.title} at ${job.company}\nLocation: ${job.location} (${job.mode})\nApply: ${job.applyUrl}\n`
        ).join('\n---\n\n');

        const header = `Top 10 Jobs For You — ${dateKey}\n\n`;
        navigator.clipboard.writeText(header + text);
        alert('Digest copied to clipboard!');
    };

    const handleEmail = () => {
        const subject = encodeURIComponent(`My 9AM Job Digest - ${dateKey}`);
        const bodyText = digest.map(job =>
            `[${job.matchScore}% Match] ${job.title} at ${job.company}%0D%0ALocation: ${job.location} (${job.mode})%0D%0AApply: ${job.applyUrl}%0D%0A`
        ).join('%0D%0A---%0D%0A%0D%0A');

        const header = `Top 10 Jobs For You — ${dateKey}%0D%0A%0D%0A`;
        window.location.href = `mailto:?subject=${subject}&body=${header}${bodyText}`;
    };

    return (
        <div className="main-content">
            <ContextHeader
                title="Job Digest"
                subtitle="Unified daily discovery summary."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    {!isGenerated ? (
                        <div className="empty-state card card-lg" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                            <h3>Ready to generate your daily brief.</h3>
                            <p className="text-muted" style={{ maxWidth: '480px', margin: '0 auto var(--space-4)' }}>
                                Our engine will scan all available listings against your preferences and compile the top 10 most relevant opportunities for today.
                            </p>
                            <button
                                className="btn btn-primary"
                                onClick={generateDigest}
                                disabled={loading}
                                style={{ padding: '12px 24px', fontSize: '16px' }}
                            >
                                {loading ? 'Analyzing 60+ Roles...' : "Generate Today's 9AM Digest (Simulated)"}
                            </button>
                            <p style={{ fontSize: '12px', color: '#999', marginTop: 'var(--space-3)' }}>
                                Demo Mode: Daily 9AM trigger simulated manually.
                            </p>
                        </div>
                    ) : (
                        <div className="card" style={{ padding: '0', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                            <div style={{ padding: 'var(--space-4)', borderBottom: '1px solid #f0f0f0', backgroundColor: '#fafafa' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-1)' }}>
                                    <h2 style={{ margin: 0, fontSize: '20px', fontFamily: 'var(--font-serif)' }}>Top 10 Jobs For You</h2>
                                    <span className="badge badge-shipped">{dateKey}</span>
                                </div>
                                <p className="text-muted" style={{ margin: 0, fontSize: '14px' }}>9AM Daily Digest</p>
                            </div>

                            <div style={{ backgroundColor: 'white' }}>
                                {digest.length > 0 ? (
                                    digest.map((job, index) => (
                                        <div key={job.id} style={{
                                            padding: 'var(--space-3) var(--space-4)',
                                            borderBottom: index < digest.length - 1 ? '1px solid #f5f5f5' : 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                                                    <h4 style={{ margin: 0, fontSize: '16px' }}>{job.title}</h4>
                                                    <span className="badge" style={{
                                                        backgroundColor: job.matchScore >= 80 ? '#2D5016' : '#92400E',
                                                        color: 'white',
                                                        fontSize: '11px',
                                                        padding: '2px 6px'
                                                    }}>{job.matchScore}%</span>
                                                </div>
                                                <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#555' }}>
                                                    {job.company} • {job.location} • {job.experience}
                                                </p>
                                            </div>
                                            <a
                                                href={job.applyUrl}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="btn btn-secondary"
                                                style={{ fontSize: '12px', padding: '6px 12px' }}
                                            >
                                                Apply
                                            </a>
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: 'var(--space-5)', textAlign: 'center' }}>
                                        <p>No matching roles found today. Try adjusting your settings.</p>
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: 'var(--space-3) var(--space-4)', backgroundColor: '#fafafa', borderTop: '1px solid #f0f0f0', textAlign: 'center' }}>
                                <p style={{ fontSize: '12px', color: '#888', margin: 0 }}>This digest was generated based on your preferences.</p>
                            </div>
                        </div>
                    )}
                </div>

                <SecondaryPanel
                    title="Digest Actions"
                    description="Take your daily brief with you."
                    prompt="Keep your digest for offline review."
                >
                    {isGenerated && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', marginTop: 'var(--space-3)' }}>
                            <button onClick={handleCopy} className="btn btn-secondary" style={{ width: '100%' }}>
                                Copy to Clipboard
                            </button>
                            <button onClick={handleEmail} className="btn btn-secondary" style={{ width: '100%' }}>
                                Create Email Draft
                            </button>
                        </div>
                    )}
                </SecondaryPanel>
            </div>
        </div>
    );
}

function StatusUpdatesList() {
    const [updates, setUpdates] = useState<any[]>([]);

    useEffect(() => {
        const log = localStorage.getItem('jobTrackerStatusLog');
        if (log) {
            try {
                setUpdates(JSON.parse(log).slice(0, 5));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    if (updates.length === 0) {
        return (
            <div className="card" style={{ padding: 'var(--space-3)', color: '#666', fontStyle: 'italic' }}>
                No recent updates. Track your applications to see history here.
            </div>
        );
    }

    return (
        <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
            {updates.map((update, index) => (
                <div key={index} style={{
                    padding: 'var(--space-3)',
                    borderBottom: index < updates.length - 1 ? '1px solid #f0f0f0' : 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div>
                        <div style={{ fontWeight: 600, fontSize: '14px' }}>{update.title}</div>
                        <div style={{ fontSize: '12px', color: '#666' }}>{update.company}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <span className="badge" style={{
                            backgroundColor:
                                update.status === 'Applied' ? '#E3F2FD' :
                                    update.status === 'Rejected' ? '#FFEBEE' :
                                        update.status === 'Selected' ? '#E8F5E9' : '#f5f5f5',
                            color:
                                update.status === 'Applied' ? '#1565C0' :
                                    update.status === 'Rejected' ? '#C62828' :
                                        update.status === 'Selected' ? '#2E7D32' : '#666',
                        }}>
                            {update.status}
                        </span>
                        <div style={{ fontSize: '11px', color: '#999', marginTop: '4px' }}>
                            {new Date(update.date).toLocaleDateString()}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
