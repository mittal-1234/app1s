'use client';

import { Job } from '../lib/data';

interface JobModalProps {
    job: Job | null;
    isOpen: boolean;
    onClose: () => void;
    onApply: (url: string) => void;
}

export default function JobModal({ job, isOpen, onClose, onApply }: JobModalProps) {
    if (!isOpen || !job) return null;

    return (
        <div className="modal-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(2px)'
        }} onClick={onClose}>
            <div className="card" style={{
                width: '100%',
                maxWidth: '600px',
                maxHeight: '90vh',
                overflowY: 'auto',
                backgroundColor: 'var(--color-bg)',
                padding: 'var(--space-4)',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
            }} onClick={e => e.stopPropagation()}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: 'var(--space-3)',
                        right: 'var(--space-3)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '8px'
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
                </button>

                <h2 style={{ marginBottom: 'var(--space-1)', paddingRight: '40px' }}>{job.title}</h2>
                <p style={{ fontWeight: 600, color: 'var(--color-accent)', fontSize: '18px', marginBottom: 'var(--space-3)' }}>{job.company}</p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)', marginBottom: 'var(--space-4)', padding: 'var(--space-3)', backgroundColor: '#fff', borderRadius: '4px' }}>
                    <div>
                        <span style={{ fontSize: '12px', color: '#999', display: 'block', textTransform: 'uppercase' }}>Location</span>
                        <span style={{ fontWeight: 500 }}>{job.location} ({job.mode})</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#999', display: 'block', textTransform: 'uppercase' }}>Salary</span>
                        <span style={{ fontWeight: 500 }}>{job.salaryRange}</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#999', display: 'block', textTransform: 'uppercase' }}>Experience</span>
                        <span style={{ fontWeight: 500 }}>{job.experience}</span>
                    </div>
                    <div>
                        <span style={{ fontSize: '12px', color: '#999', display: 'block', textTransform: 'uppercase' }}>Source</span>
                        <span style={{ fontWeight: 500 }}>{job.source}</span>
                    </div>
                </div>

                <div style={{ marginBottom: 'var(--space-4)' }}>
                    <h4 style={{ marginBottom: 'var(--space-2)' }}>Description</h4>
                    <p style={{ color: '#444', lineHeight: 1.6 }}>{job.description}</p>
                </div>

                <div style={{ marginBottom: 'var(--space-5)' }}>
                    <h4 style={{ marginBottom: 'var(--space-2)' }}>Required Skills</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {job.skills.map(skill => (
                            <span key={skill} style={{
                                padding: '4px 12px',
                                backgroundColor: '#eee',
                                borderRadius: '100px',
                                fontSize: '12px',
                                fontWeight: 500,
                                color: '#555'
                            }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    <button className="btn btn-primary" style={{ flex: 1, padding: '12px' }} onClick={() => onApply(job.applyUrl)}>Apply Now</button>
                    <button className="btn btn-secondary" style={{ flex: 1, padding: '12px' }} onClick={onClose}>Close</button>
                </div>
            </div>
        </div>
    );
}
