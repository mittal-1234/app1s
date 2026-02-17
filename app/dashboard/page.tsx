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

    // Filter states
    const [search, setSearch] = useState('');
    const [locationPref, setLocationPref] = useState('');
    const [modePref, setModePref] = useState('');
    const [experiencePref, setExperiencePref] = useState('');
    const [sourcePref, setSourcePref] = useState('');
    const [sort, setSort] = useState('match');

    useEffect(() => {
        try {
            // Load settings and calculate initial scores
            const savedPrefs = localStorage.getItem('userPreferences');
            let prefs: UserPreferences = {
                keywords: '',
                location: '',
                mode: '',
                experience: ''
            };

            if (savedPrefs) {
                try {
                    const parsed = JSON.parse(savedPrefs);
                    if (parsed && typeof parsed === 'object') {
                        prefs = { ...prefs, ...parsed };
                    }
                } catch (e) {
                    console.error('Failed to parse preferences', e);
                }
            }

            // Map jobs with scores
            const jobsWithScores = (jobs || []).map(job => ({
                ...job,
                matchScore: calculateMatchScore(job, prefs)
            }));

            setAllJobs(jobsWithScores);

            // Load saved jobs
            const saved = localStorage.getItem('favoriteJobIds');
            if (saved) {
                try {
                    setSavedJobIds(JSON.parse(saved));
                } catch (e) {
                    console.error('Failed to parse saved jobs', e);
                }
            }
        } catch (error) {
            console.error('Dashboard initialization error:', error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        if (allJobs.length === 0 && !isLoading) return;

        let result = allJobs.filter(job => {
            const matchesSearch = !search ||
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company.toLowerCase().includes(search.toLowerCase());

            const matchesLocation = !locationPref || job.location === locationPref;
            const matchesMode = !modePref || job.mode === modePref;
            const matchesExperience = !experiencePref || job.experience === experiencePref;
            const matchesSource = !sourcePref || job.source === sourcePref;

            return matchesSearch && matchesLocation && matchesMode && matchesExperience && matchesSource;
        });

        // Sorting
        if (sort === 'match') {
            result.sort((a, b) => b.matchScore - a.matchScore || a.postedDaysAgo - b.postedDaysAgo);
        } else if (sort === 'latest') {
            result.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
        } else if (sort === 'oldest') {
            result.sort((a, b) => b.postedDaysAgo - a.postedDaysAgo);
        } else if (sort === 'title') {
            result.sort((a, b) => a.title.localeCompare(b.title));
        }

        setFilteredJobs(result);
    }, [allJobs, isLoading, search, locationPref, modePref, experiencePref, sourcePref, sort]);

    const handleSave = (id: string) => {
        const newSaved = savedJobIds.includes(id)
            ? savedJobIds.filter(savedId => savedId !== id)
            : [...savedJobIds, id];

        setSavedJobIds(newSaved);
        localStorage.setItem('favoriteJobIds', JSON.stringify(newSaved));
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
                <ContextHeader title="Dashboard" subtitle="Loading your personalized feed..." />
                <div className="workspace-container">
                    <div className="primary-workspace">
                        <div className="card card-lg" style={{ textAlign: 'center', padding: 'var(--space-5)' }}>
                            <p className="text-muted">Analyzing 60+ job opportunities...</p>
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
                subtitle="Manage and track your active job matches."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    <FilterBar
                        onSearch={setSearch}
                        onLocationChange={setLocationPref}
                        onModeChange={setModePref}
                        onExperienceChange={setExperiencePref}
                        onSourceChange={setSourcePref}
                        onSortChange={setSort}
                    />

                    {filteredJobs.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-2)' }}>
                            {filteredJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    matchScore={job.matchScore}
                                    isSaved={savedJobIds.includes(job.id)}
                                    onView={handleView}
                                    onSave={handleSave}
                                    onApply={handleApply}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="empty-state card card-lg">
                            <h3>No matches found.</h3>
                            <p className="text-muted">
                                Try adjusting your filters or search terms.
                            </p>
                        </div>
                    )}
                </div>

                <SecondaryPanel
                    title="Tracking Tips"
                    description="Our engine will automatically surface the best opportunities based on your settings."
                    prompt="Keep your preferences updated for better accuracy."
                    onCopy={() => navigator.clipboard.writeText("Keep your preferences updated for better accuracy.")}
                />
            </div>

            <JobModal
                job={selectedJob}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onApply={handleApply}
            />
        </div>
    );
}
