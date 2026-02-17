'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';
import FilterBar from '../components/FilterBar';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import { jobs, Job } from '../lib/data';
import { calculateMatchScore, UserPreferences } from '../lib/matchEngine';

interface JobWithScore extends Job {
    matchScore: number;
}

export default function Dashboard() {
    const [allJobs, setAllJobs] = useState<JobWithScore[]>([]);
    const [filteredJobs, setFilteredJobs] = useState<JobWithScore[]>([]);
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [hasPreferences, setHasPreferences] = useState(false);
    const [userPrefs, setUserPrefs] = useState<UserPreferences | null>(null);

    // Filter states
    const [search, setSearch] = useState('');
    const [locationFilter, setLocationFilter] = useState('');
    const [modeFilter, setModeFilter] = useState('');
    const [experienceFilter, setExperienceFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [sort, setSort] = useState('match');
    const [showOnlyAboveThreshold, setShowOnlyAboveThreshold] = useState(false);

    const [statusMap, setStatusMap] = useState<Record<string, string>>({});
    const [statusFilter, setStatusFilter] = useState('');
    const [toast, setToast] = useState<{ message: string; type: 'info' | 'success' | 'warning' } | null>(null);

    useEffect(() => {
        try {
            const savedPrefs = localStorage.getItem('jobTrackerPreferences');
            let prefs: UserPreferences = {
                roleKeywords: '',
                preferredLocations: [],
                preferredMode: [],
                experienceLevel: '',
                skills: '',
                minMatchScore: 40
            };

            if (savedPrefs) {
                const parsed = JSON.parse(savedPrefs);
                prefs = { ...prefs, ...parsed };
                setHasPreferences(true);
                setUserPrefs(prefs);
            } else {
                setHasPreferences(false);
            }

            const jobsWithScores = (jobs || []).map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, prefs)
            }));

            setAllJobs(jobsWithScores);

            const saved = localStorage.getItem('favoriteJobIds');
            if (saved) {
                setSavedJobIds(JSON.parse(saved));
            }

            const savedStatus = localStorage.getItem('jobTrackerStatus');
            if (savedStatus) {
                setStatusMap(JSON.parse(savedStatus));
            }
        } catch (error) {
            console.error('Dashboard initialization error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    useEffect(() => {
        if (allJobs.length === 0 && !isLoading) return;

        let result = allJobs.filter(job => {
            const matchesSearch = !search ||
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company.toLowerCase().includes(search.toLowerCase());

            const matchesLocation = !locationFilter || job.location === locationFilter;
            const matchesMode = !modeFilter || job.mode === modeFilter;
            const matchesExperience = !experienceFilter || job.experience === experienceFilter;
            const matchesSource = !sourceFilter || job.source === sourceFilter;

            const currentStatus = statusMap[job.id] || 'Not Applied';
            const matchesStatus = !statusFilter || (
                statusFilter === 'Not Applied' ? (!statusMap[job.id] || statusMap[job.id] === 'Not Applied') :
                    currentStatus === statusFilter
            );

            const matchesThreshold = !showOnlyAboveThreshold || job.matchScore >= (userPrefs?.minMatchScore || 0);

            return matchesSearch && matchesLocation && matchesMode && matchesExperience && matchesSource && matchesStatus && matchesThreshold;
        });

        // Sorting
        if (sort === 'match') {
            result.sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo);
        } else if (sort === 'latest') {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (sort === 'oldest') {
            result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        } else if (sort === 'salary') {
            const extractSalary = (s: string) => {
                const match = s.match(/(\d+)/);
                return match ? parseInt(match[0]) : 0;
            };
            result.sort((a, b) => extractSalary(b.salaryRange) - extractSalary(a.salaryRange));
        } else if (sort === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredJobs(result);
    }, [allJobs, isLoading, search, locationFilter, modeFilter, experienceFilter, sourceFilter, statusFilter, sort, showOnlyAboveThreshold, userPrefs, statusMap]);

    const handleSave = (id: string) => {
        const newSaved = savedJobIds.includes(id)
            ? savedJobIds.filter(savedId => savedId !== id)
            : [...savedJobIds, id];

        setSavedJobIds(newSaved);
        localStorage.setItem('favoriteJobIds', JSON.stringify(newSaved));
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        const newStatusMap = { ...statusMap, [id]: newStatus };
        setStatusMap(newStatusMap);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(newStatusMap));

        // Log update
        const job = allJobs.find(j => j.id === id);
        if (job) {
            const logEntry = {
                jobId: id,
                title: job.title,
                company: job.company,
                status: newStatus,
                date: new Date().toISOString()
            };
            const existingLog = JSON.parse(localStorage.getItem('jobTrackerStatusLog') || '[]');
            const newLog = [logEntry, ...existingLog].slice(0, 50); // Keep last 50
            localStorage.setItem('jobTrackerStatusLog', JSON.stringify(newLog));

            setToast({
                message: `Status updated to ${newStatus}`,
                type: newStatus === 'Rejected' ? 'warning' : 'success'
            });
        }
    };

    const handleView = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleApply = (url: string) => {
        window.open(url, '_blank');
    };

    if (isLoading) {
        return (
            <div className="main-content">
                <ContextHeader title="Dashboard" subtitle="Synchronizing match engine..." />
                <div className="workspace-container">
                    <div className="primary-workspace">
                        <div className="card card-lg" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                            <p className="text-muted">Computing scores for 60+ roles...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <ContextHeader
                title="Dashboard"
                subtitle="Your intelligent job discovery workspace."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    {!hasPreferences && (
                        <div className="card" style={{ backgroundColor: 'var(--color-bg)', border: '1px solid var(--color-accent)', marginBottom: 'var(--space-3)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <p style={{ margin: 0, fontWeight: 500 }}>Set your preferences to activate intelligent matching.</p>
                            <button className="btn btn-secondary" onClick={() => window.location.href = '/settings'} style={{ padding: '4px 12px', fontSize: '13px' }}>Configure</button>
                        </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
                        <FilterBar
                            onSearch={setSearch}
                            onLocationChange={setLocationFilter}
                            onModeChange={setModeFilter}
                            onExperienceChange={setExperienceFilter}
                            onSourceChange={setSourceFilter}
                            onStatusChange={setStatusFilter}
                            onSortChange={setSort}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', whiteSpace: 'nowrap', marginLeft: 'var(--space-3)', marginBottom: 'var(--space-4)' }}>
                            <label className="switch" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', fontWeight: 500 }}>
                                <input
                                    type="checkbox"
                                    checked={showOnlyAboveThreshold}
                                    onChange={(e) => setShowOnlyAboveThreshold(e.target.checked)}
                                    style={{ accentColor: 'var(--color-accent)' }}
                                />
                                Show only matches above {userPrefs?.minMatchScore || 40}%
                            </label>
                        </div>
                    </div>

                    {filteredJobs.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-2)' }}>
                            {filteredJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    matchScore={job.matchScore}
                                    isSaved={savedJobIds.includes(job.id)}
                                    // matchScore is already passed above
                                    status={statusMap[job.id]}
                                    onStatusChange={handleStatusChange}
                                    onView={handleView}
                                    onSave={handleSave}
                                    onApply={handleApply}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state card card-lg">
                            <h3>No roles match your criteria.</h3>
                            <p className="text-muted">
                                Try adjusting your filters or lower the threshold in Settings.
                            </p>
                            <button className="btn btn-secondary" onClick={() => {
                                setSearch('');
                                setLocationFilter('');
                                setModeFilter('');
                                setExperienceFilter('');
                                setSourceFilter('');
                                setShowOnlyAboveThreshold(false);
                            }} style={{ marginTop: 'var(--space-2)' }}>Clear all filters</button>
                        </div>
                    )}
                </div>

                <SecondaryPanel
                    title="Intelligence Engine"
                    description="Matches are computed in real-time. High recency and LinkedIn sources receive a final +5 boost."
                    prompt="Threshold: Only seeing roles above your comfort level."
                />
            </div>

            <JobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={handleApply}
            />

            {toast && (
                <div style={{
                    position: 'fixed',
                    bottom: '24px',
                    right: '24px',
                    backgroundColor: 'white',
                    color: toast.type === 'warning' ? '#C62828' : '#2D5016',
                    padding: '12px 24px',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    borderLeft: `4px solid ${toast.type === 'warning' ? '#C62828' : '#2D5016'}`,
                    zIndex: 1000,
                    animation: 'slideIn 0.3s ease-out'
                }}>
                    {toast.message}
                </div>
            )}
        </div>
    );
}
