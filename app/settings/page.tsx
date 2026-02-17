'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';

export default function Settings() {
    const [keywords, setKeywords] = useState('');
    const [location, setLocation] = useState('');
    const [mode, setMode] = useState('');
    const [experience, setExperience] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const savedPrefs = localStorage.getItem('userPreferences');
        if (savedPrefs) {
            const parsed = JSON.parse(savedPrefs);
            setKeywords(parsed.keywords || '');
            setLocation(parsed.location || '');
            setMode(parsed.mode || '');
            setExperience(parsed.experience || '');
        }
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        const prefs = { keywords, location, mode, experience };
        localStorage.setItem('userPreferences', JSON.stringify(prefs));

        // Brief delay to simulate a premium save feel
        setTimeout(() => {
            setIsSaving(false);
        }, 600);
    };

    return (
        <div className="main-content">
            <ContextHeader
                title="Settings"
                subtitle="Configure your job discovery preferences."
            />

            <div className="workspace-container">
                <div className="primary-workspace">
                    <div className="card card-lg">
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Role Keywords
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Frontend Engineer, Product Designer"
                                    value={keywords}
                                    onChange={(e) => setKeywords(e.target.value)}
                                />
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Separate multiple keywords with commas.</p>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Preferred Locations
                                </label>
                                <input
                                    type="text"
                                    placeholder="e.g. Bangalore, Remote, Pune"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                        Work Mode
                                    </label>
                                    <select
                                        value={mode}
                                        onChange={(e) => setMode(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--space-2)',
                                            borderRadius: 'var(--radius)',
                                            border: '1px solid var(--color-border)',
                                            background: 'white',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        <option value="">Any Mode</option>
                                        <option value="remote">Remote</option>
                                        <option value="hybrid">Hybrid</option>
                                        <option value="onsite">Onsite</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                        Experience Level
                                    </label>
                                    <select
                                        value={experience}
                                        onChange={(e) => setExperience(e.target.value)}
                                        style={{
                                            width: '100%',
                                            padding: 'var(--space-2)',
                                            borderRadius: 'var(--radius)',
                                            border: '1px solid var(--color-border)',
                                            background: 'white',
                                            fontFamily: 'inherit'
                                        }}
                                    >
                                        <option value="">Any Level</option>
                                        <option value="entry">Entry Level</option>
                                        <option value="mid">Mid Level</option>
                                        <option value="senior">Senior Level</option>
                                        <option value="lead">Lead / Staff</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginTop: 'var(--space-2)' }}>
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                >
                                    {isSaving ? 'Updating...' : 'Save Preferences'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <SecondaryPanel
                    title="Preference Guide"
                    description="Your keywords and experience level are the primary weights used by our matching engine."
                    prompt="Update your settings to start discovery."
                />
            </div>
        </div>
    );
}
