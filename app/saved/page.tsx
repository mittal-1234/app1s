'use client';

import { useState, useEffect } from 'react';
import ContextHeader from '../components/ContextHeader';
import SecondaryPanel from '../components/SecondaryPanel';
import JobCard from '../components/JobCard';
import JobModal from '../components/JobModal';
import { jobs, Job } from '../lib/data';
import { calculateMatchScore, UserPreferences } from '../lib/matchEngine';

export default function Saved() {
    interface JobWithScore extends Job {
        matchScore: number;
    }

    const [savedJobs, setSavedJobs] = useState<JobWithScore[]>([]);
    const [savedJobIds, setSavedJobIds] = useState<string[]>([]);
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [statusMap, setStatusMap] = useState<Record<string, string>>({});

    useEffect(() => {
        const saved = localStorage.getItem('favoriteJobIds');
        const savedPrefs = localStorage.getItem('jobTrackerPreferences'); // Corrected key
        const prefs: UserPreferences = savedPrefs ? JSON.parse(savedPrefs) : {
            roleKeywords: '',
            preferredLocations: [],
            preferredMode: [],
            experienceLevel: '',
            skills: '',
            minMatchScore: 40
        };

        if (saved) {
            const ids = JSON.parse(saved);
            setSavedJobIds(ids);

            const filtered = jobs
                .filter(job => ids.includes(job.id))
                .map(job => ({
                    ...job,
                    matchScore: calculateMatchScore(job, prefs)
                }));

            setSavedJobs(filtered);
        }

        const savedStatus = localStorage.getItem('jobTrackerStatus');
        if (savedStatus) {
            setStatusMap(JSON.parse(savedStatus));
        }
    }, []);

    const handleSave = (id: string) => {
        const newSavedIds = savedJobIds.filter(savedId => savedId !== id);
        setSavedJobIds(newSavedIds);
        setSavedJobs(savedJobs.filter(job => job.id !== id));
        localStorage.setItem('favoriteJobIds', JSON.stringify(newSavedIds));
    };

    const handleStatusChange = (id: string, newStatus: string) => {
        const newStatusMap = { ...statusMap, [id]: newStatus };
        setStatusMap(newStatusMap);
        localStorage.setItem('jobTrackerStatus', JSON.stringify(newStatusMap));

        // Log update
        const job = savedJobs.find(j => j.id === id);
        if (job) {
            const logEntry = {
                jobId: id,
                title: job.title,
                company: job.company,
                status: newStatus,
                date: new Date().toISOString()
            };
            const existingLog = JSON.parse(localStorage.getItem('jobTrackerStatusLog') || '[]');
            const newLog = [logEntry, ...existingLog].slice(0, 50);
            localStorage.setItem('jobTrackerStatusLog', JSON.stringify(newLog));
        }
    };

    const handleView = (job: Job) => {
        setSelectedJob(job);
        setIsModalOpen(true);
    };

    const handleApply = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <div className="main-content">
            <ContextHeader
                title="Saved Notifications"
                subtitle="Your bookmarked opportunities and historical archives."
            />
            <div className="workspace-container">
                <div className="primary-workspace">
                    {savedJobs.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 'var(--space-2)' }}>
                            {savedJobs.map(job => (
                                <JobCard
                                    key={job.id}
                                    job={job}
                                    matchScore={job.matchScore}
                                    isSaved={true}
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
                            <h3>Your collection is empty.</h3>
                            <p className="text-muted">
                                Browse the dashboard and save jobs to see them here. Once the discovery engine is live,
                                you can keep track of your application progress and notes.
                            </p>
                        </div>
                    )}
                </div>
                <SecondaryPanel
                    title="Organization Tips"
                    description="Use the saved section to shortlist the most relevant roles before applying."
                    prompt="Shortcut: Press 'S' to save a job."
                    onCopy={() => navigator.clipboard.writeText("Shortcut: Press 'S' to save a job.")}
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
