'use client';

import { Job } from '../lib/data';

interface JobCardProps {
    job: Job;
    isSaved: boolean;
    matchScore?: number;
    onView: (job: Job) => void;
    onSave: (id: string) => void;
    onApply: (url: string) => void;
    status?: string;
    onStatusChange?: (id: string, status: string) => void;
}

export default function JobCard({ job, isSaved, matchScore, onView, onSave, onApply, status, onStatusChange }: JobCardProps) {
    const getScoreColor = (score: number) => {
        if (score >= 80) return '#2D5016'; // Green
        if (score >= 60) return '#92400E'; // Amber
        if (score >= 40) return '#111';    // Neutral
        return '#666';                     // Subtle Grey
    };

    return (
        <div className="card" style={{ marginBottom: 'var(--space-3)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>
                        <h3 style={{ margin: 0 }}>{job.title}</h3>
                        {matchScore !== undefined && (
                            <span className="badge" style={{
                                backgroundColor: getScoreColor(matchScore),
                                color: 'white',
                                border: 'none',
                                fontSize: '11px',
                                padding: '2px 8px'
                            }}>
                                {matchScore}% Match
                            </span>
                        )}
                    </div>
                    <p style={{ fontWeight: 600, color: 'var(--color-accent)', margin: 0 }}>{job.company}</p>
                </div>
                <div className="badge badge-in-progress" style={{ fontSize: '12px' }}>
                    {job.source}
                </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-3)', fontSize: 'var(--text-sm)', color: '#666' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                    {job.location} ({job.mode})
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" /></svg>
                    {job.experience}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500, color: '#111' }}>
                    {job.salaryRange}
                </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'var(--space-2)' }}>
                <span style={{ fontSize: '12px', color: '#999' }}>
                    {job.postedDaysAgo === 0 ? 'Posted today' : `Posted ${job.postedDaysAgo} days ago`}
                </span>

                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'center' }}>
                    {onStatusChange && (
                        <div style={{ marginRight: 'var(--space-2)' }}>
                            <select
                                value={status || 'Not Applied'}
                                onChange={(e) => onStatusChange(job.id, e.target.value)}
                                style={{
                                    padding: '4px 8px',
                                    fontSize: '12px',
                                    borderRadius: '4px',
                                    border: '1px solid #ddd',
                                    backgroundColor:
                                        status === 'Applied' ? '#E3F2FD' :
                                            status === 'Rejected' ? '#FFEBEE' :
                                                status === 'Selected' ? '#E8F5E9' : 'white',
                                    color:
                                        status === 'Applied' ? '#1565C0' :
                                            status === 'Rejected' ? '#C62828' :
                                                status === 'Selected' ? '#2E7D32' : '#666',
                                    fontWeight: 500
                                }}
                            >
                                <option value="Not Applied">Not Applied</option>
                                <option value="Applied">Applied</option>
                                <option value="Rejected">Rejected</option>
                                <option value="Selected">Selected</option>
                            </select>
                        </div>
                    )}

                    <button className="btn btn-secondary" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => onView(job)}>View</button>
                    <button
                        className={`btn ${isSaved ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '6px 12px', fontSize: '13px' }}
                        onClick={() => onSave(job.id)}
                    >
                        {isSaved ? 'Saved' : 'Save'}
                    </button>
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '13px' }} onClick={() => onApply(job.applyUrl)}>Apply</button>
                </div>
            </div>
        </div>
    );
}
