'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';
import { UserPreferences } from '../lib/matchEngine';

const availableLocations = [
    'Bangalore', 'Mumbai', 'Pune', 'Chennai', 'Gurgaon', 'Hyderabad', 'Noida', 'Remote'
];

export default function Settings() {
    const [prefs, setPrefs] = useState<UserPreferences>({
        roleKeywords: '',
        preferredLocations: [],
        preferredMode: [],
        experienceLevel: '',
        skills: '',
        minMatchScore: 40
    });
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('jobTrackerPreferences');
        if (saved) {
            try {
                setPrefs(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse preferences', e);
            }
        }
    }, []);

    const handleSave = () => {
        setIsSaving(true);
        localStorage.setItem('jobTrackerPreferences', JSON.stringify(prefs));
        setTimeout(() => setIsSaving(false), 600);
    };

    const toggleLocation = (loc: string) => {
        const newLocs = prefs.preferredLocations.includes(loc)
            ? prefs.preferredLocations.filter(l => l !== loc)
            : [...prefs.preferredLocations, loc];
        setPrefs({ ...prefs, preferredLocations: newLocs });
    };

    const toggleMode = (mode: string) => {
        const newModes = prefs.preferredMode.includes(mode)
            ? prefs.preferredMode.filter(m => m !== mode)
            : [...prefs.preferredMode, mode];
        setPrefs({ ...prefs, preferredMode: newModes });
    };

    return (
        <div className="main-content">
            <ContextHeader
                title="Settings"
                subtitle="Configure your job discovery preferences with precision."
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
                                    placeholder="e.g. Frontend Engineer, SDE Intern"
                                    value={prefs.roleKeywords}
                                    onChange={(e) => setPrefs({ ...prefs, roleKeywords: e.target.value })}
                                />
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Keywords used for title (+25) and description (+15) matching.</p>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-2)', fontSize: '14px' }}>
                                    Preferred Locations
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-1)' }}>
                                    {availableLocations.map(loc => (
                                        <button
                                            key={loc}
                                            onClick={() => toggleLocation(loc)}
                                            className={`badge ${prefs.preferredLocations.includes(loc) ? '' : 'badge-inactive'}`}
                                            style={{
                                                cursor: 'pointer',
                                                backgroundColor: prefs.preferredLocations.includes(loc) ? 'var(--color-accent)' : '#eee',
                                                color: prefs.preferredLocations.includes(loc) ? 'white' : '#666',
                                                border: 'none',
                                                padding: '4px 12px'
                                            }}
                                        >
                                            {loc}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-2)', fontSize: '14px' }}>
                                    Work Mode
                                </label>
                                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                                    {['Remote', 'Hybrid', 'Onsite'].map(mode => (
                                        <label key={mode} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                                            <input
                                                type="checkbox"
                                                checked={prefs.preferredMode.includes(mode)}
                                                onChange={() => toggleMode(mode)}
                                                style={{ accentColor: 'var(--color-accent)' }}
                                            />
                                            <span style={{ fontSize: '14px' }}>{mode}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }}>
                                <div className="form-group">
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                        Experience Level
                                    </label>
                                    <select
                                        value={prefs.experienceLevel}
                                        onChange={(e) => setPrefs({ ...prefs, experienceLevel: e.target.value })}
                                        style={{ width: '100%', padding: 'var(--space-2)', borderRadius: 'var(--radius)', border: '1px solid var(--color-border)' }}
                                    >
                                        <option value="">Any Level</option>
                                        <option value="entry">Entry Level (Fresher, 0-1)</option>
                                        <option value="mid">Mid Level (1-3)</option>
                                        <option value="senior">Senior Level (3-5)</option>
                                        <option value="lead">Lead / Staff</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label style={{ display: 'block', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                        Skills
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g. React, Java, Python"
                                        value={prefs.skills}
                                        onChange={(e) => setPrefs({ ...prefs, skills: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, marginBottom: 'var(--space-1)', fontSize: '14px' }}>
                                    Minimum Match Score
                                    <span style={{ color: 'var(--color-accent)' }}>{prefs.minMatchScore}%</span>
                                </label>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={prefs.minMatchScore}
                                    onChange={(e) => setPrefs({ ...prefs, minMatchScore: parseInt(e.target.value) })}
                                    style={{ width: '100%', accentColor: 'var(--color-accent)' }}
                                />
                                <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>Jobs below this score will be hidden when the filter is active.</p>
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
                    description="Our matching engine uses a deterministic point system: Title (+25), Desc (+15), Location (+15), Mode (+10), Experience (+10), Skills (+15)."
                    prompt="Keep your preferences sharp for better matches."
                />
            </div>
        </div>
    );
}
